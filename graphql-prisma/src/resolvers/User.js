import getUserId from '../utils/getUserId'

const User={
    // posts(parent,args,{db},info){
    //     return db.posts.filter((post)=>{
    //         return post.author === parent.id
    //     })
    // },
    // comments(parent,args,{db},info){
    //     return db.comments.filter((x)=>{
    //         return x.author === parent.id
    //     })
    // }

   post:{
   
    fragment:'fragment userId on User { id }',
    resolve(parent,args,{prisma},info){

      return prisma.query.posts({
          where:{
              published:true,
              author:{
                  id:parent.id
              }
          }
      })


   }

   },

    email:{
        fragment:'fragment userId on User { id }',
        resolve(parent,args,{request},info){

            const userId=getUserId(request,false)
        
            if(userId && userId === parent.id){
                return parent.email
            }else{
                return null
            }
            }
    }
}


// fragment userField on User {
//     id
//     name
//     posts{
//         id
//     }
// }

// query {
//     users {
//         ...userField
//         email
//     }
// }










export default User