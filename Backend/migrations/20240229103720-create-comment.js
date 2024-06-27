'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      replied_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['content'],
      type: 'check',
      name: 'noEmptyOrWhitespace',
      where: Sequelize.literal(`TRIM(content) <> ''`)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Comments', 'noEmptyOrWhitespace');
    await queryInterface.dropTable('Comments');
  }
};