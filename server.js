const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();
const auth = require('./routes/auth');

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

app.listen(5000, () => {
    console.log('server is running');
});
