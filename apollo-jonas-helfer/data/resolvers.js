import { Author, View, FortuneCookie } from './connectors'

const resolvers = {
  Query: {
    author(root, args) {
      return Author.find({ where: args })
    },
    getFortuneCookie(root, args) {
      return FortuneCookie.getOne()
    }
  },
  Author: {
    posts(author) {
      return author.getPosts()
    }
  },
  Post: {
    author(post) {
      return post.getAuthor()
    },
    views(post) {
      return View.findOne({ postId: post.id })
        .then(view => view.views)
    }
  },
}

export default resolvers
