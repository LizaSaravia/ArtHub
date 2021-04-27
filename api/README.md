## Rutas de Productos

*Get*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products` | Carga todos los productos existentes |
| `http://localhost:3001/products/id` | Carga los detalles del producto seleccionado |
| `http://localhost:3001/products/categorias/:nombrecat` | Carga el producto por categoría |

*Post*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products` | Crea productos |
| `http://localhost:3001/products/:idProducto/category/:idCategorias` | Agrega categoria al producto |

*Put*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/:id` | Modifica los productos por id |

*Delete*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/:id` | Elimina un producto por id |
`http://localhost:3001/products/:idProducto/category/:idCategorias` | Elimina una categoria de un producto |

- - 

# Rutas de Categorias

*Get*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/category` | Carga todas las categorias |

*Post*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/category` | Crea categorias |

*Put*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/category/:id` | Modifica las categorias por id |

*Delete*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/products/category/:id` | Elimina una categoria por id |

- - 

# Search

*Get*
| Ruta | Descripción |
| --- | --- |
| `http://localhost:3001/search` | Busca productos por titulo o por alguna palabra que coincida con la descripción |
