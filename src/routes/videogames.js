const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { getAllGames } = require("../controllers/cVideogames");

const router = Router();

router.get("/", async (req, res) => {
  let allGames = await getAllGames();

  const { name } = req.query;
  if (name) {
    filterGames = allGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filterGames.length > 0) {
      return res.status(200).send(filterGames);
    } else {
      return res.status(404).send("No games found");
    }
  } else {
    return res.status(200).send(allGames);
  }
});

router.post("/videogames", async function (req, res) {
  try {
    const { name, description, releaseDate, rating, platform, genre, /*image*/ } = req.body;

    let newGame = await Videogame.create({
      name,
      description,
      releaseDate,
      rating,
      platform,
     // image, 
    });

    let genreDB = await Genre.findAll({
      where: { name: genre },
    });

    newGame.addGenre(genreDB);
    res.status(200).json(newGame);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
