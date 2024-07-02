import { Hono } from 'hono';
import { register } from 'module';
import { zValidator } from '@hono/zod-validator'
import { loginUserData, registerUser } from './auth.controller';
import { registerUserSchema, loginUserSchema } from '../drizzle/validators'



export const authRouter = new Hono();


authRouter.post('/register', zValidator('json', registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),registerUser)


authRouter.post('/login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUserData)







