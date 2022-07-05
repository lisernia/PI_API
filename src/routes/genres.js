const { Router } = require('express');
const {Videogame, Genre} = require('../db')
const axios = require('axios');

const { API_KEY } = process.env;

const router = Router();

router.get('/genres', async (req, res) => {
    try {
        let request = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let resultado = request.data.results
        //console.log(resultado)
        for (let i = 0; i < resultado.length; i++) {
            await Genre.findOrCreate({where: {name : resultado[i].name, id : resultado[i].id}})
        }
        let find = await Genre.findAll()
        res.status(200).json(find)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;