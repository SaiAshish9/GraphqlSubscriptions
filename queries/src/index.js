// // console.log('hi')
// import c1,{a,b} from './module'
// // default export has no specific name
// // same applies to queries
// console.log(c1,a,b)


// package.json
// babel-node src/index.js
// --exec run using babel-node
import { GraphQLServer } from 'graphql-yoga'


const users=[
{
    id:'1',
    name:'Sai'
},
{
    id:'2',
    name:'Sai1'
}

]

const posts=[
    {
id:"1",
title:"avengers",
body:"fiction",
author:"1"
    },{
id:"2",
title:"end game",
body:"action",
author:"2"
    }
]

const comments=[
{
    id:"8",
    text:'sffghjkl',
    author:"1",
    post:"1"
},
{
    id:"8",
    text:'jkl',
    author:"1",
    post:"1"
},
{
    id:"9",
    text:'ibvkh',
    author:"2",
    post:"2"
}
]





// String,Boolean,Int,Float,ID
// scalar types -> stores single value

// operation arguments
// empty array valid ! ! cannot be null

const typeDefs=`

 type Query{
     greeting(name:String):String!
     add(a:Float!,b:Float!):Float!
     add1(numbers:[Float!]!):Float!
     me: User!
     comments:[Comment!]!
     grapes:[Int!]!
     id:ID!
     name:String!
     age:Int!
     height:Float
     employed:Boolean!
     users(query:String):[User!]!
     posts(query:String):[Post!]!
 }

  type User{
      id:ID!
      name:String!
      email:String
      age:Int
      posts:[Post!]!
      comments:[Comment!]!
  }

  type Post{
      id:ID
      title:String!
      body:String
      published:Boolean
      author:User!
      comments:[Comment!]!
  }

  type Comment{
      id:ID!
      text:String!
      author:User!
      post:Post!
  }


`

const resolvers={
    Query:{

        users(parent,args,ctx,info){
            if(args.query){
                return users.filter(x=>{
                    return x.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
                 return users

        },
        comments(root,args,ctx,info){
              return comments
        },
 
        posts(parent,args,ctx,info){
            if(args.query){
                return posts.filter(x=>{
                    return x.title.toLowerCase().includes(args.query.toLowerCase())||x.body.toLowerCase().includes(args.query.toLowerCase())
                })
            }
                 return posts

        },

          greeting(parent,args,ctx,info){
              if(args.name)
            return 'hello ' + args.name
            return 'hello'
          },
          add(root,args,ctx,info){
             return args.a + args.b
          },
          add1(root,args,ctx,info){
              if (args.numbers.length==0)
            return 0
            else{
              return   args.numbers.reduce((a,b)=>{
                   return a + b
                 },0)
            }
         },
          grapes(root,args,ctx,info){
             return [97,89,90]
          },
          id(){
               return 'sfdgfhjkj'
          },
          name(){
              return 'sai'
          },
          age(){
              return 18
          },
          employed(){
              return false
          },
          height(){
              return 6.2
          },
          me(){
              return {
                  id:'12345',
                  name:'Sai',
                  email:'sai@example.com',
              }
          }

    },
    Post:{
        author(parent,args,ctx,info){
             
return users.find((user)=>{
return user.id === parent.author
})

        },
        comments(parent,args,ctx,info){
            return comments.filter((x)=>{
                return x.post === parent.id
            })
        }
    },
    Comment:{
        author(parent,args,ctx,info){
            
            return users.find(user=>{
                return user.id === parent.author
            })

        },
        post(parent,args,ctx,info){
            return posts.find(x=>{
                return x.id === parent.post
            })
        }
    },
    User:{
        posts(parent,args,ctx,info){
            return posts.filter((post)=>{
                return post.author === parent.id
            })
        },
        comments(parent,args,ctx,info){
            return comments.filter((x)=>{
                return x.author === parent.id
            })
        }
    }
}

const server= new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('server started')
})





