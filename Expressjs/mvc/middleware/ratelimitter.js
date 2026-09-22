import ratelimit from "express-rate-limit";


export const LoginRatLimiter = ratelimit({
    max:6
})


export const RegisterRatLimiter = ratelimit({
    max:10
})