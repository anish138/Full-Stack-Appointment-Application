import jwt from "jsonwebtoken";

export const verifytoken = async (req, res, next) => {

    try {
        const cookietoken = req.cookies.token

        if (!cookietoken) {
            return res.status(409).json({ message: "unothrized toke" })
        }

        jwt.verify(cookietoken, process.env.SECRET_KEY, (error, decoded) => {

            if (error) {
                return res.status(401).json({message:"invalid expire token"})
            }

            req.user  = decoded

           next()
        })

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}