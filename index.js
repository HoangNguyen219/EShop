'use strict';


const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const expressHandlebars = require('express-handlebars');
const { createStarList } = require('./controllers/handlebarsHelper');
const { createPagination } = require('express-handlebars-paginate');
const session = require('express-session');

app.use(express.static(__dirname + '/public'));

app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        createStarList,
        createPagination
    }
}));
app.set('view engine', 'hbs');

//Cau hinh doc du lieu post tu body
app.use(express.json()) //application/json
app.use(express.urlencoded({extended: false})) // application/x-www-form-urlencoded

// Cau hinh session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000 // 20'
    }
}))

// middleware khoi tao gio hang
app.use((req, res, next) => {
    let Cart = require('./controllers/cart');
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    res.locals.quantity = req.session.cart.quantity
    next()
})

app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productsRouter'));


app.use((req, res, next) => {
    res.status(404).render('error', { message: 'File not Found' });
})

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});


