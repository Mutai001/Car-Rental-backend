import { Context } from "hono";
import { CreateUser, DeleteUser, fetchOneUsers, getAllUsers, UpdateUser } from "./user.service";
import * as bcrypt from 'bcrypt';


//fetch all users
export const getAllUsersData = async (c: Context) => {
     try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getAllUsers(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// fetch one user
export const getOneUsersData = async (c: Context) => {
    const id = c.req.param("id")
    const user = await fetchOneUsers(parseInt(id))
    if(user === undefined){
        return c.json({message: "No user found"},404)
    }
    return c.json(user,200)
}

//create user
export const createUsersData = async (c: Context) => {
    
    try{
       const user = await c.req.json()
       const pass = user.password
      const hashedPassword = await bcrypt.hash(pass, 10)
        user.password = hashedPassword 
    const response = await CreateUser(user);
    if(!response){
        return c.text("User not created",404)
    }
    return c.json({message: response},201)
    } catch(error: any){
        return c.json({message: error?.message},500)
    }
}


//update user
export const updateUsersData = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const city = await c.req.json();
        const City = await UpdateUser(id, city);
        if (!UpdateUser) return c.text('User not updated', 400);
        return c.json({ msg: UpdateUser }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

//delete user
export const deleteUsersData = async (c: Context) => {
    const id = c.req.param("id")   
    const response = await DeleteUser(parseInt(id))
    return c.json({message: response},200)

}