'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Post = require('./post');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    liked_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Like'
  });

  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'user_id'
    });

    Like.belongsTo(models.Post, {
      foreignKey: 'post_id'
    });
  }

  return Like;
};