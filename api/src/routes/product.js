const server = require('express').Router();
const { Product, Image, Category, User, productcategory, Review } = require('../db.js');
const { sendEmailUpdateStock } = require('./newsletterFunction.js');

// 1: Get all products 
server.get('/', (req, res) => {
	Product.findAll(
		{
			include: [
				{
					model: Image
				},
				{
					model: Category
				},
				{
					model: User
				}
			]
		}
	)
		.then(products => {
			res.send(products);
		})
		.catch(() => {
			res.status(500).json({ message: 'Internal server error' })
		});
});

// 2: Create a new product
server.post('/', async function (req, res) {
	const { title, price, description, stock, images, categories, userId } = req.body;
	try {
		const newProduct = await Product.create({
			title,
			price,
			description,
			stock,
			userId
		})
		const img = images.map(url => ({ url }))
		const productImage = await Image.bulkCreate(img)

		await newProduct.setCategories(categories)
		await newProduct.setImages(productImage.map(i => i.dataValues.id))
		res.json('New product added')
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
});

// 3: Edit product
server.put("/:id", async (req, res) => {
	productStock = await Product.findByPk(parseInt(req.params.id))	
	if (productStock.dataValues.stock === 0 && req.body.stock > 0) {
		 await sendEmailUpdateStock(parseInt(req.params.id))
	}
	
	try {

		await Image.destroy({ where: { productIdProduct: req.params.id } });

		const productToEdit = await Product.findByPk(parseInt(req.params.id));
		productToEdit.title = req.body.title;
		productToEdit.price = req.body.price;
		productToEdit.description = req.body.description;
		productToEdit.stock = req.body.stock;

		req.body.images.map(async (img, i) => {
			await Image.findOrCreate({
				where: {
					url: req.body.images[i].url
				}
			})
				.then(image => {
					productToEdit.addImages(image[0].dataValues.id)
				})
		})

		await productToEdit.setCategories(req.body.categories);

		await productToEdit.save();
		const productToReturn = await productToEdit.reload();

		res.status(200).json(productToReturn);
	} catch (e) {
		res.status(400).json({ message: e });
	}
});

// 4: Delete category from product
server.delete("/:idProducto/category/:idCategorias", async (req, res) => {

	const idProd = parseInt(req.params.idProducto)
	const idCat = parseInt(req.params.idCategorias)

	try {
		const productToEdit = await Product.findOne({
			where: { id_product: idProd },
			include: { model: Category },
		});
		await productToEdit.removeCategory(idCat);
		res.json(productToEdit);
	} catch {
		res.status(400);
	}
});

// 5: Delete product by id
server.delete('/:id', async (req, res) => {

	try {

		Product.destroy({ where: { id_product: req.params.id } })
			.then(data => {
				if (data == 0) {
					res.json('The product do not exist')
				} else {
					res.json('Success')
				}
			}).catch(err => {
				console.log(err)
				res.json(err)
			})

	}
	catch (err) {
		console.log(err)
		res.json(err)
	}

});

// 6: Search product by id
server.get('/:id', async (req, res) => {

	const prodId = parseInt(req.params.id)

	Product.findByPk(prodId, { include: [Category, Image] })
		.then(prod => res.json(prod))
		.catch(err => {
			console.log(err)
			res.json(err)
		})

});

// 7: Send products to wishlist 
server.post('/array', async (req, res) => {

	const { prodIds } = req.body;

	let prods = []
	for (let i = 0; i < prodIds.length; i++) {
		prods.push(await Product.findByPk(prodIds[i].productIdProduct, { include: [User, Image, Category] }));
	}
	res.json(prods);

});


// 8: Add category to product
server.post("/:idProducto/category/:idCategorias", async (req, res) => {

	const idProd = parseInt(req.params.idProducto)
	const idCat = parseInt(req.params.idCategorias)

	try {
		const productToEdit = await Product.findOne({
			where: { id_product: idProd },
			include: { model: Category },
		});
		await productToEdit.addCategory(idCat);
		res.json('Category added');
	} catch {
		res.status(400);
	}
});

// 9: Search products from category
server.get('/categorias/:nombrecat', (req, res) => {

	const { nombrecat } = req.params
	Category.findAll({ where: { name: nombrecat } })
		.then(categoria => { return categoria[0].dataValues.id })
		.then(catId => Product.findAll({
			include: [
				{
					model: Category,
					where: { id: catId }
				},
				{
					model: Image
				},
				{
					model: User
				}
			]
		}))
		.then(products => {
			if (products.length > 0) {
				res.json(products)
			} else {
				res.json('No categories found')
			}
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		})

})

// 10: Get products by user id
server.get('/user/:id', (req, res) => {

	const { id } = req.params
	Product.findAll({
		include: [Category, Image],
		where: { userId: id }
	})
		.then(result => {
			res.json(result)
		})

})

//------------------------INICIO CRUD REVIEW-------------------------------

server.post('/:id/review', async (req, res) => {
	const { id } = req.params;
	const { description, qualification, userIdClient } = req.body;
	try {
		const reviewExists = await Review.findOne({
			where: { userId: userIdClient },
			include: [
				{
					model: Product,
					where: { id_product: id }
				}
			]
		})
		if (!reviewExists) {

			const newReview = await Review.create({
				description,
				qualification,
			})
			const product = await Product.findByPk(parseInt(id))

			const user = await User.findByPk(parseInt(userIdClient))

			await product.addReview(newReview.dataValues.id_review);
			await user.addReview(newReview.dataValues.id_review)

			res.status(200).json({ message: 'review added successfully' })

		}
		else {
			res.json({ message: 'you have already reviewed this product' })
		}


	} catch (error) {
		console.log(error)
		res.status(400).json({ message: 'has not been added' })
	}

})

server.get('/:id/review', async (req, res) => {
	const { id } = req.params
	try {
		await Product.findOne({
			where: {
				id_product: id
			},
			include: [
				{
					model: Review,
					include: [{ model: User }],
				},
				{
					model: User
				}
			]
		})
			.then((result) => {
				res.json(result)
			})

	} catch (error) {
		res.status(400).json({ message: "Error" })
	}

})

server.put('/:id/review/:idReview', async (req, res) => {
	const { description, qualification, userIdClient } = req.body
	const { id, idReview } = req.params;

	try {

		const productReview = await Product.findOne({
			where: { id_product: id },
			include: { model: Review },
		});

		await Review.update({
			description,
			qualification,
			userIdClient
		}, {
			where: {
				id_review: idReview,
			}
		});


		await productReview.save();
		await productReview.reload();

		res.status(200).json({ message: 'review successfully modified' })

	} catch (error) {
		res.status(400).json({ message: "Error" })
	}
})

server.delete("/:id/review/:idReview", async (req, res) => {

	const { id, idReview } = req.params;


	try {
		const productReview = await Product.findOne({
			where: { id_product: id },
			include: { model: Review },
		});
		await productReview.removeReview(idReview);
		res.json({ message: 'review successfully removed' });
	} catch (error) {
		res.status(400).json({ message: 'Error' });
	}
});

//------------------------FIN CRUD REVIEW-------------------------------

module.exports = server;
