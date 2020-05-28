import uuidv4 from 'uuid/v4'

const Mutation={
    createUser(parent,args,{db},info){
      
      const emailTaken=db.users.some((user)=>{
          return user.name===args.name
      })

      if(emailTaken){
          throw new Error('Email taken')
      }

const user={
  id:uuidv4(),
  ...args
}

db.users.push(user)

return user

  },

updateUser(parent,{id,data},{db},info){

    const user= db.users.find(user=>user.id===id)
    
    if(!user)
    throw new Error('Not Found')

    
    if(typeof data.email === 'string'){
      const emailTaken=db.users.some(user=>user.email===data.email)

      if(emailTaken){
        throw new Error('Email already taken')
      }
      
      user.email=data.email
    }

    if(typeof data.name === 'string'){
      user.name=data.name
    }

     if(typeof data.age !== 'undefined'){
       user.age=data.age
     }
     
     return user


},


updatePost(parent,{id,data},{db},info){

   const post =db.posts.find(post=>post.id===id)


   if(!post){
     throw new Error('Post not found')
   }

   if(typeof data.title  === 'string'){
     post.title = data.title
   }

   if(typeof data.body === 'string'){
      post.body = data.body
   } 

   if(typeof data.published === 'boolean'){
     post.published = data.published
   } 


   return post

},


deleteComment(parent,args,{db},info){

  const commentIndex=db.comments.findIndex(comment=>comment.id===args.id)


 if(commentIndex===-1){
     throw new Error('Comment not found')
 }

 const deleteComments=db.comments.splice(commentIndex,1)

 return deleteComments[0]



},



deleteUser(parent,args,{db},info){

const userIndex=db.users.findIndex((user)=>user.id===args.id)

if(userIndex=== -1){
  throw new Error('User not found')
}

const deletedUsers=db.users.splice(userIndex,1)

posts=db.posts.filter((post)=>{

  if(post.author===args.id){
      db.comments=db.comments.filter((comment)=>{
           return comment.post !== post.id
      })
  }

  return post.author!==args.id


})

db.comments=db.comments.filter((comment)=>{
  return comment.author !== args.id
})

return deletedUsers[0]


},

deletePost(parent,args,{db},info){

const postIndex=db.posts.findIndex(post => post.id === args.id)

if(postIndex===-1){
  throw new Error('Post not found')
}

const deletedPost=db.posts.splice(postIndex,1)


db.comments=db.comments.filter((comment)=>{
  comment.post!==args.id
})


return deletedPost[0]



},

createPost(parent,args,{db},info){

const userExists=db.users.some(user=>user.id===args.author)    


if(!userExists){
  throw new Error('User does not exist')
}

const post={
  id:uuidv4(),
  ...args
}
db.posts.push(post)

return post

},

createComment(parent,args,{db},info){
  
  const userExists=db.users.some((user)=>user.id===args.author)
  const postsExits=db.posts.some(post=>post.id===args.post&&post.published)
  
  if(!userExists || !postsExits ){
      throw new Error('Unable to find author')
  }


const comment={
  id:uuidv4(),
  ...args
}

db.comments.push(comment)

return comment

},
updateComment(parent,{id,data},{db},info){

const comment=db.comments.find(comment=>comment.id===id)

if(!comment){
  throw new Error('Comment not found')
}

if(typeof data.text === 'string')
comment.text=data.text

if(typeof data.body === 'string')
comment.body=data.body


return comment



}


 }

 export default Mutation