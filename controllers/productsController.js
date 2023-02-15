let controller = {};
const models = require('../models');

controller.show = async (req, res) => {
    let brand = req.query.brand;

    let brands = await models.Brand.findAll({
        include: [{
            model: models.Product
        }]
    })
    res.locals.brands = brands;
    console.log(brands);


    let category = req.query.category;
    let categories = await models.Category.findAll({
        include: [{
            model: models.Product
        }]
    })
    res.locals.categories = categories;

    let options = {
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice',],
        where: {}
    }
    if(category) {
        options.where.categoryId = category
    }
    if(brand) {
        options.where.brandId = brand
    }
    let products = await models.Product.findAll(options);
    res.locals.products = products;
    res.render('product-list');
}

module.exports = controller;