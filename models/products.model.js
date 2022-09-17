module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      name: {
        type: Sequelize.STRING
      },
      cin: {
        type: Sequelize.STRING
      }
    });
    return Product;
  };