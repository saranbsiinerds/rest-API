const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
    { id: 4, name: 'course4'},
]

//middlewares
app.use('/service', () => {
    console.log('This is a service middleware');
});

app.use('/courses', () => {
    console.log('This is a course middleware');
});



//ROUTES
app.get('/', (req, res) => {
    res.send('We are home');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));//query to find the course with given id parameter
    if(!course) res.status(404).send(`The course with id ${req.params.id} not found`);//error message if course doesnot return a value
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

//add new object
app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


//update values
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));//query to find the course with given id parameter
    if(!course) res.status(404).send(`The course with id ${req.params.id} not found`);//error message if course doesnot return a value
    if(!req.body.name || req.body.name.length < 3) {
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }

    course.name = req.body.name;
    res.send(course); 
});

//delete values
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));//query to find the course with given id parameter
    if(!course) res.status(404).send(`The course with id ${req.params.id} not found`);//error message if course doesnot return a value
    // if(!req.body.name || req.body.name.length < 3) {
    //     //400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    // }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

//start server
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server ${port} is up and running`));