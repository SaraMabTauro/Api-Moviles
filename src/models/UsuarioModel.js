const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Usuario= sequelize.define('Usuario', {
  name: { 
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
},
 {
  timestamps: false
});

module.exports = Usuario;