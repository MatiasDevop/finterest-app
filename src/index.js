const express = require ('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');

// initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//MIDLEWAERES
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
// to config image at charge
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
        cb(null, uuid() + path.extname(file.originalname));
    }
})
//here to create directory
app.use(multer({ storage:storage }).single('image'));
//Global variables
// to format to imges to time or hours and datetime
app.use((req, res, next) =>{
    app.locals.format = format;
    next();
});
// ROUTES
app.use(require('./routes/index'));
//static files 
// to make public file so get it from browser.
app.use(express.static(path.join(__dirname, 'public')));
//start server

app.listen(app.get('port'), () =>{
    console.log('sever i port:${3000}');
});