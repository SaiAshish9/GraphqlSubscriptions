import getUserId from '../utils/getUserId'

const Query={

    users(parent,args,{db,prisma},info){
      const opArgs={}       
      if(args.query){
        opArgs.where={
            // name_contains:args.query
            OR:[
            {
                name_contains:args.query
            },
            // {
            //     email_contains:args.query
            // }
        ]
        } 
      }
      return prisma.query.users(opArgs,info)
    },   
    // AND   
// null - returns all scalar fields

        // if(args.query){
        //     return db.users.filter(x=>{
        //         return x.name.toLowerCase().includes(args.query.toLowerCase())
        //     })
        // }
        //      return db.users


    comments(root,{query},{db,prisma},info){

        const opArgs={}  

        // if(query){
        //     opArgs.where={
        //       text_contains:query
        //     }
        // }

          return prisma.query.comments(opArgs,info)
    },


    myPosts(parent,args,{db,prisma,request},info){

const userId=getUserId(request)
    
        const opArgs={
            where:{
author:{
    id:userId
}
            }
        }

        if(args.query){

           opArgs.where.OR=[
            {
                title_contains:args.query
            },
            {
                body_contains:args.query
            }
            ]
        }


return prisma.query.posts(opArgs,info)
    },

    posts(parent,args,{db,prisma},info){


        const opArgs={
            where:{
                 published:true
            }
        }

        if(args.query){

           opArgs.where.OR=[
            {
                title_contains:args.query
            },
            {
                body_contains:args.query
            }
            ]
        }


return prisma.query.posts(opArgs,info)

        // if(args.query){
        //     return db.posts.filter(x=>{
        //         return x.title.toLowerCase().includes(args.query.toLowerCase())||x.body.toLowerCase().includes(args.query.toLowerCase())
        //     })
        // }
        //      return db.posts

    },

      greeting(parent,args,{db},info){
          if(args.name)
        return 'hello ' + args.name
        return 'hello'
      },
      add(root,args,{db},info){
         return args.a + args.b
      },
      add1(root,args,{db},info){
          if (args.numbers.length==0)
        return 0
        else{
          return   args.numbers.reduce((a,b)=>{
               return a + b
             },0)
        }
     },
      grapes(root,args,{db},info){
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
      me(parent,args,{prisma,request},info){
      
      const userId=getUserId(request)

return prisma.query.user({
    id: userId
})
      },
    async post(parent,args,{prisma,request},info){
          const userId = getUserId(request,false)

          const posts=await prisma.query.posts({
              where:{
                  id:args.id,
                  OR:[
                  {
                      published:true
                  },{
                      author:{
                          id:userId
                      }
                  }
                ]
              }
          },info)

if(posts.length===0){
    throw new Error('Post not found')
}

return posts[0]

      }

}


export default Query