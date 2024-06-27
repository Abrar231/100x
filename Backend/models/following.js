'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Following.init({
    follower_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    followed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Following',
  });

  Following.associate = (models) => {
    Following.belongsTo(models.User, {
      as: 'source',
      foreignKey: 'follower_id',
    });

    Following.belongsTo(models.User, {
      as: 'target',
      foreignKey: 'user_id',
    });
  }

  return Following;
};