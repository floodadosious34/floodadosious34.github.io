const express = require('express');
const data = require('./data');
// const index = require('./routes/index');
// const about = require('./routes/about');

const app = express();
app.set('view engine', 'pug');

// Route for static files
app.use('/static', express.static('public'));

// app.use(index);
// app.use(about);


app.get('/', (req, res) => {
    res.render('index', data.projects);
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {

});



app.listen(3000, () => {
    console.log('This application is running on localhost:3000')
});