'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Post = require('./post');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    replied_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id'
    });
  }

  return Comment;
};