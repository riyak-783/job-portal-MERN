import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        

        // Validation checks
        if (!fullname) {
            return res.status(404).json({
                message: " fullname is missing",
                success: false,
            });
        }
        if (!email) {
            return res.status(404).json({
                message: "Email is missing",
                success: false,
            });
        }
        if (!phoneNumber) {
            return res.status(404).json({
                message: "Phone Number is missing",
                success: false,
            });
        }
        if (!password) {
            return res.status(404).json({
                message: "Password is missing",
                success: false,
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validation checks
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send response with token
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file =req.file;


        // Split skills into an array
        let skillsArray;
        if(skills){
         skillsArray = skills.split(",");}

        // Get user ID from authenticated request
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        // Update user data

        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        

        // Save updated user
        await user.save();

        // Send updated user data as response
        user = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
      
    }
}