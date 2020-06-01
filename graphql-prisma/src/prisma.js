import { Prisma } from 'prisma-binding'

import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
   typeDefs:'src/generated/prisma.graphql',
   endpoint:'http://192.168.99.100:4466',
   secret: 'supersecret',
   fragmentReplacements
})



// prisma delete -f
// npm run get-schema
// prisma:prisma.yml //alternative
// {
//    "Authorization":"Bearer "
// }

// cd prisma
// prisma token

export { prisma as default }

// prisma.query.users(null,'{name  } ')
// .then(data=>{
//     console.log(JSON.stringify(data,undefined,3))
//     })
// replacer fn => undefined

// prisma.mutation.createPost({
//     data:{
//        title:'new graphql post' ,
//        published:true,
//        body:'body',
//        author:{
//            connect:{
//                id:"ckas95gpu004y0746o2acqze5"
//            }
//        }
//     }
// },'{ id title body published  }')
// .then(data=>{
//     console.log(JSON.stringify(data,undefined,3))

// return prisma.query.users(null,'{ id name email posts{ id title }}')
// })
// .then(data=>{
//     console.log(JSON.stringify(data,undefined,3))
//     })


// prisma.mutation.updatePost({
//     where:{
//     id:"ckas7jml1003u07465122nu8r"
// },
// data:{
//     body:"any thing",
//     published:true
// }
// }," { id body }  ").then(data=>{
//     return prisma.query.posts(null,'{ id title body published }')
// })
// .then(data=>{
//         console.log(JSON.stringify(data,undefined,3))
// })


// const createPostForUser = async (authorId,data)=>{

// const userExists=await prisma.exists.User({
//    id:authorId
// })

// if(!userExists){
//    throw new Error('User does not exist')
// }

//    const post = await prisma.mutation.createPost({
//    data:{
//       ...data,
//       author:{
//          connect:{
//             id:authorId
//          }
//       }
//    }
// },' {id} ') 
// const user = await prisma.query.user({
// where:{
//    id:authorId
// }
// },' { id name email posts { id title published } } ')
// return user
// }

// createPostForUser('ckas95gpu004y0746o2acqze5',{
//    title:"Great",
//    body:"The War of Art",
//    published:true
// })
// .then((user)=>{
//    console.log(JSON.stringify(user,undefined,2));
// })
// .catch(e=>{
//    console.log(e)
// })

// prisma.exists.Comment({
//    id:'ckas9fxjy005t0746y445osu6',
//    author:{
//         id:'ckas95gpu004y0746o2acqze5'
//    }
// }).then(exists=>{
//    console.log(exists)
// })


// const updatePostForUser = async (postId,data)=>{


//    const postExists=await prisma.exists.Post({
//       id:postId
//    })

   // const post = await prisma.mutation.updatePost({
   //    where:{
   //        id:postId
   //    },
   //    data
   // },' { author { id } } ') 
   
   // const user = await prisma.query.user({
   
   // where:{
   //    id:post.author.id
   // }
   
   // },' { id name email posts { id title published } } ')
   
   // return user
   
   // }
   
   // updatePostForUser('ckas7jml1003u07465122nu8r',{
   //    published:false
   // })
   // .then((user)=>{
   //    console.log(JSON.stringify(user,undefined,2));
   // })
   // .catch(e=>{
   //    console.log(e.message);
   // })
