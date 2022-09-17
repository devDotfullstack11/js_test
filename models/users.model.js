module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {    
      name           : { type: Sequelize.STRING,allowNull: false},
      email            : { type: Sequelize.STRING,allowNull: true},
      password            : { type: Sequelize.STRING,allowNull: true},
    });
    return User;
  };