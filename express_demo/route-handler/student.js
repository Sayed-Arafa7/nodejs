const express = require('express');
const router = express.Router();
const swig = require('swig')

let students = [
    { name: "Mohan 1", id: 1 },
    { name: "Some NAme 2", id: 2 },
    { name: "Student 3", id: 3 },
    { name: "Student 4", id: 4 },
    { name: "Student 5", id: 5 },
]
router.get('/:id', (req, res) => {
    students.find((e) => {
        if (e.id == +req.params.id) {
            res.send(e)
        }
    })
    res.status(404).send("Not Found")
})

//post request For Create A Student
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    let name = req.body.name;
    students.find((e) => {
        if (e.id == +req.params.id) {
            e.name = name;
            res.send(e);
        }
    })
    res.status(404).send();
})


router.get('/', (req, res) => {
    let template = swig.compileFile('htmls/student-list.html')
    res.send(template({}))
        // res.send(students)
})

///:id

router.delete('/:id', (req, res) => {
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


module.exports = router;