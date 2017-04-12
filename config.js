/**
 * Created by ntimobedyeboah on 4/9/17.
 */
const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/db_cms',
    port: process.env.PORT || 9000
};

module.exports = config;