const express = require('express')
const Joi = require('@hapi/joi');
const app = express();
var morgan = require('morgan')

const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(express.text())
app.use(express.static('./public'))


app.use(cookieParser())
app.use(morgan("short"))


let students = [
    { name: "Student 1", id: 1 },
    { name: "Student 2", id: 2 },
    { name: "Student 3", id: 3 },
    { name: "Student 4", id: 4 },
    { name: "Student 5", id: 5 },
]

app.get('/', (req, res) => {

    res.cookie('cookie 1', 'value 1')
    res.cookie('cookie 2', 'value 1')
    res.cookie('cookie 3', 'value 1')
    res.send('Well come')
})

app.get('/cookies', (req, res) => {
    res.send(req.cookies)
})

app.get('/api/students', (req, res) => {

    res.send(students)
})

// /api/students/1



app.get('/api/students/:id', (req, res) => {
    students.find((e) => {
        if (e.id == +req.params.id) {
            res.send(e)
        }
    })
    res.status(404).send("Not Found")
})

//post request For Create A Student
app.post('/api/students', (req, res) => {
    let name = req.body.name;

    const scema = Joi.object({
        name: Joi.string().min(3).max(15).required()
    })

    let result = scema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    let student = {
        id: students.length + 1,
        name: name
    }
    students.push(student);
    res.send(student);
})

//put 
app.put('/api/students/:id', (req, res) => {
    let name = req.body.name;
    students.find((e) => {
        if (e.id == +req.params.id) {
            e.name = name;
            res.send(e);
        }
    })
    res.status(404).send();
})

///api/students/:id

app.delete('/api/students/:id', (req, res) => {
    let index = students.findIndex((el) => {
        if (el.id == req.params.id) {
            return true;
        }
    })
    if (index < 0) {
        res.status(404).send('Not Found')
        return;
    }
    let student = students[index];
    students.splice(index, 1)
    res.send(student)
})


app.listen(3000, () => {
    console.log('listening on Port 3000');
})