'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
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
      liked_at: {
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

    await queryInterface.addConstraint('Likes', {
      fields: ['post_id', 'user_id'],
      type: 'unique',
      name: '1User1Like'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Likes', '1User1Like');
    await queryInterface.dropTable('Likes');
  }
};