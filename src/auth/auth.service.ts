import db from "../drizzle/db";
import { AuthOneUserInsert ,AuthOneUserSelect,AuthOneUsersTable} from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { registerUserSchema, loginUserSchema } from "../drizzle/validators";
import { sendRegistrationEmailTemplate } from "../helpers/mailer";





export const createAuthUserService = async (user: AuthOneUserInsert) => {
    // Check if a user with the same email already exists
    const existingUser = await db.query.AuthOneUsersTable.findFirst({
        where: sql`${AuthOneUsersTable.email} = ${user.email}`,
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Insert the new user
    await db.insert(AuthOneUsersTable).values(user);

    // Send welcome email
    await sendRegistrationEmailTemplate(user.email, "Welcome to Our Service! Thank you for signing up!", "");

    return null; // Add a return statement
};


// log in user
export const loginUserService = async (user: AuthOneUserSelect) => {
   const{username, password} = user;

    return await db.query.AuthOneUsersTable.findFirst({
        columns:{
            username: true,
            role: true,
            password: true
        },where: sql`${AuthOneUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                  id: true,
                  name: true,
                   contact_phone:true,
                     email:true,
                }
            }
        }
    })
}


