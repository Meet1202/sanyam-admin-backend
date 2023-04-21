const express = require('express');
const amount = express.Router();
const amountService = require('./../services/amount')

amount.post('/', [amountService.bulkAddAmount]);
amount.get('/', [amountService.getLogs]);
amount.post('/listByVolunteers', [amountService.getAmountByVolunteers])

module.exports = amount;