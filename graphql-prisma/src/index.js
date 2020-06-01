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

import { GraphQLServer,PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers,fragmentReplacements } from './resolvers/index'
import prisma from './prisma'



const pubsub=new PubSub()

const server= new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context(request){

    // console.log(request.request.headers)
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

// context can be used as a object or a function

server.start(()=>{
    console.log('server started')
})





