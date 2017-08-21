var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');

// get index
router.get('/', function(req, res, next) {
  knex.raw(`select posts.title, posts.text, users.username, posts.id from posts inner join users on users.id = posts.author_id`)
  .then(function(data) {
    res.render('index', {allPosts: data.rows, title:'Reddit but Better', cookie: req.cookies.user_id})

})
});
//get profile page
router.get('/profile/:id', function(req,res,next) {
  if(req.cookies.user_id) {
    knex.raw(`select * from users where id = ${req.cookies.user_id}`)
    .then(function(user) {
      res.render('profile', {user: user.rows[0], title: 'Reddit but Better'})
    })
  } else {
    res.redirect('/')
  }
})
// createPost
router.post('/', function(req, res, next) {
  if(req.body.newTitle && req.body.text1) {
  knex.raw(`insert into posts values (default, '${req.body.newTitle}', '${req.body.text1}', '${req.cookies.user_id}')`)
  .then(function(data1) {
    knex.raw(`select posts.title, posts.text, posts.id, users.username from posts inner join users on users.id = posts.author_id`)
  .then(function(data) {
    res.render('index', {allPosts: data.rows, title:'Reddit but Better', cookie: req.cookies.user_id})
    console.log(data.rows)
  })
  })
} else {
    res.redirect('/')
}
})
//get post/comment page
router.get('/post/:id', function(req,res,next) {
    knex.raw(`select posts.title, posts.text, posts.id, users.username from posts inner join users on posts.author_id = users.id where posts.id = ${req.params.id}`)
    .then(function(data) {
    knex.raw(`select comments.comment_text from comments where comments.original_post_id = ${req.params.id}`)
    .then(function(data2) {
      res.render('posts', {allPosts: data.rows[0], comment: data2.rows, title: 'Reddit but Better', cookie: req.cookies.user_id})
    })
})
})
//post comment
router.post('/post/:id/comment', function(req,res,next) {
  if(req.body.comText) {
  knex.raw(`insert into comments values (default, '${req.body.comText}', '${req.cookies.user_id}', '${req.params.id}')`)
  .then(function(data2) {
  knex.raw(`select posts.title, posts.text, posts.id, users.username from posts inner join users on users.id = posts.author_id`)
  .then(function(data) {
  knex.raw(`select comments.comment_text from comments where comments.original_post_id = ${req.params.id}`)
  .then(function(data4) {
    res.render('posts', {title:'Reddit but Better', comment: data4.rows, cookie: req.cookies.user_id, allPosts: data.rows[0]})
  })
})
})
} else {
  res.redirect('/')
}
});
// get createAccount page
router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title: 'Reddit but Better' });
});
// create new account
router.post('/create', function(req, res, next) {
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 8, function(err,hash) {
      knex.raw(`insert into users values (default, '${req.body.username}', '${hash}', '${req.body.email}')`)
      .then(function(data) {
        res.redirect('/')
      })
    })
  } else {
    res.redirect('create')
  }
});

// get login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Reddit but Better' });
});

// login
router.post('/login', function(req,res,next) {
  knex.raw(`select * from users where username = '${req.body.username}'`)
  .then(function(users) {
    bcrypt.compare(req.body.password, users.rows[0].password, function(err, response) {
      if(response) {
        res.cookie('user_id', users.rows[0].id)
        res.redirect(`/`)
        // res.redirect(`/profile/${users.rows[0].id}`)
      } else {
      res.redirect('/')
      }
    })
  })
})

//logout
router.get('/logout', function(req, res, next) {
  res.clearCookie('user_id');
  res.redirect('/');
});

//delete account
router.post('/profile/:id/delete', function(req, res, next) {
  knex.raw(`delete from users where id = ${req.params.id}`)
  .then(function(data) {
    res.clearCookie('user_id');
    res.redirect('/')
  })
})


module.exports = router;
