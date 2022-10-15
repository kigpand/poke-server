//18

const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const conn = require('../db/database');

router.get('/', async (req, res) => {
    let values = [];
    for (let i = 1; i <= 18; i++) {
        await axios.get(`https://pokeapi.co/api/v2/type/${i}`).then((v) => {
            const relations = v.data.damage_relations;
            const doubleDamegeFrom = onGetArrayString(relations.double_damage_from);
            const doubleDamegeTo = onGetArrayString(relations.double_damage_to);
            const halfDamegeFrom = onGetArrayString(relations.half_damage_from);
            const halfDamegeTo = onGetArrayString(relations.half_damage_to);
            const noDamegeFrom = onGetArrayString(relations.no_damage_from);
            const noDamegeTo = onGetArrayString(relations.no_damage_to);

            values.push([v.data.id, v.data.name, doubleDamegeFrom, doubleDamegeTo, halfDamegeFrom, halfDamegeTo, noDamegeFrom, noDamegeTo]);
        });
    }

    const sql = 'INSERT INTO pokemon.types(id, name, doubleDamegeFrom, doubleDamegeTo, halfDamegeFrom, halfDamegeTo, noDamegeFrom, noDamegeTo) values ?';
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
})

function onGetArrayString(arr) {
    return arr.map((v) => {
        return v.name;
    }).toString();
}

module.exports = router;