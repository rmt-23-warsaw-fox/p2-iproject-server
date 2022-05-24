'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Histories','TargetId' ,{
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Histories','UserId' ,{
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('histories', 'UserId');
    queryInterface.removeConstraint('histories', 'TargetId');
  }
};
