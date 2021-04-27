const server = require('express').Router();
const { Product, Category, Image, User } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Return products by keyword
server.get('/', (req, res) => {

	const { query } = req.query
	Product.findAll({
		include: [Category, Image, User],
		where: {
			[Op.or]: [
				{ title: { [Op.iLike]: `%${query}%` } },
				{ description: { [Op.iLike]: `%${query}%` } }
			]
		}
	})
		.then(products => {
			if (products.length > 0) {
				res.json(products)
			} else {
				res.json('No products found')
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

module.exports = server;