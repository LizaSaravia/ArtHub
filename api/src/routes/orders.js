const server = require("express").Router();
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const {
    User,
    Category,
    Image,
    Shoppingcart,
    Lineorder,
    Product,
} = require("../db.js");
const mercadopago = require('mercadopago');
const { TOKEN_MP, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

// Configuracion para envío de mail


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendEmail(subject, body, to) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'andres2661991@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {

            from: 'ArtHub <andres2661991@gmail.com>',
            to: to,
            subject: subject,
            html: body
        }

        const result = await transport.sendMail(mailOptions)
        return result

    } catch (err) {
        console.log(err)
        return err
    }
}

// Mercado Pago

mercadopago.configure({
    access_token: TOKEN_MP
});

server.post('/mercadopago', async (req, res) => {
    const { cart, idOrder, email, address } = req.body;
    const order = parseInt(idOrder);


    var inputAndress = address.provincia + ' ' +
        address.localidad + ' ' +
        address.calle + ' ' +
        address.numero;

    let productsCart = cart.map(p => ({
        id: p.product.id_product,
        title: p.product.title,
        unit_price: p.product.price,
        quantity: p.quantity,
        currency_id: "ARS"
    }))

    try {

        let preference = {
            items: productsCart,
            external_reference: `${order}`,
            back_urls: {
                success: `http://localhost:3001/orders/mercadopago/pagos/${email}`,
                pending: `http://localhost:3001/orders/mercadopago/pagos/${email}`,
                failure: `http://localhost:3001/orders/mercadopago/pagos/${email}`,
            },
            auto_return: 'approved',
        };

        const response = await mercadopago.preferences.create(preference)

        Shoppingcart.findByPk(idOrder)
            .then((order) => {
                order.payment_link = response.body.init_point
                order.address = inputAndress
                order.save()
            })

        res.send({ mpLink: response.body.init_point, mpId: response.body.id })
    }
    catch (error) {
        res.send(error)
    }
})

server.get("/mercadopago/pagos/:email", (req, res) => {
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id
    const payment_method = 'mercadopago'

    Shoppingcart.findByPk(external_reference, { include: [{ model: Lineorder, include: [{ model: Product }] }] })
        .then((order) => {
            let handleStock = order.dataValues.lineorders.map(l => ({ id: l.dataValues.product.id_product, quantity: l.dataValues.quantity }));

            handleStock.forEach(element => {
                Product.findByPk(element.id)
                    .then((prod) => {
                        prod.stock = prod.stock - element.quantity;
                        prod.save();
                    });
            });
        })

    Shoppingcart.findByPk(external_reference)
        .then((order) => {
            order.payment_id = payment_id
            order.payment_status = payment_status
            order.merchant_order_id = merchant_order_id
            order.status = payment_status
            order.state = payment_status === "approved" ? "fullfilled" : "pending"
            order.payment_method = payment_method
            order.save()
                .then((_) => {
                    console.info('redirect success')
                    if (order.state === "fullfilled") {
                        const body = `<div>Hola,</div>
                                      <div>Tu compra se ha realizado con éxito</div>
                                      <div>El número de orden es : ${external_reference}</div>
                                      <div><h3>artHub</h3></div>
                                      <div>arte en su máxima expresión</div>`
                        sendEmail('Compra exitosa', body, req.params.email)
                        return res.redirect(`http://localhost:3000/carritocomprado/${external_reference}/fullfilled`)
                    } else {
                        return res.redirect(`http://localhost:3000/carritocomprado/${external_reference}/pending`)
                    }
                })
                .catch((err) => {
                    return res.redirect(`http://localhost:3000/miperfil`)
                })
        })
        .catch(err => {
            return res.redirect(`http://localhost:3000`)
        })

})

// Fin Mercado Pago

// 1: GET /orders
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status
server.get("/", async (req, res) => {
    const { status } = req.query;

    try {
        if (status) {
            const ordersToReturn = await Shoppingcart.findAll({
                where: { state: status },
                include: [
                    {
                        model: Lineorder,
                        include: [{ model: Product, include: [{ model: Image }] }],
                    },
                ]
            });
            if (ordersToReturn.length > 0) {
                res.json(ordersToReturn);
            } else {
                res.json({
                    message: `Could not find orders with status: ${status}`,
                });
            }
        } else {
            const allOrders = await Shoppingcart.findAll({
                include: [
                    {
                        model: Lineorder,
                        include: [{ model: Product, include: [{ model: Image }] }],
                    },
                ]
            });
            if (allOrders.length > 0) {
                res.json(allOrders);
            } else {
                res.json({ message: "No orders found" });
            }
        }
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});

// 2: GET /orders/:id
// Ruta que retorna una orden en particular
server.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const orderToReturn = await Shoppingcart.findOne({
            where: { id_order: id },
            include: [
                {
                    model: Lineorder,
                    include: [{ model: Product, include: [{ model: Image }] }],
                },
            ],
        });
        if (!orderToReturn) {
            res.json({ message: "Could not find order" });
        }
        res.json(orderToReturn);
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});

// 3: PUT /orders/:id
// Ruta para modificar una orden

server.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { state, total_price } = req.body;
        const orderToEdit = await Shoppingcart.findByPk(parseInt(id));
        if (!orderToEdit) {
            res.json({ message: "Could not find order" });
        }
        orderToEdit.state = state;
        orderToEdit.total_price = total_price;
        await orderToEdit.save();
        await orderToEdit.reload();
        res.json(orderToEdit);
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});

module.exports = server;
