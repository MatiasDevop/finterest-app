const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app_finter',{
    useNewUrlParser: true
})
.then(db => console.log('DB is connceted...'))
.catch(err => console.error(err));