module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'comments',
        'img',
         Sequelize.STRING
       ),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};