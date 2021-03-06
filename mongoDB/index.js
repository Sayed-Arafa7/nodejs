const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/abc', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log('connected to mongo db ', err);
    })



const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: [String],
    isAdmin: Boolean
})

const User = mongoose.model('user', userSchema)

async function createUser() {

    const user = new User({
        name: 'sandeep',
        age: 22,
        email: 'sandeep@gmail.com',
        phone: ['5656666', '56895656'],
        isAdmin: true
    })

    const result = await user.save()
    console.log(result);

}

async function getUsers() {
    // const result = await User.find()
    // const user = await User.findById('5ec78f2f6983b37254f7ad49')
    const users = await User.find()
        .sort({ name: -1 })
        .limit(1)
    console.log(users);

}

getUsers()

// createUser();