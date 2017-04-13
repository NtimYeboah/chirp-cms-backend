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

        Post.remove({}, (err) => {
            if (err) throw err;
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
                done();
            });
        });
    });


    describe('/POST post', () => {
        it('should create a post', (done) => {
            chai.request(server)
            .post('/api/posts')
            .send(dummyData.post1)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
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
                    done();
                });
            });
        });
    });

});
