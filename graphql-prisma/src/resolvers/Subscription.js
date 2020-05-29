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
        subscribe(parent,{postId},{db,pubsub},info){
            const post=db.posts.find(post=>post.id===postId && post.published )

            if(!post){
                throw new Error('Post not found')
            }

            console.log(`comment ${postId}`)

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },
    post:{
        subscribe(parent,args,{db,pubsub},info){
            return pubsub.asyncIterator('post')
        }
    }
}

export { Subscription as default } 