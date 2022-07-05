const axios = require('axios');
const { API_KEY } = process.env;

async function getById_api(id){
    const apiReqId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const data = apiReqId.data

    const detalle = {
        id: data.id,
        name: data.name,
        description: data.description_raw,
        releaseDate: data.released,
        image: data.background_image,
        rating: data.rating,
        platform: data.platforms.map(el => el.platform.name).join(' - '),
        genres: data.genres.map(el => el.name).join(' - ')
    }
    return detalle;
    
}

module.exports = {
    getById_api
}

