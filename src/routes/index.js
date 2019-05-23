const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Image = require('../models/image');
//async beacuse consult to DB and a peticion AJAX always use it
router.get('/', async (req, res) => {
    const images = await Image.find();
    console.log(images);
    // res.send('index page');
    res.render('index', {images: images});//can be images
});

router.get('/upload', (req, res) =>{
    res.render('upload');
});

router.post('/upload', async (req, res) =>{
    
    const image = new Image();
    image.title = req.body.title;
    image.description= req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    console.log(image);
    await image.save();
    // to redirect to view init
    res.redirect('/');
    //console.log(req.file);// infor original image
    //res.send('uploaded');
});
// to look a esprecific image
router.get('/image/:id', async (req, res) =>{
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log(image);
    //res.send('Profile image');
    res.render('profile', { image: image });// so you pass params at view
     
})

router.get('/image/:id/delete', async (req, res) =>{
    const { id} = req.params;
    const image = await Image.findByIdAndDelete(id);// to delete from MONGODB
    unlink(path.resolve('./src/public' + image.path)); // to delete of proyect
    res.redirect('/');
});


module.exports = router;