const express = require('express')
const Joi = require('@hapi/joi');
const app = express();
var morgan = require('morgan')
const swig = require('swig')



const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(express.text())
app.use(express.static('./public'))


app.use(cookieParser())
app.use(morgan("short"))

app.get('/', (req, res) => {
    let result = swig.compileFile('htmls/student-list.html');
    res.send(result({ title: 'My First Page' }));
})

const studentsRouter = require('./route-handler/student')
app.use('/api/students', studentsRouter);
app.listen(3000, () => {
    console.log('listening on Port 3000');
})