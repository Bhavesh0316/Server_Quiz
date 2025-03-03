import express from "express";
import registerUser from "../controllers/register";
import loginUser from "../controllers/login";

const router = express.Router();

// Register User Route
router.post("/register", async (req, res):Promise<any>=> {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const result = await registerUser(username, email, password);
    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(201).json({ message: "User registered successfully", user: result });
});

// Login User Route
router.post("/login", async (req, res):Promise<any>=> {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const result = await loginUser(email, password);
    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.status(200).json({ message: "Login successful", token: result.token, user: result.user });
});

export default router;
