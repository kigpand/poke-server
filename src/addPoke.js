const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const conn = require('../db/database');

router.get('/', async (req, res) => {
    let values = [];
    for (let i = 800; i < 899; i++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(async (e) => {
            const abilities = [];
            await Promise.all(
                e.data.abilities.map(async (ability) => {
                    const ab = await getAbilities(ability.ability.url);
                    abilities.push(ab);
            }));
    
            const species = await getSpecies(e.data.species.url);
            const imgUrl = e.data.sprites.front_default;
            const stats = e.data.stats.map((stat) => {
                return `${stat.stat.name}, ${stat.base_stat}`;
            });
            const types = e.data.types.map((type) => {
                return type.type.name;
            });
    
            const weight = e.data.weight;
            const height = e.data.height;
            const id = e.data.id;

            values.push([id, species.name, species.generation, imgUrl, stats.toString(), abilities.toString(), types.toString(), weight, height, species.genus ? species.genus : '', species.flavor ? species.flavor : '']);
        });
    }

    const sql = 'INSERT INTO pokemon.pokemon(id, name, generate, imageUrl, states, abilities, pokeTypes, weight, height, genus, flavor) values ?';
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
        // conn.query(`
        //     INSERT INTO 
        //     pokemon.pokemon(id, name, generate, imageUrl, states, abilities, pokeTypes, weight, height, genus, flavor) values 
        //     ("${id}", "${species.name}", "${species.generation}", "${imgUrl}", "${stats}", "${abilities}", "${types}", "${weight}", "${height}", "${species.genus}", "${species.flavor}")`, (err, rows, fields)=>{
        //         if(err) {
        //             console.log(err);
        //             res.json({
        //                 result : false,
        //             })
        //         }else{
        //             res.json({
        //                 result : true,
        //             });
        //         }
        // });
});

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
