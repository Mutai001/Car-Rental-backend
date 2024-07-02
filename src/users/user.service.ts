import { eq } from "drizzle-orm"
import db from "../db"
import { UserSelect, usersTable, UserInsert } from '../schema';
 interface   getAllUsers{
    limit?: number;
    details?: boolean;
 }

//Fetch all user
export const getAllUsers = async (limit?: number): Promise<UserSelect[] | null> => {
          return await db.query.usersTable.findMany({
            limit: limit,
            with:{
                orders:{
                    columns:{price: true}
                },
                addresses:{
                    columns:{street_address_1:true,street_address_2:true}
                },
                drivers:{
                    columns:{car_make:true,car_model:true,car_year:true,online:true}
                },                
            }
        });
    
    return await db.query.usersTable.findMany();
}

// fetch one user
export const fetchOneUsers = async (id: number): Promise<UserSelect | undefined> => {
return await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id)
})
}


// create user
export const CreateUser = async (user: UserInsert) => {
    await db.insert(usersTable).values(user)
    return "User created successfully"
}

// update user
export const UpdateUser = async (id: number, Address: UserInsert) => {
    await db.update(usersTable).set(Address).where(eq(usersTable.id, id))
    return "Address updated successfully";
}
// delete user
export const DeleteUser = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully"
}