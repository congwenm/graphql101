import Sequelize from 'sequelize'
import Mongoose from 'mongoose'
import casual from 'casual'
import _ from 'lodash'
import rp from 'request-promise'

// using promise based requests lets us get data from other services, author
// chose fortune cookie API to iilustrate
// fortune cookie
const FortuneCookie = {
  getOne() {
    return rp('http://www.yerkee.com/api/fortune')
      .then(JSON.parse)
      .then(res => res.fortune)
  }
}
// end of fortune cookie

// mongodb
const mongo = Mongoose.connect('mongodb://localhost/views')
const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number
})
const View = Mongoose.model('views', ViewSchema)
// end of mongodb definitions

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
})

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
})

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
})

AuthorModel.hasMany(PostModel)
PostModel.belongsTo(AuthorModel)

// create mock data with a seed, so we always get the same
casual.seed(123)
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    // all of the following returns promises
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    }).then(author => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3)
      }).then(post => {
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true }
        )
      })
    })
  })
})

const Author = db.models.author
const Post = db.models.post


export { Author, Post, View, FortuneCookie }
