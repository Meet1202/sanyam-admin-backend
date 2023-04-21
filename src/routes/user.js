const express = require('express');
const user = express.Router();
const userService = require('./../services/user')

user.post('/', [userService.createUser]);

user.put('/login', [userService.loginUser]);
 
user.put('/:userId/update', [userService.updateUser]);

user.put('/:userId/updateStatus', [userService.updateUserStatus]);

user.delete('/:userId', [userService.deleteUser]);

user.get('/', [userService.getAllUsers]);

user.get('/:volunteerId', [userService.getAllUserById]);

user.get('/:userId/detail', [userService.getUserById]);

user.post('/search', [userService.searchUser]);

module.exports = user;