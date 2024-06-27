'use strict';
const {
  Model
} = require('sequelize');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');
const Following = require('./following');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // const aliasedFollowers = models.User.belongsToMany(models.User, {
      //   as: 'followers',
      //   through: 'Following',
      //   foreignKey: 'follower_id',
      //   otherKey: 'user_id',
      // });
    
      // const aliasedFollowings = models.User.belongsToMany(models.User, {
      //   as: 'followings',
      //   through: 'Following',
      //   foreignKey: 'user_id',
      //   otherKey: 'follower_id',
      // });
    }
  }
  User.init({
    display_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 50],
          msg: 'Display_name must be between 1 and 50 characters long.'
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 15],
          msg: 'Username must be between 4 and 15 characters long.'
        },
        isValidFormat(value) {
          const regex = /^[a-zA-Z0-9_]+$/;
          if (!regex.test(value)) {
            throw new Error('Username can only contain alphabets, numbers, and underscores.');
          }
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[\.\w-]+@([\w-]+\.)+[\w-]{2,4}$/i,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    avatar: DataTypes.STRING,
    image: DataTypes.STRING,
    link: DataTypes.STRING,
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bio: DataTypes.STRING,
    location: DataTypes.STRING,
    follower_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    following_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id"
    });

    User.hasMany(models.Comment, {
      foreignKey: "user_id"
    });

    User.hasMany(models.Like, {
      foreignKey: "user_id"
    });

    User.belongsToMany(User, {
      as: 'source',
      through: models.Following,
      foreignKey: "follower_id",
      otherKey: 'user_id'
    });

    User.belongsToMany(User, {
      as: "target",
      through: models.Following,
      foreignKey: "user_id",
      otherKey: 'follower_id'
    });

    

    // User.belongsToMany(models.User, {
    //   as: 'followers',
    //   through: 'Following',
    //   foreignKey: 'follower_id',
    //   otherKey: 'user_id',
    //   // constraints: false,
    //   aliases: {
    //     followers: aliasedFollowers,
    //     followings: aliasedFollowings,
    //   },
    // });
  }

  return User;
};