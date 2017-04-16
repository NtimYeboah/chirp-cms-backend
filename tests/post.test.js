/**
 * Created by ntimobedyeboah on 4/9/17.
 */
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose'),
    Mockgoose = require('mockgoose').Mockgoose,
    mockgoose = new Mockgoose(mongoose),
    Post = require('../models/post'),
    config = require('../config'),
    dummyData = require('./utils/data'),

    chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http'),
    cuid = require('cuid'),
    slug = require('limax');

const server = require('../app');

chai.use(chaiHttp);

describe('Posts', () => {

    beforeEach((done) => {
        mockgoose.prepareStorage().then(() => {
            mongoose.connect(config.mongoURL, (err) => {
                done(err)
            });
        });

        let post = new Post({
            'title': dummyData.post2.title,
            'content': dummyData.post2.content,
            'slug': slug(dummyData.post2.title, { lowercase: true }),
            'cuid': cuid()
        });

        post.save((err) => {
            if (err) done(err);
            done();
        });
    });

    afterEach((done) => {
        Post.remove({}, (err) => {
            if (err) throw err;
            done();
        });
    });

    describe('/GET post', () => {
        it('should get all posts', (done) => {
            chai.request(server)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.posts.should.be.a('array');
                res.body.posts[0].should.have.all.keys('id', 'cuid', 'slug', 'title', 'content');
                done();
            });
        });
    });

    describe('/posts create a single post', () => {
        it('should create a post', (done) => {
            chai.request(server)
            .post('/api/posts')
            .send(dummyData.post1)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.post.should.be.a('object');
                res.body.post.should.have.all.keys('id', 'cuid', 'slug', 'title', 'content');
                done();
            });
        })
    });

    describe('/GET/:cuid post', () => {
        it('should get a single book', (done) => {
            let post = new Post({
                'title': dummyData.post2.title,
                'content': dummyData.post2.content,
                'slug': slug(dummyData.post2.title, { lowercase: true }),
                'cuid': cuid()
            });

            post.save((err, savedPost) => {
                chai.request(server)
                .get(`/api/posts/${savedPost.cuid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.post.should.be.a('object');
                    res.body.post.should.have.all.keys('id', 'cuid', 'slug', 'title', 'content');
                    done();
                });
            });
        });
    });

    describe('/PUT/:cuid update', () => {
        it('should update a post', (done) => {
            let post = new Post({
                'title': dummyData.post1.title,
                'content': dummyData.post1.content,
                'slug': slug(dummyData.post1.title, { lowercase: true }),
                'cuid': cuid()
            });

            post.save((err, savedPost) => {
                chai.request(server)
                .put(`/api/posts/${savedPost.cuid}`)
                .send({
                    'title': 'This is a little ',
                    'content': dummyData.post2.content,
                    'slug': slug('This is a little', { lowercase: true }),
                    'cuid': cuid()
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.post.should.be.a('object');
                    res.body.post.should.have.all.keys('id', 'cuid', 'slug', 'title', 'content');
                    done();
                });
            });
        });
    });

});
