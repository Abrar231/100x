'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const emailRegex = /^[\.\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      display_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      bio: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'check',
      name: 'usernameMinLength',
      where: {
        condition: Sequelize.literal(`LENGTH(TRIM(username)) >= 4`)
      }
    });

    await queryInterface.addConstraint('Users', {
      fields: ['display_name'],
      type: 'check',
      name: 'noEmptyOrWhitespace',
      where: Sequelize.literal(`TRIM(display_name) <> ''`)
    });

    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'check',
      name: 'noSpecialCharacters',
      where: Sequelize.literal(`username ~ '^[a-zA-Z0-9_]+$'`)
    });

    await queryInterface.addConstraint('Users', {
      fields: ['follower_count', 'following_count'],
      type: 'check',
      name: 'greaterThanZero',
      where: Sequelize.literal(`follower_count >= 0 AND following_count >= 0`)
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'check',
      name: 'email_constraint',
      where: Sequelize.literal(`email ~* '${emailRegex.source}'`)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'email_constraint');
    await queryInterface.removeConstraint('Users', 'greaterThanZero');
    await queryInterface.removeConstraint('Users', 'noSpecialCharacters');
    await queryInterface.removeConstraint('Users', 'noEmptyOrWhitespace');
    await queryInterface.removeConstraint('Users', 'usernameMinLength');
    await queryInterface.dropTable('Users');
  }
};