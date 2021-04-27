require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
	Product,
	Image,
	Category,
	User,
	Lineorder,
	Shoppingcart,
	Review,
	Newsletter,
	Wishlist,
	Request,
	Auction,
	Auctionbuyer,
	Offer,
	Auctionb,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Category.hasMany(Offer);
Offer.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.belongsToMany(Category, { through: "productcategory" });
Category.belongsToMany(Product, { through: "productcategory" });

Product.hasMany(Wishlist);
Wishlist.belongsTo(Product);

User.hasMany(Wishlist);
Wishlist.belongsTo(User);

User.hasMany(Product, {
	foreignKey: { allowNull: false },
	onDelete: "CASCADE",
});
Product.belongsTo(User, {
	foreignKey: { allowNull: false },
	onDelete: "CASCADE",
});

Product.hasMany(Lineorder);
Lineorder.belongsTo(Product);

Shoppingcart.hasMany(Lineorder);
Lineorder.belongsTo(Shoppingcart);

User.hasMany(Shoppingcart);
Shoppingcart.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Newsletter.belongsToMany(User, { through: "usernewsletter" });
User.belongsToMany(Newsletter, { through: "usernewsletter" });

User.hasMany(Request);
Request.belongsTo(User);

Auction.belongsToMany(User, { through: "userauction" });
User.belongsToMany(Auction, { through: "userauction" });

Auction.hasMany(Image);
Image.belongsTo(Auction);

Auction.belongsToMany(Category, { through: "categoryauction" });
Category.belongsToMany(Auction, { through: "categoryauction" });

Auction.belongsToMany(Auctionb, { through: "auctionbuyer" });
Auctionb.belongsToMany(Auction, { through: "auctionbuyer" });

User.belongsToMany(Auctionb, { through: "userbuyer" });
Auctionb.belongsToMany(User, { through: "userbuyer" });

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
