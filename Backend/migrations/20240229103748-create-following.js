'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Followings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      follower_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      followed_at: {
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

    await queryInterface.addConstraint('Followings', {
      fields: ['follower_id', 'user_id'],
      type: 'unique',
      name: 'noDuplicates'
    });

    await queryInterface.addConstraint('Followings', {
      fields: ['follower_id', 'user_id'],
      type: 'check',
      name: 'noSelfFollowing',
      where: Sequelize.literal(`follower_id <> user_id`)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Followings', 'noSelfFollowing');
    await queryInterface.removeConstraint('Followings', 'noDuplicates');
    await queryInterface.dropTable('Followings');
  }
};