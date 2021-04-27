const server = require('express').Router();
const { User  } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

server.get('/', (req, res) => {

	const { query } = req.query
	User.findAll({
		where: {
			[Op.or]: [
				{ name: { [Op.iLike]: `%${query}%` } },
				{ username: { [Op.iLike]: `%${query}%` } }
			]
		}
	})
		.then(users => {
			if (users.length > 0) {
				res.json(users)
			} else {
				res.json([])
			}
		})
		.catch((err) => {
            console.error(err);
            res.json()
		});
});

module.exports = server;