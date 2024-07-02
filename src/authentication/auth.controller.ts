import dotenv from 'dotenv';
import { Context } from 'hono';
import * as bcrypt from 'bcrypt';
import {  loginUserService, createAuthUserService } from "./auth.service";
import exp from 'constants';
import { sign } from 'hono/jwt';




export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createUser = await createAuthUserService(user);
        if (!createUser) return c.text("User not created", 400);
        return c.json({ message: createUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

//log-in user
export const loginUserData = async (c: Context) => {

try{
           const details = await c.req.json()
    const user = await loginUserService(details)
    if(user === null){
                console.log(user)

        return c.json({message: "No user found"},404)
    }
    const userMatch = await bcrypt.compare(details.password, user?.password !)
    console.log(user?.password, details.password, userMatch)
    if(!userMatch){
        return c.json({user:"not found"},200)
    }else {
        const payload = {
            sub: user?.username,
            role: user?.role,
            exp: Math.floor(Date.now() / 1000) +(60 * 180)
        };
        const secret = process.env.JWT_SECRET!;
        const token = await sign(payload, secret);
        const UserDetails = user?.username;
        const userRole = user?.role;
        return c.json({token, user:{userRole, ...details} },200)
}
    }
    catch(error: any){
        return c.json({error: error?.message},400)
    }
}
































