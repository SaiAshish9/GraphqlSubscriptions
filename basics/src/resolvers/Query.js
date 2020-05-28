const Query={

    users(parent,args,{db},info){
        if(args.query){
            return db.users.filter(x=>{
                return x.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
             return db.users

    },
    comments(root,args,{db},info){
          return db.comments
    },

    posts(parent,args,{db},info){
        if(args.query){
            return db.posts.filter(x=>{
                return x.title.toLowerCase().includes(args.query.toLowerCase())||x.body.toLowerCase().includes(args.query.toLowerCase())
            })
        }
             return db.posts

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
      me(){
          return {
              id:'12345',
              name:'Sai',
              email:'sai@example.com',
          }
      }

}


export default Query