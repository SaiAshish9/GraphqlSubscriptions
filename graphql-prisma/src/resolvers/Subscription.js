const Subscription={
    count:{
        subscribe(parent,args,{pubsub},info){
            let count=0
            
            setInterval(()=>{
               count++
               pubsub.publish('count',{
                   count:count
               })
            },1000)

            return pubsub.asyncIterator('count')

        }
    },
    comment:{
        subscribe(parent,{postId},{db,pubsub,prisma},info){
            
            return prisma.subscription.comment({where:{
               node:{
                   post:{
                       id: postId
                   }
               }
            }},
            info)
    
            // whenever a comment is added to particular post

            // const post=db.posts.find(post=>post.id===postId && post.published )
            // if(!post){
            //     throw new Error('Post not found')
            // }
            // console.log(`comment ${postId}`)
            // return pubsub.asyncIterator(`comment ${postId}`)
       
        }
    },
    post:{
        subscribe(parent,args,{db,pubsub,prisma},info){
            // return pubsub.asyncIterator('post')

            return prisma.subscription.post({
                where:{
                    published:true
                }
            },info)

        }
    }
}

export { Subscription as default } 