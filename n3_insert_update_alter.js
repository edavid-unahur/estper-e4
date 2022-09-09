const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


class User extends Sequelize.Model {}
User.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });

/* crea usuario y cambia un valor de los usuarios con la condicion*/
sequelize.sync()
  .then(() => User.create({
    firstName: 'Juan',
    lastName: 'Rodriguez'
  }))
  .then(() => User.update({ firstName: "Mariano" },
    {where : {lastName: 'Rodriguez'}
  }))