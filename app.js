const express = require('express');
const { projects } = require('./data.json');
console.log(projects);

const app = express();
app.set('view engine', 'pug');

// Route for static files
app.use('/static', express.static('public'));

// app.use(index);
app.get('/', (req, res) => {
    res.render('index', { projects });
});
// app.use(about);
app.get('/about', (req, res) => {
    res.render('about');
});
// app id route with error handler
app.get('/project/:id', (req, res, next) => {
    const id  = req.params.id;
    if (projects[id]) {
        res.render('project', { project: projects[id] })
    } else {
        const err = new Error()
        err.status = 404
        err.message = 'This page does not exist'
        next(err)
    }
    
});

//- 404 error handler
app.use((req, res, next) => {
    const err = new Error("This page does not exist")
    err.status = 404
    console.log(`Oops there has been a ${err.status} error. ${err.message}`)
    next(err)
})

//- Global error handler
app.use(( err, req, res, next ) => {
    res.locals.error = err;
    if (err.status === 404) {
      res.status(err.status);
      res.render('page-not-found')
    } else {
        err.message = `OOPs! Something went wrong on the server!`
        res.status(err.status || 500);
        res.render('error', err);
  }
});


app.listen(3000, () => {
    console.log('This application is running on localhost:3000')
});