import jwt from "jsonwebtoken"

export const genrateToken = async(userId,email)=>{

    const payload =({
        userId:userId,
        email:email
    })

    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"})

    return token;
}

// isme ak bar token 
