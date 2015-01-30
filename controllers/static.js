var express = require('express')
var router = express.Router()
var path = require('path')

router.use(express.static(__dirname + '/../assets'))
router.use(express.static(__dirname + '/../layouts'))

router.get('/', function(req, res) {
    res.sendFile('layouts/app.html', { root: path.join(__dirname, '../') })
})

module.exports = router
