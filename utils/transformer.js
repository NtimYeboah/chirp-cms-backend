/**
 * Created by ntimobedyeboah on 4/16/17.
 */
class Transformer {
    item(data) {
        if (typeof data !== 'object') {
            throw new Error ('Data given must be an object');
        }

        return {
            'id': data._id,
            'cuid': data.cuid,
            'slug': data.slug,
            'title': data.title,
            'content': data.content
        }
    }

    collection(data) {
        if (!Array.isArray(data)) {
            throw new Error ('Data given must be an array');
        }

        return data.map(item => this.item(item));
    }
}

module.exports = new Transformer;