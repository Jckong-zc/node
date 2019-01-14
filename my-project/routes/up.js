var express = require('express');
var router = express.Router();
var {
    connect,
    insert,
    find,
    ObjectId
} = require("../libs/mongo.js");
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});