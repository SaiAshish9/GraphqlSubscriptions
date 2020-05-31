import uuidv4 from 'uuid/v4'

const Mutation={
  async createUser(parent,{data},{db,prisma},info){
      
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

return await prisma.mutation.createUser({data},info)

  },

async updateUser(parent,{id,data},{db,prisma},info){

  return prisma.mutation.updateUser({
    where: {
      id:args.id
    },
    data:args.data
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


updatePost(parent,{id,data},{db,pubsub,prisma},info){
 
 
return  prisma.mutation.updatePost({
    where:{
      id: args.id
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

deleteComment(parent,args,{db,pubsub,prisma},info){

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

return prisma.mutation.deleteComment({
  where:{
    id: args.id
  }
},info)




},



async deleteUser(parent,args,{db,prisma},info){

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


const userExists = await prisma.exists.User({
  id: args.id
})
if(!userExists){
  throw new Error('User not found')
}

return prisma.mutation.deleteUser({
where:{
  id: args.id
}
},info)

},

deletePost(parent,args,{db,pubsub,prisma},info){


return prisma.mutation.deletePost({
  where:{
    id: args.id
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

createPost(parent,args,{db,pubsub,prisma},info){


return prisma.mutation.createPost({
data:{
  title:args.data.title,
  body:args.data.body,
  published:args.data.published,
  author:{
    connect:{
      id:args.data.author
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

createComment(parent,args,{db,pubsub,prisma},info){
  
return prisma.mutation.createComment({
   data:{
     text:args.data.text,
     author:{
       connect:{
         id: args.data.author
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
updateComment(parent,{id,data},{db,pubsub,prisma},info){

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