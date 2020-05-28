// // console.log('hi')
// import c1,{a,b} from './module'
// // default export has no specific name
// // same applies to queries
// console.log(c1,a,b)
// package.json
// babel-node src/index.js
// --exec run using babel-node
// --ext watch extensions
// String,Boolean,Int,Float,ID
// scalar types -> stores single value
// operation arguments
// empty array valid ! ! cannot be null

import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'


const resolvers={
    Query,
    Mutation,
    Post,
    Comment,
    User
}

const server= new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context:{
        db
    }
})

server.start(()=>{
    console.log('server started')
})





