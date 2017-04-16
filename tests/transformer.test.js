/**
 * Created by ntimobedyeboah on 4/16/17.
 */
const transform = require('./../utils/transformer');

describe('Transformer test', () => {
    it('should transform a single post', (done) => {
        let post = {
            '_id': '58f339b081c2aab5ad7ebeb2',
            'cuid': 'cj1khqqm80000vxh745u1gu7p',
            'title': 'Lorem ipsum',
            'slug': 'lorem-ipsum',
            'content': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
            'body': 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        };

        let data = transform.item(post);

        data.should.be.a('object');
        data.should.have.all.keys('id', 'cuid', 'title', 'slug', 'content');
        data.should.not.have.key('body');
        done();
    });

    it('should transform a collection of posts', (done) => {
        let posts = [
            {
                '_id': '58f339b081c2aab5ad7ebeb2',
                'cuid': 'cj1khqqm80000vxh745u1gu7p',
                'title': 'Lorem ipsum',
                'slug': 'lorem-ipsum',
                'content': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
                'body': 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            },
            {
                '_id': '2aab5ad7ebeb258f339b081c',
                'cuid': 'vxh745u1gu7pcj1khqqm80000',
                'title': 'Perspiciatis unde omnis',
                'slug': 'perspiciatis-unde-omnis',
                'content': 'Sit voluptatem accusantium doloremque laudantium sed ut perspiciatis unde omnis iste natus error',
                'body': 'Labore et dolore magna aliqua sed do eiusmod tempor incididunt ut'
            }

        ];

        let data = transform.collection(posts);

        data.should.be.a('array');
        data[0].should.have.all.keys('id', 'cuid', 'title', 'slug', 'content');
        data[0].should.not.have.key('body');
        data[1].should.have.all.keys('id', 'cuid', 'title', 'slug', 'content');
        data[1].should.not.have.key('body');
        done();
    });
});