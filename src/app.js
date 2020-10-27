const express          = require('express')
const app              = express()
const port             = process.env.PORT ||8080

const route                    = require('./routes')
const expressLayouts           = require('express-ejs-layouts')
const bodyParser               = require('body-parser')
const morgan                   = require('morgan')
const formidable               = require('formidable')
const multer                   = require('multer')
const upload                   = multer({ dest: 'uploads/' })
const cors                     = require('cors'); 
const session                  = require('express-session')
const flash                    = require('connect-flash')
const cookieParser             = require('cookie-parser')
const passport                 = require('passport')
const viewEngine               = require('../src/config/viewEngine')
const connectDb                = require('../src/config/database')

require('dotenv').config()
connectDb() // connect database
viewEngine(app) // view engine setup
// setup for loading static resources from 'public' directory

app.use(expressLayouts)
// setup for body-parser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'))
app.use(cookieParser())
// express session middleware setup
app.use(session({
    secret: 'nitrotech',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000*6*30 } // expires in 30 minutes
}))
// two middlewares of passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// app.set('layout', 'layout');
app.set('view options', { layout: false });

// init route
route(app);

app.listen(port,() => {
    console.log(`This app is running at http://localhost:${port}`);
});
