const server = require("express").Router();
const { Product, Wishlist } = require("../db.js");

server.post("/add", async (req, res) => {
    try {
        const { iduser, idprod } = req.body;

        let wish = await Wishlist.create();

        await wish.setUser(iduser);
        await wish.setProduct(idprod);

        res.send("added");
    } catch (error) {
        res.json(error);
    }
});

server.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        let idsprod = await Wishlist.findAll({
            where: { userId },
        });

        let prods = [];

        if (idsprod.length > 0) {
            for (let i = 0; i < idsprod.length; i++) {
                prods.push(await Product.findByPk(idsprod[i].productIdProduct));
            }
            res.json(prods);
        } else {
            res.status(404).json("the user has no products");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

server.delete("/:userId/:idprod", async (req, res) => {
    const { userId, idprod } = req.params;
    try {
        let prod = await Wishlist.destroy({
            where: { productIdProduct: idprod, userId },
        });
        if (prod !== 0) {
            res.json("removed");
        } else {
            res.status(404).json("not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = server;
