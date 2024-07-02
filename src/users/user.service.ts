import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { UserSelect, usersTable, UserInsert } from '../drizzle/schema';
 interface   getAllUsers{
    limit?: number;
    details?: boolean;
 }

//Fetch all user
export const getAllUsers = async (limit?: number): Promise<UserSelect[] | null> => {
          return await db.query.usersTable.findMany({});
    
    return await db.query.usersTable.findMany();
}

// fetch one user
export const fetchOneUsers = async (id: number): Promise<UserSelect | undefined> => {
return await db.query.usersTable.findFirst({
    where: eq(usersTable.userId, id)
})
}


// create user
export const CreateUser = async (user: UserInsert) => {
    await db.insert(usersTable).values(user)
    return "User created successfully"
}

// update user
export const UpdateUser = async (id: number, Address: UserInsert) => {
    await db.update(usersTable).set(Address).where(eq(usersTable.userId, id))
    return "Address updated successfully";
}
// delete user
export const DeleteUser = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.userId, id))
    return "User deleted successfully"
}