import bcrypt, { compare } from "bcrypt"

const SALT_ROUND = 10;

export const hassingPassword = async(password)=>{

   return await bcrypt.hash(password,SALT_ROUND)

}


export const ComparePassword = async(password,hassingPassword)=>{

    try{
         const compare = await bcrypt.compare(password,hassingPassword)

         return compare
    }catch(error){
        throw new Error("password compair failed")
    }

}