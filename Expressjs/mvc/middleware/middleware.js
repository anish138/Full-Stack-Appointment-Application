import jwt from "jsonwebtoken"

export const verifytoken = async(req,res,nex)=>{

    const authHeader = req.headers.authrization

    if(!authHeader){
        return res.status(409).json({message:"unothrized toke"})
    }

    const token = authHeader.split(' ')[1]

     jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{
         
        if(error){
            console.log(error)
        }

        return decoded
     })
}