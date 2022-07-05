const axios = require('axios');
const { Op } = require('sequelize');
const {Videogame, Genre} = require('../db.js');

const { API_KEY } = process.env;

async function getAPIGames(){
   let resultados = []
   try {
let page1 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
let page2 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
let page3 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
let page4 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
let page5 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
// console.log(page2.data)
//Espera a q esten todas las promesas listas y las devuelve todas juntas en un mismo array
await Promise.all([page1, page2, page3, page4, page5])
//{page1} => .data.results,
.then(response => {response.forEach(element => {
   element.data.results.forEach(e => {
      resultados.push({
      //return {
         id: e.id,
         name: e.name,
         rating: e.rating,
         platform: e.platforms.map(p => p.platform.name),
         image: e.background_image,
         genre: e.genres.map(gen => gen.name)
      })
   })
})})
.catch(err => console.log(err));
//let Allgames = [page1.data.results, page2.data.results, page3.data.results, page4.data.results, page5.data.results]

// let devuelveGames = Allgames.map(e => {return {
//    id: e.id,
//    name: e.name,
//    rating: e.ratings,
//    platform: e.platforms.map(p => p.platform.name),
//    image: e.background_image,
//    genre: e.genres.map(e => e.name)
// }})
//return AllGames
return resultados
   } catch (error) {
      console.log('Error en f(x) getAPIGames ->> ', error)
   }
}

async function getDBGames( ){
   try {
      let dbGames = await Videogame.findAll({
      // where:{name: {[Op.iLike]: `%${name}%`} },
      include: [Genre]
      })
     console.log(dbGames)
      return dbGames
      //falta mas datos?? 

   } catch (error) {
      console.log('Error en f(x) getDBGames ->> ', error)
   }
}

async function getAllGames() {
   try {
      const API_GAMES = await getAPIGames();
      const DB_GAMES = await getDBGames();
      //const all = [...API_GAMES, ...DB_GAMES];
      const all = API_GAMES.concat(DB_GAMES)
      console.log(all)

      return all;
   } catch (error) {
      console.log('Error en f getAllGames ->> ', error)
   }
}

module.exports = {
   getAPIGames,
   getDBGames, 
   getAllGames
};