const express = require('express'),
    router = express.Router(),
    { createPostValidator } = require('../validator');
const { getPosts, createPost, postByUser, postById, isPoster, deletePost, updatePost, photo, singlePost, like,unlike ,comment,uncomment} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');




router.get('/posts', getPosts);

//like unlike
router.put('/post/like', requireSignin,like);
router.put('/post/unlike', requireSignin,unlike);

//comments
router.put('/post/comment', requireSignin,comment);
router.put('/post/uncomment', requireSignin,uncomment);

router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.get("/post/photo/:postId", photo);
router.get("/post/:postId", singlePost);
;


router.param("userId", userById);
router.param("postId", postById);

module.exports = router;