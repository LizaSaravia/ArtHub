const server = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyTokenResetPw = require("./verifyTokenResetPw");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const fs = require("fs");
const Handlebars = require("handlebars");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})



async function sendEmail(body, to) {
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

        const handlebarOptions = {
			viewEngine: {
				extName: ".handlebars",
				partialsDir: __dirname + "/templates/",
				defaultLayout: false,
			},
			viewPath: __dirname + "/templates/",
			extName: ".handlebars",
		};
		transport.use("compile", hbs(handlebarOptions));
		var source = fs.readFileSync(
			path.join(__dirname, "templates/autionTemplate.handlebars"),
			"utf8"
		);
		var template = Handlebars.compile(source);

        const mailOptions = {
			from: "ArtHub <andres2661991@gmail.com>",
			to: to,
			subject: body.title,
			html: template({ body }), // Process template with locals - {passwordResetAddress}
		};
        const result = await transport.sendMail(mailOptions)
        return result

    } catch (err) {
        console.log(err)
        return err
    }
}

const {
    User,
    Category,
    Image,
    Shoppingcart,
    Lineorder,
    Product,
} = require("../db.js");
const { use } = require("./product");

server.post("/send/:email", async (req, res) => {

    const { email } = req.params;

    const result = await User.findOne({
        where: {
            email: email,
        },
    })

    if (!result) res.json({ email: false })

    var token = await jwt.sign({ id: result.id }, "secret_change_key", {
        expiresIn: 300,
    });

    var body= {title:"User Request New",
    text:"Para resetear tu contraseña:",
    link:`http://localhost:3000/nuevacontrasena/${token}`,
    aviso:"Aviso: este enlace expirará en 5 minutos",
    click:"Click Aqui"}
   
    sendEmail(body, email)
        .then(async result2 => {
          
            if (!(result2.rejected.length)) {

                try {
                    await User.update(
                        { password: '*******1A' },
                        { where: { id: result.id } })

                    res.json({ email: true })

                } catch (err) {
                    console.log(err)
                    res.json(err)
                }
            } else {
                res.json({ auth: false })
            }

        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })


})

//Validate token from gmail
server.post("/validate/token", verifyTokenResetPw, (req, res, next) => {
    res.json({ auth: true })
});

//reset password
server.post("/resetpassword/:password", verifyTokenResetPw, async (req, res, next) => {

    const userId = req.userId
    const password = req.params.password

    try {
        const user = await User.findByPk(userId);

  

        if (user.dataValues) {

            const crypter = async (password) => {
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt);
            };

            const hashPass = await crypter(password);

            const update = await User.update(
                {
                    password: hashPass

                },
                {
                    where: { id: userId },
                })
        }

        res.json({ success: true })

    } catch (err) {
        console.log(err)
        res.json(err)
    }

});

//mailer auction
server.post('/auction/:email', (req, res) => {
    const { email } = req.params;
    const {info} = req.body;
    try {
        var body = {title:"Mejor Oferta",text:info}

        sendEmail(body, email)
            .then(() => {
                res.json({ menssage: 'mail sent successfully' })
            })

    } catch (error) {
        res.status(400).json({ message: 'Error' })

    }

})

module.exports = server;