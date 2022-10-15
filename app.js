const express = require('express');
const cors = require('cors');
const app = express();
const conn = require('./db/database');

const pokeRouter = require('./src/pokemon');
const typeRouter = require('./src/types');

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.set('port', process.env.PORT || 4000);

app.use('/pokemon', pokeRouter);
app.use('/types', typeRouter);

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});