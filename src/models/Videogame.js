const { UUIDV4 } = require('sequelize');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false, 
    }, 
    releaseDate: {
      type: DataTypes.STRING
    }, 
    rating: {
      type: DataTypes.FLOAT
    }, 
    platform: {
      type: DataTypes.STRING, 
      allowNull: false,
    }, 
    // image: {
    //   type: DataTypes.STRING,
    // }
  }, {
    timestamps: false
  });
};
