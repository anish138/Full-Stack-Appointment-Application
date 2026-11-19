
export const cookieDelete = (res) => {

      res.clearCookie("token",{ httpOnly: true, secure: true,sameSite:"none" }),
      res.clearCookie("userId",{ httpOnly: true, secure: true,sameSite:"none" }),
      res.clearCookie("username",{ httpOnly: true, secure: true,sameSite:"none" })

}

export const cookieadd = (res, id, username, token) => {

   res.cookie("token", token, { httpOnly: true, secure: true,sameSite:"none" })  //  httpOnly:true directe acces not allow only frontend me backend me access kar sakte ho   //secures:true only alow https connection se aaya huva cookie   adn sameSite:"lax"  mobile me chalen ke liey
   res.cookie("userId", id, { httpOnly: true, secure: true,sameSite:"none" })
   res.cookie("username", username, { httpOnly: true, secure: true,sameSite:"none" })
}