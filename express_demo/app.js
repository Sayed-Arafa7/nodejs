const express = require('express')
const app = express();
app.use(express.json())

const books = [
    { title: 'java', id: 1 },
    { title: 'Java script', id: 2 },
    { title: 'Node js', id: 3 },
]

app.get('/', (req, res) => {
    res.send('Welcome to Books Api')
})

app.post('/api/books', (req, res) => {
    let title = req.body.title;
    let book = { id: books.length + 1, title: title }
    books.push(book);
    res.send(book)
})

app.get('/api/books', (req, res) => {
    res.send(books);
})

app.put('/api/books/:id', (req, res) => {
    let id = +req.params.id;
    let title = req.body.title

    let book = books.find((b) => {
        if (b.id == id) {
            return b;
        }
    })

    if (book) {
        book.title = title;
        res.send(book)
    } else {
        res.status(404).send('Book not found with given id ...')
    }
})

app.delete('/api/books/:id', (req, res) => {
    let id = +req.params.id;
    let index = books.findIndex(b => {
        if (b.id == id) {
            return true
        }
    })
    if (index > -1) {
        let b = books.splice(index, 1);
        res.send(b);
    } else {
        res.status(404).send('Book not found...')
    }

})

app.listen(3000, () => {
    console.log("Listening on port 3000...");
})