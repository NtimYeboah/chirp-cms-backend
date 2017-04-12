/**
 * Created by ntimobedyeboah on 4/9/17.
 */
const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});