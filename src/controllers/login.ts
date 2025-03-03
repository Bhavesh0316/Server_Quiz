import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JSONTOKEN || "defaultsecret";

const loginUser = async (email: string, password: string) => {
    try {
        const result = await sql`SELECT * FROM users WHERE email = ${email};`;
        if (result.length === 0) {
            return { error: "User doesn't exist" };
        }

        const user = result[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return { error: "Invalid credentials" };
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: "24h",
        });

        return { token, user: { username: user.username, email: user.email } };
    } catch (error) {
        console.error("Error in login:", error);
        return { error: "Database error" };
    }
};

export default loginUser;
