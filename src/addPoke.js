const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const conn = require('../db/database');

const countMap = {
    '0': { start: 1, end: 50 },
    '50': { start: 50, end: 100},
    '100': { start: 100, end: 150},
    '150': { start: 150, end: 200},
    '200': { start: 200, end: 250},
    '250': { start: 250, end: 300},
    '300': { start: 300, end: 350},
    '350': { start: 350, end: 400},
    '400': { start: 400, end: 450},
    '450': { start: 450, end: 500},
    '500': { start: 500, end: 550},
    '550': { start: 550, end: 600},
    '600': { start: 600, end: 650},
    '650': { start: 650, end: 700},
    '700': { start: 700, end: 750},
    '750': { start: 750, end: 800},
    '800': { start: 800, end: 850},
    '850': { start: 850, end: 899},
}

function getCount(count) {
    return countMap[count];
}

router.get('/update/:name', async(req, res) => {
    const sql = 'UPDATE pokemon.pokemon set imageUrl=? where id=?';
    conn.query(sql, [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${req.params.name}.png`, req.params.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.json({
                result: false,
            })
        } else {
            res.json({
                result: req.params.name
            });
        }
    });
})

router.get('/:count', async(req, res) => {
    const sql = 'UPDATE pokemon.pokemon set imageUrl=? where id=?';
    conn.query(sql, [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${req.params.count}.png`, req.params.count], (err, rows, fields) => {
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

// router.get('/:count', async (req, res) => {
//     let values = [];
//     const { start, end } = getCount(req.params.count);
//     for (let i = Number(start); i <= Number(end); i++) {
//         await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(async (e) => {
//             const abilities = [];
//             await Promise.all(
//                 e.data.abilities.map(async (ability) => {
//                     const ab = await getAbilities(ability.ability.url);
//                     abilities.push(ab);
//             }));
    
//             const species = await getSpecies(e.data.species.url);
//             const imgUrl = e.data.sprites.front_default;
//             const stats = e.data.stats.map((stat) => {
//                 return `${stat.stat.name}, ${stat.base_stat}`;
//             });
//             const types = e.data.types.map((type) => {
//                 return type.type.name;
//             });
    
//             const weight = e.data.weight;
//             const height = e.data.height;
//             const id = e.data.id;

//             values.push([id, species.name, species.generation, imgUrl, stats.toString(), abilities.toString(), types.toString(), weight, height, species.genus ? species.genus : '', species.flavor ? species.flavor : '']);
//         });
//     }

//     res.json({
//         result: values
//     });

//     const sql = 'INSERT INTO pokemon.pokemon(id, name, generate, imageUrl, states, abilities, pokeTypes, weight, height, genus, flavor) values ?';
//     conn.query(sql, [values], (err, rows, fields) => {
//         if (err) {
//             console.log(err);
//             res.json({
//                 result: false,
//             })
//         } else {
//             res.json({
//                 result: true
//             });
//         }
//     });
//         // conn.query(`
//         //     INSERT INTO 
//         //     pokemon.pokemon(id, name, generate, imageUrl, states, abilities, pokeTypes, weight, height, genus, flavor) values 
//         //     ("${id}", "${species.name}", "${species.generation}", "${imgUrl}", "${stats}", "${abilities}", "${types}", "${weight}", "${height}", "${species.genus}", "${species.flavor}")`, (err, rows, fields)=>{
//         //         if(err) {
//         //             console.log(err);
//         //             res.json({
//         //                 result : false,
//         //             })
//         //         }else{
//         //             res.json({
//         //                 result : true,
//         //             });
//         //         }
//         // });
// });

async function getAbilities(url) {
    const name = await axios.get(url).then((e) => {
        return e.data.names.find((name) => name.language.name === 'ko');
    });
    return name.name;
}

async function getSpecies(url) {
    const speices = await axios.get(url).then(async (e) => {
        const genus = e.data.genera.find((gene) => gene.language.name === 'ko').genus;
        const flavor = e.data.flavor_text_entries.find((fla) => fla.language.name === 'ko').flavor_text;
        const name = e.data.names.find((name) => name.language.name === 'ko').name;
        const generation = await getGeneration(e.data.generation.url);

        return { genus: genus, flavor: flavor, name: name, generation: generation};
    });

    return speices;
}

async function getGeneration(url) {
    const generation = await axios.get(url).then((e) => {
        return e.data.names.find((name) => name.language.name === 'ko').name;
    });

    return generation;
}

module.exports = router;
