const arrayAuctions = [
    {
        title: "Caballito",
        description:
        "Parte de la colección de Granja, un pequeño caballo en acuarela.",
        category: [1],
        price: 500,
        state: 'subastando',
        userId: 2,
        idBuyer: 5,
        percentage: 50,
        images: ["https://i.imgur.com/XVfLCqe.jpg"],
    },
    {
        title: "Cabrita",
        description:
        "Parte de la colección de Granja, una pequeña cabra en acuarela.",
        category: [1, 3, 5],
        price: 500,
        state: 'subastado',
        userId: 2,
        idBuyer: 6,
        percentage: 50,
        images: ["https://i.imgur.com/oYqOEfO.jpg"],
    },
    {
        title: "Annie",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        category: [4, 5, 6],
        price: 800,
        state: 'pendiente',
        userId: 3,
        idBuyer: 8,
        percentage: 80,
        images: ["https://i.imgur.com/wDoTo5Z.jpg"],
    }
]

module.exports = arrayAuctions;