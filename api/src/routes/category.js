const { Router } = require('express');
const { Category } = require('../db.js');
const router = Router();

router.post('/', async (req, res) => {
    try {
        let newCategory = await Category.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        res.json('Category succesfully created');
    } catch (error) {
        res.json('Error: Category already exists');
    }

});

router.get('/', (req, res) => {
    try {
        Category.findAll()
            .then(result => {
                res.json(result)
            })

    } catch (error) {
        res.status(500).res.json({ message: 'Could not get categories' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        let destroyed = await Category.destroy({
            where: { id: req.params.id },
        });
        res.json(`Category with id ${req.params.id} succesfully deleted`);
    } catch (error) {
        res.json('Error: ', error);
    }

});

router.put('/:id', async (req, res) => {
    try {
        let updated = await Category.update({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        },
            {
                where: { id: req.params.id },
            });
        res.json(`Category with id ${req.params.id} succesfully modified`);
    } catch (error) {
        console.log('error: ', error);
    }

});

module.exports = router;