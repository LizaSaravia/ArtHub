const arrayOfProducts = [
    {
        title: "Caballito",
        price: 500,
        description:
            "Parte de la colección de Granja, un pequeño caballo en acuarela.",
        stock: 0,
        userId: 2,
        images: ["https://i.imgur.com/XVfLCqe.jpg"],
        category: [1],
    },
    {
        title: "Cerdito",
        price: 500,
        description:
            "Parte de la colección de Granja, un pequeño cerdo en acuarela.",
        stock: 3,
        userId: 2,
        images: ["https://i.imgur.com/FF3623l.jpg"],
        category: [2],
    },
    {
        title: "Vaca",
        price: 500,
        description:
            "Parte de la colección de Granja, una pequeña vaca en acuarela.",
        stock: 3,
        userId: 1,
        images: ["https://i.imgur.com/2FwZ1JJ.jpg"],
        category: [2],
    },

    {
        title: "Annie",
        price: 800,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 3,
        images: ["https://i.imgur.com/wDoTo5Z.jpg"],
        category: [4],
    },
    {
        title: "Ballet",
        price: 600,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 4,
        images: ["https://i.imgur.com/xBRukvX.jpg"],
        category: [1, 5],
    },
    {
        title: "Mirror",
        price: 650,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 5,
        images: ["https://i.imgur.com/bybYFXB.jpg"],
        category: [6, 7],
    },
    {
        title: "Underwater",
        price: 700,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 3,
        images: ["https://i.imgur.com/n8hMk8v.jpg"],
        category: [8, 9],
    },
    {
        title: "Artist spotlight",
        price: 1000,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 3,
        images: ["https://i.imgur.com/oAYZc6j.jpg"],
        category: [1, 5],
    },
    {
        title: "Surreal",
        price: 0,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 4,
        images: ["https://i.imgur.com/wgQhzRh.png"],
        category: [1, 5],
    },
    {
        title: "Bloom",
        price: 850,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 6,
        images: ["https://i.imgur.com/qsDGbzG.jpg"],
        category: [1, 4],
    },
    {
        title: "Cabrita",
        price: 500,
        description:
            "Parte de la colección de Granja, una pequeña cabra en acuarela.",
        stock: 3,
        userId: 2,
        images: ["https://i.imgur.com/oYqOEfO.jpg"],
        category: [1, 3, 5],
    },
    {
        title: "Bowie",
        price: 700,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 5,
        images: ["https://i.imgur.com/RRuPGIS.jpg"],
        category: [1, 5],
    },
    {
        title: "Darth Vader",
        price: 500,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 6,
        images: ["https://i.imgur.com/Li4nC3p.jpg"],
        category: [9, 3],
    },
    {
        title: "Nature",
        price: 600,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 6,
        images: ["https://i.imgur.com/9vRprLZ.jpg"],
        category: [9, 3],
    },

    {
        title: "Beach",
        price: 850,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 7,
        images: ["https://i.imgur.com/Zbq0pro.jpg"],
        category: [1, 4],
    },
    {
        title: "Liquid",
        price: 650,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 7,
        images: ["https://i.imgur.com/pYSOzZf.jpg"],
        category: [1, 4],
    },
    {
        title: "Shaka de Virgo",
        price: 1000,
        description:
            "Shaka de Virgo",
        stock: 3,
        userId: 6,
        images: ["https://i.imgur.com/L5X7baJ.jpg"],
        category: [3, 4, 5],
    },
    {
        title: "Portrait",
        price: 780,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 7,
        images: ["https://i.imgur.com/O7SZyjk.jpg"],
        category: [7, 8],
    },
    {
        title: "Guatemalita",
        price: 800,
        description:
            "Una representación del personaje folklorico, la Guatemalita de Efraín Recinos.",
        stock: 5,
        userId: 7,
        images: ["https://i.imgur.com/9ytzDk6.jpg"],
        category: [1, 2],
    },
    {
        title: "Space",
        price: 980,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 8,
        images: ["https://i.imgur.com/XglyfcL.jpg"],
        category: [7, 8],
    },
    {
        title: "Guy",
        price: 760,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 8,
        images: ["https://i.imgur.com/JfG4u3Y.png"],
        category: [7, 8],
    },
    {
        title: "Street",
        price: 500,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 5,
        images: ["https://i.imgur.com/latc6gM.jpg"],
        category: [1, 5],
    },
    {
        title: "Illustration",
        price: 850,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 8,
        images: ["https://i.imgur.com/AZaCae8.jpg"],
        category: [7, 8],
    },
    {
        title: "Juxtapoz",
        price: 810,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 8,
        images: ["https://i.imgur.com/91NhQHA.png"],
        category: [1, 2, 4],
    },
    {
        title: "Laca",
        price: 830,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 8,
        images: ["https://i.imgur.com/pp1pRuc.jpg"],
        category: [1, 2, 4],
    },
    {
        title: "Luz",
        price: 840,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/PhzuL9K.jpg"],
        category: [1, 2, 4],
    },
    {
        title: "Manga",
        price: 850,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/m91LPWR.jpg"],
        category: [1, 2, 4],
    },
    {
        title: "Home",
        price: 800,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 4,
        images: ["https://i.imgur.com/cepUaj5.jpg"],
        category: [3, 4],
    },
    {
        title: "Mind bending",
        price: 860,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/QxcVtQE.jpg"],
        category: [5, 3],
    },
    {
        title: "Arrow",
        price: 700,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/PrleP89.jpg"],
        category: [5, 3],
    },
    {
        title: "Sketch",
        price: 900,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 2,
        images: ["https://i.imgur.com/M9ZabBK.jpg"],
        category: [5, 3],
    },
    {
        title: "Faro",
        price: 300,
        description:
            "De la colección de contrastes, el faro en el mar",
        stock: 0,
        userId: 4,
        images: ["https://i.imgur.com/m81rQbp.jpg"],
        category: [5],
    },
    {
        title: "Van",
        price: 300,
        description:
            "De la colección de contrastes, una van en el desierto",
        stock: 3,
        userId: 4,
        images: ["https://i.imgur.com/aVJ5Iw7.jpg"],
        category: [5],
    },
    {
        title: "El Pato",
        price: 800,
        description:
            "Un gracioso pato",
        stock: 5,
        userId: 5,
        images: ["https://i.imgur.com/6CioD2b.png"],
        category: [1],
    },
    {
        title: "Zorro",
        price: 800,
        description:
            "Un zorro de ojos azules",
        stock: 5,
        userId: 4,
        images: ["https://i.imgur.com/uUd7LqQ.png"],
        category: [3, 4],
    },
    {
        title: "Earth",
        price: 1000,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 2,
        images: ["https://i.imgur.com/97rLFyI.jpg"],
        category: [5],
    },
    {
        title: "Walls",
        price: 900,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 2,
        images: ["https://i.imgur.com/HwGanIt.jpg"],
        category: [5],
    },
    {
        title: "Ballerina",
        price: 960,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 2,
        images: ["https://i.imgur.com/nPuRwtH.png"],
        category: [5],
    },
    {
        title: "Pink Floyd en Barcelona",
        price: 1000,
        description:
            "Cartel publicitario del recital de Pink Floyd en Barcelona",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/SzAsdNG.jpg"],
        category: [3, 4],
    },
    {
        title: "Pink Floyd en New York",
        price: 1000,
        description:
            "Cartel publicitario del recital de Pink Floyd en New York",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/WsU17dT.jpg"],
        category: [1, 3, 4],
    },
    {
        title: "Pink Floyd en Pennsylvania",
        price: 1000,
        description:
            "Cartel publicitario del recital de Pink Floyd en Pennsylvania",
        stock: 4,
        userId: 1,
        images: ["https://i.imgur.com/5Lskah7.jpg"],
        category: [2, 5],
    },
    {
        title: "Nave",
        price: 850,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 3,
        images: ["https://i.imgur.com/4nqzgmO.jpg"],
        category: [6, 7],
    },
    {
        title: "Sun",
        price: 750,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 4,
        images: ["https://i.imgur.com/oCw3s9g.jpg"],
        category: [6, 7],
    },
    {
        title: "Surreal 1",
        price: 800,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 6,
        images: ["https://i.imgur.com/16L9oWd.jpg"],
        category: [6, 7],
    },
    {
        title: "Separador de Estela Maya",
        price: 300,
        description:
            "La famosa estela maya de Quiriguá",
        stock: 2,
        userId: 7,
        images: ["https://i.imgur.com/NiWmWae.jpg"],
        category: [1, 2, 5],
    },
    {
        title: "Kotz'ij",
        price: 2000,
        description:
            "Del kaqchikel, kotz'ij que significa flor",
        stock: 1,
        userId: 5,
        images: ["https://i.imgur.com/R3v4hNp.jpg"],
        category: [4, 5],
    },
    {
        title: "Velero",
        price: 300,
        description:
            "De la colección de contrastes, un velero en el mar",
        stock: 3,
        userId: 4,
        images: ["https://i.imgur.com/CycL5J5.jpg"],
        category: [2, 3],
    },
    {
        title: "Watchmen",
        price: 900,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 1,
        images: ["https://i.imgur.com/0zL0lgO.jpg"],
        category: [6, 7],
    },
    {
        title: "Ghost",
        price: 400,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 2,
        images: ["https://i.imgur.com/wyHZFo5.png"],
        category: [8, 9],
    },
    {
        title: "Wall mural",
        price: 500,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin ut nisl nec aliquet. Aliquam ultrices quam dui, vitae rhoncus leo euismod sed.",
        stock: 5,
        userId: 3,
        images: ["https://i.imgur.com/uVl1rLd.jpg"],
        category: [8, 9],
    },
];

module.exports = arrayOfProducts;
