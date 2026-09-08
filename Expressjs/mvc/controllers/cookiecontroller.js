
export const cookieDelete = (res) => {

      res.clearCookie("token",{ httpOnly: true, secure: false }),
      res.clearCookie("userId"),
      res.clearCookie("username")

}

export const cookieadd = (res, id, username, token) => {

   res.cookie("token", token, { httpOnly: true, secure: false,sameSite:"lax" })  //  httpOnly:true directe acces not allow only frontend me backend me access kar sakte ho   //secures:true only alow https connection se aaya huva cookie   adn sameSite:"lax"  mobile me chalen ke liey
   res.cookie("userId", id)
   res.cookie("username", username)
}