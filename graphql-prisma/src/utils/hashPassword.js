import bcrypt from 'bcryptjs'

const hashPassword=(password)=>{

    if(password.length < 8 ){
        throw new Error('Password must be 8 characters long')
      }
      
      
      return  bcrypt.hash(data.password,10)


}

export {hashPassword as default}