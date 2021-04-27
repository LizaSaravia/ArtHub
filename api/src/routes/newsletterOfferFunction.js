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
const CLIENT_ID =
	"58229968491-6sjdcgkqh0uog45rabbitouniqs182ch.apps.googleusercontent.com";
const CLIENT_SECRET = "WqmGTBctdvzddpFsmu0_MwBV";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
	"1//04fZsdreosgbrCgYIARAAGAQSNwF-L9IrqHuSDMvBIGRnXIkUilPVz99wzLB613MJ_AIIR87ry3-JOW-VXn1YrMuqnEbtPh16jA0";
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

module.exports = {
    sendEmail
}