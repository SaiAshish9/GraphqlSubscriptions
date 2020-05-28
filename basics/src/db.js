let users=[
    {
        id:'1',
        name:'Sai'
    },
    {
        id:'2',
        name:'Sai1'
    }
    
    ]
    
    let posts=[
        {
    id:"1",
    title:"avengers",
    body:"fiction",
    author:"1",
    published:true
        },{
    id:"2",
    title:"end game",
    body:"action",
    author:"2"
        }
    ]
    
    let comments=[
    {
        id:"8",
        text:'sffghjkl',
        author:"1",
        post:"1"
    },
    {
        id:"9",
        text:'jkl',
        author:"1",
        post:"1"
    },
    {
        id:"10",
        text:'ibvkh',
        author:"2",
        post:"2"
    }
    ]

const db= {users,posts,comments}

export {db as default}