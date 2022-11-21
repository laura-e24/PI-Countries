const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const Activity = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type:  DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera")
    }
  }, {
    timestamps: false
  });
}

module.exports = Activity;