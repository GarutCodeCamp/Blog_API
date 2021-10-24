const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();
const auth = require('./routes/auth');
const users = require('./routes/users');
const uploads = require('./routes/multer');
const posts = require('./routes/posts');
const categories = require('./routes/categories');

const app = express();

app.use(express.json());
connect(`${process.env.MONGODB}`, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err.message));

app.use('/api/v1/auth', auth);
app.use('/api/v1/user', users);
app.use('/api/v1/post', posts);
app.use('/api/v1/category', categories);
app.use('/api/v1/upload', uploads);

app.listen(5000, () => {
    console.log('server is running');
});
