const server = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const bcrypt = require("bcryptjs");
const {
	User,
	Category,
	Image,
	Shoppingcart,
	Lineorder,
	Product,
	Review,
	Wishlist
} = require("../db.js");

//Variables usadas para envío de sms

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
	apiKey: "d1d5cd67",
	apiSecret: "DjivGpVI8mxXEGdl"
})

// retorna compras realizadas a un determinado artista
server.get("/compras/:iduser", (req, res) => {

	try {

		let iduser = req.params.iduser;
		Shoppingcart.findAll({
			where: { state: 'fullfilled' },
			include: [{
				model: Lineorder,
				include: [{
					model: Product,
					include: [{
						model: User,
						where: { id: iduser }
					}]
				}]
			}]
		})
			.then(async (cart) => {
				let finalCart = []

				for (let i = 0; i < cart.length; i++) {
					finalCart.push(
						{
							id_order: cart[i].dataValues.id_order,
							state: cart[i].dataValues.state,
							total_price: cart[i].dataValues.total_price,
							payment_status: cart[i].dataValues.payment_status,
							createdAt: cart[i].dataValues.createdAt,
							userId: await User.findByPk(cart[i].dataValues.userId),
							lineorders: cart[i].dataValues.lineorders.map(l => ({
								unit_price: l.dataValues.unit_price,
								quantity: l.dataValues.quantity,
								product: {
									title: l.dataValues.product?.title,
									stock: l.dataValues.product?.stock
								}

							}))
						}

					)
				}

				return res.json(finalCart)

			})


	} catch (error) {
		res.json(error)
	}
})

// 1: Get all users
// No password
server.get("/", (req, res) => {
	if (req.query.type === 'artists') {
		User.findAll({
			where: {
				state: 'approved',
				type: 'artist'
			},
			attributes: [
				"id",
				"username",
				"name",
				"lastname",
				"profilepic",
				"birth",
				"email",
				"type",
				"state",
			]
		}).then((result) => {
			res.json(result);
		});
	} else {
		User.findAll({
			attributes: [
				"id",
				"username",
				"name",
				"lastname",
				"profilepic",
				"birth",
				"email",
				"type",
				"state",
				"logType"
			],
		}).then((result) => {

			res.json(result);
		});
	}

});

// 2: Create new user
server.post("/", async function (req, res) {
	let {
		username,
		name,
		lastname,
		profilepic,
		email,
		password,
		birth,
		type,
		state,
	} = req.body;
	const finder = await User.findOne({
		where: {
			username: username,
		},
	});
	if (finder) {
		return res.json({
			msgUsername: "El usuario ya existe",
		});
	}
	if (!finder) {
		const emailFinder = await User.findOne({
			where: {
				email: email,
			},
		});
		if (emailFinder) {
			return res.json({
				msgEmail: "Este email ya esta registrado",
			});
		}
		if (!emailFinder) {
			let newState = "";
			if (type === "artist") {
				newState = "pending";
			}
			if (type === "user") {
				newState = "approved";
			}
			if (type === "admin") {
				newState = "approved";
			}

			try {
				const crypter = async (password) => {
					const salt = await bcrypt.genSalt(10);
					return bcrypt.hash(password, salt);
				};

				const hashPass = await crypter(password);

				const newUser = await User.create({
					username,
					name,
					lastname,
					profilepic,
					email,
					password: hashPass,
					birth,
					type,
					state: newState,
				}).then(async (newuser) => {
					const token = jwt.sign({ id: newuser.id }, "secret_key", {
						expiresIn: 60 * 60 * 24,
					});
					newuser.password = " ";
					newuser.dataValues.wishlist = await Wishlist.findAll({
						attributes: ['productIdProduct'],
						where: { userId: newuser.id },
					});
					let obj = { user: newuser, auth: true, token };
					res.json(obj);
				});

			} catch (err) {
				console.log(err);
				res.status(500).json({ message: err });
			}
		}
	}
});

// 3: Get user by id
// No password
server.get("/:id", (req, res) => {
	User.findAll({
		where: { id: req.params.id },
		attributes: [
			"id",
			"username",
			"name",
			"lastname",
			"profilepic",
			"birth",
			"email",
			"type",
			"state",
		],
	}).then((result) => {

		res.json(result);
	});
});


// 4: Edit user
server.put("/:id", async (req, res) => {

	var finder = await User.findOne({
		where: {
			username: req.body.username,
		},
	});
	if (finder && req.params.id == finder.dataValues.id) {
		finder = ''
	}
	if (finder) {

		return res.json({
			msgUsername: "El usuario ya existe",
		});
	}
	if (!finder) {
		var emailFinder = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (emailFinder && req.params.id == emailFinder.dataValues.id) {
			emailFinder = "";
		}
		if (emailFinder) {

			return res.json({
				msgEmail: "Este email ya esta registrado",
			});
		}

		if (!emailFinder) {
			try {

				let updated = await User.update(
					{
						username: req.body.username,
						name: req.body.name,
						lastname: req.body.lastname,
						profilepic: req.body.profilepic,
						email: req.body.email,
						birth: req.body.birth,
						type: req.body.type,
						state: req.body.state,
					},
					{
						where: { id: req.params.id },
					}
				);
				res.json("User succesfully modified");
			} catch (err) {
				console.log(err);
			}
		}
	}
});


// SoftDelete
// To be used only to softDelete users
server.put("/softdelete/:id", async (req, res) => {

	try {
		let updated = await User.update(
			{
				id: req.body.id,
				username: null,
				email: null,
				state: 'deleted',
			},
			{
				where: { id: req.params.id },
			}
		);
		res.json("User succesfully modified");
	} catch (err) {
		console.log(err);
	}

});


// Trae la última ORDEN abierta que tenga el usuario

server.get("/:idUser/cart", async (req, res) => {
	await Shoppingcart.findOne({
		where: { userId: req.params.idUser, state: "pending" },
		include: [
			{
				model: Lineorder,
				include: [{ model: Product, include: [{ model: Image }] }],
			},
		],
	})
		.then((result) => {
			if (result === null) {
				return res.json({
					message: "Could not find specified shopping cart",
				});
			}
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

server.post("/signin/algo", async (req, res, next) => {
	const { username, password } = req.body;

	const compare = async (password, passwordDataBase) => {
		return bcrypt.compare(password, passwordDataBase);
	};

	User.findOne({
		where: { username: username }, //Verify if username is correct
	})
		.then(async (user) => {
			if (user) {
				//Verify if password is correct
				const comparer = await compare(password, user.password);

				if (comparer) {
					//Verify by two factor auth
					if (user.twoFactor) {
						var code = Math.trunc(Math.random() * 10000)

						const from = "Andres"
						const to = user.phoneNumber
						const text = `Tu codigo de verificacion de ArtHub es ${code}`

						vonage.message.sendSms(from, to, text, (err, responseData) => {
							if (err) {
								console.log(err);
								return res.json(err)
							} else {
								if (responseData.messages[0]['status'] === "0") {

									let twoToken = jwt.sign({ id: user.id, code }, "secret_key", {
										expiresIn: 60
									})

									return res.json({
										auth: false,
										token: '',
										authTwo: true,
										twoToken
									})

								} else {
								
									return res.json(`Message failed with error: ${responseData.messages[0]['error-text']}`)
								}
							}
						})

					} else {

						//create token
						let token = jwt.sign({ id: user.id }, "secret_key", {
							expiresIn: 60 * 60 * 24,
						});
						user.password = "";
						user.dataValues.wishlist = await Wishlist.findAll({
							attributes: ['productIdProduct'],
							where: { userId: user.id },
						});

						res.json({
							user: user,
							auth: true,
							token,
						});
					}
				} else {
					res.json("contraseña incorrecta");
				}
			} else {
				res.json("usuario inexistente");
			}
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

server.post("/userdata/token", verifyToken, (req, res, next) => {
	User.findByPk(req.userId)
		.then(async (user) => {
			user.password = 0;
			user.dataValues.wishlist = await Wishlist.findAll({
				attributes: ['productIdProduct'],
				where: { userId: req.userId },
			});

			res.json(user);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

// Retorna todas las ordenes de usuario (id) pasado por params
server.get("/:id/orders", async (req, res) => {
	const { id } = req.params;

	try {
		const orderToReturn = await Shoppingcart.findAll({
			where: { userId: id },
			include: [
				{
					model: Lineorder,
					include: [{ model: Product, include: [{ model: Image }] }],
				},
			],
		});
		if (orderToReturn.length > 0) {
			res.json(orderToReturn);
		}
		res.json({
			message: `Could not find order associated with user id: ${id}`,
		});
	} catch {
		(err) => {
			console.log(err);
			res.json(err);
		};
	}
});

// Retorna las reviews del usuario
server.get("/:id/reviews", async (req, res) => {
	const { id } = req.params;
	try {
		const userReviews = await Review.findAll({
			include: [
				{
					model: User,
					where: { id },
				},
			],
		});
		if (userReviews) {
			return res.json(userReviews);
		} else {
			res.json({ message: "This user has no reviews" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Error" });
	}
});

// Crea carrito de LS en base de datos
server.post("/:idUser/newcart", async (req, res) => {
	const { idUser: userId } = req.params;
	const { cart } = req.body;
	
	try {
		let totalPrice = cart.reduce((acc, prod) => acc + prod.quantity * prod.product.price, 0)
		let newCart = await Shoppingcart.create({
			total_price: totalPrice,
			state: "pending",
			userId
		})
		for (let i = 0; i < cart.length; i++) {
			const productToAdd = await Product.findByPk(parseInt(cart[i].product.id_product));
			const newLineorder = await Lineorder.create({
				quantity: cart[i].quantity,
				unit_price: cart[i].product.price,
			});
			await productToAdd.addLineorder(newLineorder.dataValues.id_line);
			await newCart.addLineorder(newLineorder.dataValues.id_line);
		}
		res.json(newCart)
	}
	catch (error) {
		res.status(400).send(error)
	}
})

server.post('/login/facebook', async (req, res) => {

	const { username, email, userID, logType } = req.body;
	const compare = async (userID, passwordDataBase) => {
		return bcrypt.compare(userID, passwordDataBase);
	};

	var finder = await User.findOne({
		where: {
			logType: 'facebook',
			email: email
		}
	})

	if (finder) {
		const comparer = await compare(userID, finder.password);

		if (comparer) {
			//Verify if password is correct

			//create token
			let token = jwt.sign({ id: finder.id }, "secret_key", {
				expiresIn: 60 * 60 * 24,
			});
			finder.dataValues.wishlist = await Wishlist.findAll({
				attributes: ['productIdProduct'],
				where: { userId: finder.id },
			});
			finder.password = "";
			res.json({
				user: finder,
				auth: true,
				token,
			});
		} else {
			res.json("acceso denegado");
		}
	}
	else {


		const crypter = async (password) => {
			const salt = await bcrypt.genSalt(10);
			return bcrypt.hash(password, salt);
		};

		const hashPass = await crypter(userID);

		const newUser = await User.create({
			username: req.body.name,
			name: req.body.name,
			profilepic: req.body.picture.data.url,
			email: req.body.email,
			password: hashPass,
			type: 'user',
			logType: 'facebook',
			state: 'approved',
		})

		const token = jwt.sign({ id: newUser.id }, "secret_key", {
			expiresIn: 60 * 60 * 24,
		})

		newUser.password = ''
		newUser.dataValues.wishlist = await Wishlist.findAll({
			attributes: ['productIdProduct'],
			where: { userId: newUser.id },
		});
		res.json({
			user: newUser,
			auth: true,
			token: token
		})
	}

})

server.post("/login/google", async (req, res) => {

	const userID = req.body.Aa;
	const email = req.body.profileObj.email;
	const username = req.body.profileObj.familyName + "" + req.body.profileObj.givenName;
	const pic = req.body.profileObj.imageUrl;
	const name = req.body.profileObj.givenName;
	const lastname = req.body.profileObj.familyName;

	const compare = async (userID, passwordDataBase) => {
		return bcrypt.compare(userID, passwordDataBase);
	};

	var finder = await User.findOne({
		where: {
			logType: "google",
			email: email,
		},
	});

	if (finder) {
		const comparer = await compare(userID, finder.password);

		if (comparer) {
			//Verify if password is correct

			//create token
			let token = jwt.sign({ id: finder.id }, "secret_key", {
				expiresIn: 60 * 60 * 24,
			});
			finder.password = "";
			
			finder.dataValues.wishlist = await Wishlist.findAll({
				attributes: ['productIdProduct'],
				where: { userId: finder.id },
			});
			res.json({
				user: finder,
				auth: true,
				token,
			});
		} else {
			res.json("acceso denegado");
		}
	} else {
		const crypter = async (password) => {
			const salt = await bcrypt.genSalt(10);
			return bcrypt.hash(password, salt);
		};

		const hashPass = await crypter(userID);

		const newUser = await User.create({
			username: username,
			name: name,
			profilepic: pic,
			email: email,
			password: hashPass,
			type: "user",
			logType: "google",
			state: "approved",
		});

		const token = jwt.sign({ id: newUser.id }, "secret_key", {
			expiresIn: 60 * 60 * 24,
		});

		newUser.password = "";
		newUser.dataValues.wishlist = await Wishlist.findAll({
			attributes: ['productIdProduct'],
			where: { userId: newUser.id },
		});
		res.json({
			user: newUser,
			auth: true,
			token: token,
		});
	}
});



module.exports = server;