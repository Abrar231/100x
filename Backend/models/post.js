'use strict';

const { Model } = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Like = require('./like');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    content: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [0,280],
          msg: "Must not be more than 280 characters"
        }
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    posted_at: DataTypes.DATE,
    comment_count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      }
    },
    repost_count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      }
    },
    likes_count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      }
    },
    views_count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      }
    },
    repost_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Post,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id'
    });

    Post.hasMany(models.Comment, {
      foreignKey: "post_id"
    });

    Post.hasMany(models.Like, {
      foreignKey: "post_id"
    });

    Post.belongsTo(models.Post, {
      foreignKey: 'repost_id',
      as: 'originalPost',
    });

    Post.hasMany(models.Post, {
      foreignKey: 'repost_id',
      as: 'reposts',
    });
  }

  return Post;
};