/**
 * Created by ntimobedyeboah on 4/9/17.
 */
const PostController = require('../controllers/post.controller'),
    Router = require('express').Router,
    router = new Router();

// Get all posts
router.route('/posts').get(PostController.getPosts);

// Get a single post
router.route('/posts/:cuid').get(PostController.getPost);

// Add a post
router.route('/posts').post(PostController.addPost);

// Update a post
router.route('/posts/:cuid').put(PostController.updatePost);

// Delete a post
router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;