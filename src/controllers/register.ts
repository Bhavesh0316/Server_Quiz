import bcrypt from "bcryptjs";
import sql from "../config/db";

const registerUser = async (username: string, email: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await sql`SELECT * FROM users WHERE email = ${email};`;
        if (existingUser.length > 0) {
            return { error: "User already exists" };
        }

        const result = await sql`
            INSERT INTO users (username, email, password) 
            VALUES (${username}, ${email}, ${hashedPassword}) 
            RETURNING id, username, email;
        `;

        console.log("User Registered:", result[0]);
        return result[0];
    } catch (error) {
        console.error("Error registering user:", error);
        return { error: "Database error" };
    }
};

export default registerUser;
