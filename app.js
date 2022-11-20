const express = require('express');
const cors = require('cors');
const app = express();
const conn = require('./db/database');

const addRouter = require('./src/addPoke');
const addTypeRouter = require('./src/addType');
const addAbilityRouter = require('./src/addAbilities');
const pokeRouter = require('./src/pokemon');
const typeRouter = require('./src/types');
const abilityRouter = require('./src/ability');

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

app.use(cors({
    origin: ['http://localhost:3000', 'https://kigpand.github.io'],
    credentials: true,
}));

app.set('port', process.env.PORT || 4000);

app.use('/addPoke', addRouter);
app.use('/addTypeRouter', addTypeRouter);
app.use('/addAbilities', addAbilityRouter);
app.use('/pokemon', pokeRouter);
app.use('/types', typeRouter);
app.use('/ability', abilityRouter);

app.listen(app.get('port'), () => {
    console.log('포켓몬 서버 실행');
});