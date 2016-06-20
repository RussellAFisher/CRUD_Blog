var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    knex('blog_posts').leftJoin('comment', 'comment.blog_id', 'blog_posts.id').select('blog_posts.title', 'blog_posts.id', 'blog_posts.body', 'blog_posts.date', 'comment.comment', 'comment.users_name').then(function(landing) {
        res.render('index', {
            landing: landing
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
    knex.table('blog_posts').insert({
        body: body,
        users_name: users_name,
        title: title
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    });

});

router.get('/comment/:id', function(req, res, next) {
    knex.table('users').select().then(function(users) {
        res.render('comment', {
            users: users,
            id: req.params.id
        });

    });

});

router.post('/comment/:id', function(req, res, next) {
    var comment = req.body.comment;
    var users_name = req.body.users_name;
    knex.table('comment').insert({
        blog_id: req.params.id,
        comment: comment,
        users_name: users_name,
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    });

});

router.get('/post/:id', function(req, res, next) {
    knex('blog_posts').where({
        id: req.params.id
    }).first().then(function(blog_posts) {
        res.render('detailView', {
            blog_posts: blog_posts
        });
    });
});


router.get('/blogEdit/:id', function(req, res, next) {
    knex('blog_posts').where({
        id: req.params.id
    }).first().then(function(blog_posts) {
        res.render('blogEdit', {
            blog_posts: blog_posts
        });
    });
});

router.post('/blogEdit/:id', function(req, res, next) {
    var body = req.body.body;
    var title = req.body.title;
    knex('blog_posts').where({
        id: req.params.id
    }).update({
        body: body,
        title: title
    }).then(function() {
        res.redirect("/" + req.params.id);
    });
});

router.get('/delete/:id', function(req, res, next) {
    knex('blog_posts').where({
        id: req.params.id
    }).del().then(function() {
        res.redirect('/');
    });
});

router.get('/:name/userDelete', function(req, res, next) {
    knex('users').where({
        name: req.params.name
    }).del().then(function() {
        res.redirect('/');
    });

});

module.exports = router;
