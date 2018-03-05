'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(20),
      is: /^[a-z0-9-]+$/i,
      len: [5, 15],
      unique: 'uniqueUsernameIndex'
    },
    nickname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: 'uniquePhoneIndex'
    }
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'user',
  });

  return User;
};
