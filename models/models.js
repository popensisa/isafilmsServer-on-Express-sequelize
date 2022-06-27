const sequelize = require('../db')
const {DataTypes} = require('sequelize')



const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
})
module.exports = {
    up: function(queryInterface, Sequelize) {
      // logic for transforming into the new state
      return queryInterface.addColumn(
        'comment',
        'img',
       Sequelize.BOOLEAN
      );
  
    }
}

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    raiting: {type: DataTypes.INTEGER, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    actor: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    video: {type: DataTypes.STRING, allowNull: false},
})

const TypeGenre = sequelize.define("type_genre", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Type.hasMany(Film)
Film.belongsTo(Type) 

Genre.hasMany(Film)
Film.belongsTo(Genre)

Film.hasMany(Comment)
Comment.belongsTo(Film)

User.hasMany(Comment)
Comment.belongsTo(User)

Type.belongsToMany(Genre, {through: TypeGenre})
Genre.belongsToMany(Type, {through: TypeGenre})

module.exports = {
    User, 
    Film, 
    Type, 
    Genre, 
    Comment, 
    TypeGenre
}