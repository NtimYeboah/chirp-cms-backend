/**
 * Created by ntimobedyeboah on 4/9/17.
 */
const Post = require('../models/post'),
    cuid = require('cuid'),
    slug = require('limax'),
    sanitizeHtml = require('sanitize-html'),

    transform = require('./../utils/transformer');

/**
 * Get all posts
 *
 * @param req
 * @param res
 */
const getPosts = function(req, res) {
    Post.find({}).sort('-dateCreated').exec((err, posts) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json({
            posts: transform.collection(posts)
        });
    });
};

/**
 * Save a post
 *
 * @param req
 * @param res
 */
const addPost = function(req, res) {
    //todo: Add a validator, bind the model to the route
    if (!req.body.title || !req.body.content) {
        res.status(403).end();
    }

    const post = new Post({
        title: sanitizeHtml(req.body.title),
        content: sanitizeHtml(req.body.content),
        slug: slug(req.body.title.toLowerCase(), { lowercase: true }),
        cuid: cuid()
        //user: req.user._id
    });

    post.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(201).json({
            post: transform.item(saved)
        });
    });
};

/**
 * Get a single post
 *
 * @param req
 * @param res
 */
const getPost = function(req, res) {
    Post.findOne({ slug: req.params.slug }).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json({
            post: transform.item(post)
        });
    });
};

/**
 * Update a single post
 *
 * @param req
 * @param res
 */
const updatePost = function(req, res) {
    Post.findOne({ slug: req.params.slug }).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }

        Object.assign(post, req.body).save((err, updatedPost) => {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).send({
                post: transform.item(updatedPost)
            });
        });
    });
};

/**
 * Delete a single post
 *
 * @param req
 * @param res
 */
const deletePost = function(req, res) {
    Post.findOne({ slug: req.params.slug }).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }

        post.remove(() => {
            res.status(200).end();
        });
    });
};

module.exports = {
    getPost,
    addPost,
    getPosts,
    updatePost,
    deletePost
};