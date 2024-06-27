'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      content: {
        type: Sequelize.STRING(280),
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      posted_at: {
        type: Sequelize.DATE
      },
      comment_count: {
        type: Sequelize.INTEGER
      },
      repost_count: {
        type: Sequelize.INTEGER
      },
      likes_count: {
        type: Sequelize.INTEGER
      },
      views_count: {
        type: Sequelize.INTEGER
      },
      repost_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.addConstraint('Posts', {
      fields: ['comment_count', 'repost_count', 'likes_count', 'views_count'],
      type: 'check',
      name: 'greaterThanZero',
      where: Sequelize.literal(`comment_count >= 0 AND repost_count >= 0 AND likes_count >= 0 AND views_count >= 0`)
    });

    await queryInterface.addConstraint('Posts', {
      fields: ['content'],
      type: 'check',
      name: 'noEmptyOrWhitespace',
      where: Sequelize.literal(`TRIM(content) <> ''`)
    });

    await queryInterface.addConstraint('Posts', {
      fields: ['repost_id', 'user_id'],
      type: 'unique',
      name: '1User1Repost'
    });

    await queryInterface.addConstraint('Posts', {
      fields: ['content', 'user_id', 'comment_count', 'repost_count', 'likes_count', 'views_count'],
      type: 'check',
      name: 'contentNullIfReposted',
      where: Sequelize.literal(`
        (repost_id IS NOT NULL AND content IS NULL  AND comment_count IS NULL AND repost_count IS NULL AND likes_count IS NULL AND views_count IS NULL)
        OR
        (repost_id IS NULL AND content IS NOT NULL )
      `),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Posts', 'contentNullIfReposted');
    await queryInterface.removeConstraint('Posts', '1User1Repost');
    await queryInterface.removeConstraint('Posts', 'noEmptyOrWhitespace');
    await queryInterface.removeConstraint('Posts', 'greaterThanZero');
    await queryInterface.dropTable('Posts');
  }
};