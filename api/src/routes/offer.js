const server = require("express").Router();
const { Offer, Product, Category, Wishlist, User, Image } = require('../db.js');
const { sendEmail } = require("./newsletterOfferFunction.js");


server.get('/', async (req, res) => {
    try {
        res.json(await Offer.findAll());
    } catch (error) {
        res.json(error);
    }
})

server.post('/', async (req, res) => {
    const { day, discount, idCategory } = req.body;
    let offer = await Offer.findOrCreate({
        where: {
            day,
            categoryId: idCategory
        }
    })
    offer[0].discount = discount;
    await offer[0].save();
    //newsletter-wishlist
    let productsWithOffer = await Product.findAll({ 
        include: [
            {
                model: Category,
                where: { id: idCategory }
            },
            {
                model: Image
            }
        ]
    })
    const data = productsWithOffer.map((el) => el.dataValues)
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        const users = await Wishlist.findAll({
            where: {
                productIdProduct : product.id_product
            }
        })
        if(users.length === 0) continue
        for (let i = 0; i < users.length; i++) {
            const userId = users[i].dataValues.userId;
            const userData = await User.findByPk(userId)
            const emailBody = {
                title: "Un producto de tu wishlist está en oferta ahora!",
                product: {
                    title: product.title,
                    price: product.price - ((discount/100) * product.price),
                    image: product.images[0].dataValues.url,
                    description: product.description,
                    stock: product.stock,
                },
            };
            const emailSubject = "Wishlist";
            await sendEmail(emailSubject, emailBody, userData.dataValues.email);   
        }
    }
    res.json(offer[0]);
})

server.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Offer.destroy({
            where: {id}
        })
        res.json('deleted')
    } catch (error) {
        res.json(error);
    }
})

module.exports = server;