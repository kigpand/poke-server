const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const conn = require('../db/database');

router.get('/', async (req, res) => {
    let values = [];
    for (let i = 200; i <= 267; i++) {
        await axios.get(`https://pokeapi.co/api/v2/ability/${i}`).then((v) => {
            const text = getFlavorText(v.data.flavor_text_entries);
            const name = getName(v.data.names);
            values.push([i, name, text]);
        });
    }

    const sql = 'INSERT INTO pokemon.abilities(id, name, text) values ?';
    conn.query(sql, [values], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.json({
                result: false,
            })
        } else {
            res.json({
                result: true
            });
        }
    });
});

function getName(arr) {
    const result = arr.find((v) => v.language.name === 'ko');
    return result ? result.name : null;
}

function getFlavorText(arr) {
    const result = arr.find((v) => v.language.name === 'ko');
    return result ? result.flavor_text : null;
}

module.exports = router;