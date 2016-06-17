var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index');
    knex.table('blog_posts').join('users', 'users.name', 'blog_posts.users_name').select().then(function(blog_posts) {
        res.render('index', {
            blog_posts: blog_posts
        });
    });

});

router.get('/addUser', function(req, res, next) {
    knex.table('users').select().then(function(users) {
        res.render('addUsers', {
            users: users
        });

    });
});

router.post('/addUser', function(req, res, next) {
    var name = req.body.name;
    knex.table('users').insert({
        name: name
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    });
});

router.get('/add', function(req, res, next) {
    knex.table('users').select().then(function(users) {
        res.render('add', {
            users: users
        });

    });

});

router.post('/add', function(req, res, next) {
    var body = req.body.body;
    var users_name = req.body.users_name;
    var title = req.body.title;
    var date = req.body.date;
    knex.table('blog_posts').insert({
        body: body,
        date: date,
        users_name: users_name,
        title: title
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    });

});

module.exports = router;
