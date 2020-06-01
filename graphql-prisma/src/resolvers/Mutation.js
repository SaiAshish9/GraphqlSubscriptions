import uuidv4 from 'uuid/v4'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import hashPassword from '../utils/hashPassword'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
// const token = jwt.sign({id:9},'mysecret')

// const decoded=jwt.decode(token)

// const verified=jwt.verify(token,'mysecret')

// console.log(token,decoded,verified)


const dummy= async ()=>{

  const email='andrew@example.com'
  const password='fgfhhjhk'
  const hashedPassword='fgh.xdfgnhjj.kjhgnxbfghmj,hgfgcgnhmj'
  const isMatch= await bcrypt.compare(password,hashedPassword)

  console.log(isMatch)
}

dummy()

const Mutation={
  async createUser(parent,{data},{db,prisma},info){


const password =await hashedPassword(data.password)

//       const emailTaken=db.users.some((user)=>{
//           return user.name===args.name
//       })
//       if(emailTaken){
//           throw new Error('Email taken')
//       }
// const user={
//   id:uuidv4(),
//   ...args
// }
// db.users.push(user)
// return user

const emailTaken=await prisma.exists.User({
  email:data.email
})
      if(emailTaken){
          throw new Error('Email taken')
      }

const user= await prisma.mutation.createUser({
  data:{
  ...data,
  password
}
})

return {
  user,
  token:generateToken(user.id)
}
  },

async updateUser(parent,{id,data},{db,prisma,request},info){

const userId=getUserId(request)

if(typeof data.password === 'string') {
  data.password= await hashedPassword(data.password)
}


  return prisma.mutation.updateUser({
    where: {
      id:userId
    },
    data
  },info)




    // const user= db.users.find(user=>user.id===id)    
    // if(!user)
    // throw new Error('Not Found')
    // if(typeof data.email === 'string'){
    //   const emailTaken=db.users.some(user=>user.email===data.email)
    //   if(emailTaken){
    //     throw new Error('Email already taken')
    //   }
    //   user.email=data.email
    // }
    // if(typeof data.name === 'string'){
    //   user.name=data.name
    // }
    //  if(typeof data.age !== 'undefined'){
    //    user.age=data.age
    //  }
    //  return user


},


async login(parent,args,{prisma},info){


const user=await prisma.query.user({
  where:{
    email:args.data.email
  }
})

if(!user){
  throw new Error('Unable to login')
}

const isMatch=await bcrypt.compare(args.data.password,user.password)


if(!isMatch){
  throw new Error('Unable to login')
}

return {
  user,
  token:generateToken(user.id)
}

},


async updatePost(parent,{id,data},{request,db,pubsub,prisma,request},info){
 
const userId=getUserId(request)  
 
const postExists=await prisma.exists.Post({
  id,
  author:userId
})

const isPublished=await prisma.exists.Post({id:args.id,published:true})


if(!postExists){
  throw new Error('Post cannot be updated')
}

if(isPublished && args.data.published===false ){

await prisma.mutation.deleteManyComments({
  where:{
    post:{
      id:args.id
    }
  }
})

}

return  prisma.mutation.updatePost({
    where:{
      id: userId
    },
    data
  },info)







//    const post =db.posts.find(post=>post.id===id)
//    const originalPost ={...post}
//    if(!post){
//      throw new Error('Post not found')
//    }
//    if(typeof data.title  === 'string'){
//      post.title = data.title
//    }
//    if(typeof data.body === 'string'){
//       post.body = data.body
//    } 
//    if(typeof data.published === 'boolean'){
//      post.published = data.published
//    if(originalPost.published&&!post.published){
// // deleted
// pubsub.publish('post',{
//   post:{
//     mutation:'DELETED',
//     data:originalPost
//   }
// })
//    }else if(!originalPost.published&&post.published){
// // created
// pubsub.publish('post',{
//   post:{
//     mutation:'CREATED',
//     data:post
//   }
// })
//    }else if(post.published){
//     pubsub.publish('post',{
//       post:{
//         mutation:'UPDATED',
//         data:originalPost
//       }
//     })
// // updated
//    }    
  //  } 
  //  return post

},

async deleteComment(parent,args,{request,db,pubsub,prisma},info){


const userId=await getUserId(request)

const commentExists=await prisma.exists.Comment({
  id:args.id,
  author:{
    id:userId
  }
})

if(!commentExists){
  throw new Error('Comment cannot be deleted')
}

  return prisma.mutation.deleteComment({
    where:{
      id: userId
    }
  },info)
  


// const commentIndex=db.comments.findIndex(comment=>comment.id===args.id)
//  if(commentIndex===-1){
//      throw new Error('Comment not found')
//  }
//  const [deletedComment]=db.comments.splice(commentIndex,1)
// pubsub.publish(`comment ${deletedComment.id}`,{
//   comment:{
//     mutation:'DELETED',
//     data:deletedComment
//   }
// })
//  return deletedComment




},



async deleteUser(parent,args,{db,prisma,request},info){

// const userIndex=db.users.findIndex((user)=>user.id===args.id)
// if(userIndex=== -1){
//   throw new Error('User not found')
// }
// const deletedUsers=db.users.splice(userIndex,1)
// posts=db.posts.filter((post)=>{
//   if(post.author===args.id){
//       db.comments=db.comments.filter((comment)=>{
//            return comment.post !== post.id
//       })
//   }
//   return post.author!==args.id
// })
// db.comments=db.comments.filter((comment)=>{
//   return comment.author !== args.id
// })
// return deletedUsers[0]

const userId =await getUserId(request)

// const userExists = await prisma.exists.User({
//   id: userId
// })
// if(!userExists){
//   throw new Error('User not found')
// }

return prisma.mutation.deleteUser({
where:{
  id: userId
}
},info)

},

async deletePost(parent,args,{db,pubsub,prisma,request},info){

  const userId = getUserId(request)
  
  const postExists=await prisma.exists.Post({
    id:args.id,
    author:{
      id:userId
    }
  })

if(!postExists){
  throw new Error('Post cannot be deleted')
}

return prisma.mutation.deletePost({
  where:{
    id: userId
  }
},info)

// const postIndex=db.posts.findIndex(post => post.id === args.id)
// if(postIndex===-1){
//   throw new Error('Post not found')
// }
// const [post]=db.posts.splice(postIndex,1)
// db.comments=db.comments.filter((comment)=>{
//   comment.post!==args.id
// })
// if(post.published){
//   pubsub.publish('post',{
//     post:{
//       mutation:'DELETED',
//       data:post
//     }
//   })
// }
// return post



},

createPost(parent,args,{db,pubsub,prisma,request},info){

const userId =  getUserId(request)


return prisma.mutation.createPost({
data:{
  title:args.data.title,
  body:args.data.body,
  published:args.data.published,
  author:{
    connect:{
      id:userId
    }
  }
}
},info)

// const userExists=db.users.some(user=>user.id===args.author)    
// if(!userExists){
//   throw new Error('User does not exist')
// }
// const post={
//   id:uuidv4(),
//   ...args
// }
// db.posts.push(post)
// if(args.published){
//   pubsub.publish('post',{
//     post:{
//       mutation:'CREATED',
//       data:post
//     }
//   })
// }
// return post

},

async createComment(parent,args,{request,db,pubsub,prisma},info){
  
const userId=getUserId(request)
const postExists=await prisma.exists.Post({
  id:args.data.post,
  published:true
})


if(!postExists){
  throw new Error('Post not found')
}

return prisma.mutation.createComment({
   data:{
     text:args.data.text,
     author:{
       connect:{
         id: userId
       }
     },
     post:{
       connect:{
         id: args.data.post
       }
     }
   }
},info)


//   const userExists=db.users.some((user)=>user.id===args.author)
//   const postsExits=db.posts.some(post=>post.id===args.post&&post.published)
//   if(!userExists || !postsExits ){
//       throw new Error('Unable to find author')
//   }
// const comment={
//   id:uuidv4(),
//   ...args
// }
// db.comments.push(comment)
// pubsub.publish(`comment ${args.post}`,{
//   comment:{
//     mutation:"CREATED",
//     data:comment
//   }
// })
// return comment

},
updateComment(parent,{id,data},{db,request,pubsub,prisma},info){


  const userId=await getUserId(request)

  const commentExists=await prisma.exists.Comment({
    id:args.id,
    author:{
      id:userId
    }
  })

if(!commentExists){
  throw new Error('Comment cannot be updated')
}

return prisma.mutation.updateComment({
  where:{
    id
  },
  data
},info)


// const comment=db.comments.find(comment=>comment.id===id)
// if(!comment){
//   throw new Error('Comment not found')
// }
// if(typeof data.text === 'string')
// comment.text=data.text
// if(typeof data.body === 'string')
// comment.body=data.body
// pubsub.publish(`comment ${comment.post}`,{
//   comment:{
//     mutation:"UPDATED",
//     data:comment
//   }
// })


// return comment



}


 }

 export default Mutation