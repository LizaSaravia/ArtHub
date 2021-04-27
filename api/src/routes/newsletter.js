const { Router } = require("express");
const {
	User,
	Newsletter,
	Wishlist,
	Product,
	Image,
	Category,
} = require("../db.js");
const router = Router();
const path = require("path");

//Funcion de enviar email --------------------- INICIO

const nodemailer = require("nodemailer");
const fs = require("fs");
const { google } = require("googleapis");
const Handlebars = require("handlebars");
const hbs = require("nodemailer-express-handlebars");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN} = process.env
// const CLIENT_ID =
// 	"58229968491-6sjdcgkqh0uog45rabbitouniqs182ch.apps.googleusercontent.com";
// const CLIENT_SECRET = "WqmGTBctdvzddpFsmu0_MwBV";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
// 	"1//04fZsdreosgbrCgYIARAAGAQSNwF-L9IrqHuSDMvBIGRnXIkUilPVz99wzLB613MJ_AIIR87ry3-JOW-VXn1YrMuqnEbtPh16jA0";
const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(subject, body, to) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "andres2661991@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

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
			path.join(__dirname, "templates/template.handlebars"),
			"utf8"
		);
		var template = Handlebars.compile(source);
		const mailOptions = {
			from: "ArtHub <andres2661991@gmail.com>",
			to: to,
			subject: body.title,
			html: template({ body }), // Process template with locals - {passwordResetAddress}
		};
		//TEST

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (err) {
		console.log(err);
		return err;
	}
}

//Funcion de enviar email --------------------- FINAL

//RUTAS:

//Devuelve todos los newsletter
router.get("/", (req, res) => {
	try {
		Newsletter.findAll({ include: [{ model: User }] }).then((result) => {
			res.json(result);
		});
	} catch (error) {
		res.status(500).res.json({ message: "Could not get newsletters" });
	}
});
// Esta funcion busca los usuarios que tenian el producto en la whishlist y les envia un email avisando
// Recibe como argumento el id del producto que va a entrar en oferta o que renovo el stock
const sendEmailUpdateStock = async (idProduct) => {
	const search = await Wishlist.findAll({
		where: { productIdProduct: idProduct },
	});
	const product = await Product.findByPk(parseInt(idProduct), {
		include: [Image],
	});
	
	if (search && search.length > 0) {
		let emailList = await Promise.all(
			search.map(async (user) => {
				let userEmail = await User.findByPk(user.dataValues.userId);
				return userEmail.email;
			})
		);
		const emailBody = {
			title: "Un producto de tu wishList ahora esta en stock!",
			product: {
				title: product.title,
				image: product.images[0].dataValues.url,
				price: product.price,
				description: product.description,
				stock: product.stock,
			},
		};
		
		const emailSubject = "Whislist";
		emailList.forEach((email) => {
			sendEmail(emailSubject, emailBody, email);
		});
	}
	
};

//RUTA DE PRUEBA ELIMINAR - INICIO >>>>
router.get("/prueba/:idProduct", async (req, res) => {
	try {
		await sendEmailUpdateStock(parseInt(req.params.idProduct));
		res.json("funcionó");
	} catch (error) {
		console.log(error);
		res.json({ message: "se rompio algo" });
	}
});
//<<<<RUTA DE PRUEBA ELIMINAR - FIN

//Suscribe al user al Newsletter
router.post("/:userId/subscribe", async (req, res) => {
	const { userId } = req.params;
	try {
		const userToSubscribe = await User.findByPk(userId);
		if (!userToSubscribe) {
			return res.json({ message: "Could not found user" });
		}
		if (
			!userToSubscribe.newsletter ||
			userToSubscribe.newsletter === false
		) {
			userToSubscribe.newsletter = true;
			userToSubscribe.save();
			const emailSubject = "Arthub Newsletter";
			const emailBody = "sub";
			const userEmail = userToSubscribe.email;
			await sendEmail(emailSubject, emailBody, userEmail);
			//Guardo el mensaje enviado en la db
			const saveEmail = await Newsletter.create({ content: emailBody });
			saveEmail.addUsers(userToSubscribe.id);
			saveEmail.save();

			res.json({
				message: "You've successfully subscribed to our newsletter!",
			});
		} else {
			res.json({
				message: "You were already subscribed to our newsletter",
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ message: "Unable" });
	}
});
//Des-Subscribe el user del Newsletter
router.post("/:userId/unsubscribe", async (req, res) => {
	const { userId } = req.params;
	try {
		const userToSubscribe = await User.findByPk(userId);
		if (!userToSubscribe) {
			return res.json({ message: "Could not found user" });
		}
		if (userToSubscribe.newsletter === true) {
			userToSubscribe.newsletter = false;
			userToSubscribe.save();
			const emailSubject = "Arthub Newsletter";
			const emailBody = "unsub";
			const userEmail = userToSubscribe.email;
			await sendEmail(emailSubject, emailBody, userEmail);
			//Guardo el mensaje enviado en la db
			const saveEmail = await Newsletter.create({ content: emailBody });
			saveEmail.addUsers(userToSubscribe.id);
			saveEmail.save();
			res.json({
				message:
					"You've successfully unsubscribed from our newsletter!",
			});
		} else {
			res.json({ message: "You weren't subscribed to our newsletter" });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: "Unable" });
	}
});

//Cuando se renueva el stock de un producto,
//manda un email a los que tienen el producto en su wishlist

module.exports = router;
