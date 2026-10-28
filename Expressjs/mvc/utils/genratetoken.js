import jwt from "jsonwebtoken"

export const genrateToken = async (userId, email) => {

    try {
        const payload = ({
            userId: userId,
            email: email
        })

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })

        return token;

    } catch (error) {

        throw new Error(error.message)

    }

}

// isme ak bar token 
