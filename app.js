const express = require('express');
const app = express();
const conn = require('./db/database');

const pokeRouter = require('./src//pokemon');

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.set('port', process.env.PORT || 4000);

app.use('/pokemon', boardRouter);

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});