const routes  = require('express').Router();

const user = require('./user');
const amount = require('./amount');

routes.use('/users', user);
routes.use('/amount', amount);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected To SG apis!' });
});

module.exports = routes;