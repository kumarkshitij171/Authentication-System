import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const salt = bcrypt.genSaltSync(10);
const emailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
const RegisterUser = async (req, res) => {
    const { name, userName, email, password } = req.body;

    try {
        if (!name || !userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields',
            });
        }

        if (!email.match(emailRegex)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters',
            });
        }

        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this Email',
            });
        }
        if (userFound?.userName === userName) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this Username',
            });
        }

        // bcrypt password
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            email,
            userName,
            password: hashPassword,
        });

        let savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(400).json({
                success: false,
                message: 'User not saved',
            });
        }
        savedUser = savedUser.toObject();
        savedUser.password = undefined;
        // After saving the user, we will send the user data to the client and sign a token
        let token = jwt.sign({ token: savedUser._id },
            process.env.JWT_SECRET, {
            expiresIn: 3600
        });

        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            data: savedUser,
            token
        });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields',
            });
        }
        if (!email.match(emailRegex)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials',
            });
        }

        user.password = undefined;

        const token = jwt.sign({ token: user._id },
            process.env.JWT_SECRET, {
            expiresIn: 3600
        });

        return res.status(200).json({
            sucess: true,
            message: 'User Logged In',
            data: user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const uploadProfilePicture = async (req, res) => {
    try {
        let profilePicture = req.file;
        const user = req.user;
        // console.log(profilePicture)

        const profileImg = await uploadOnCloudinary(profilePicture.path)
        if (!profileImg) {
            return res.status(400).json({
                success: false,
                message: 'Profile Picture not uploaded',
            });
        }

        profilePicture = profileImg.url;

        const UpdatedUser = await User.findByIdAndUpdate(user._id, {
            profilePicture
        }, {
            new: true
        })

        if (!UpdatedUser) {
            return res.status(400).json({
                success: false,
                message: 'Profile Picture not uploaded',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile Picture uploaded successfully',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const user = req.user;

        const { data, error } = await resend.emails.send({
            from: `Kshitij <onboarding@resend.dev>`,
            to: ['contact@kumarkshitij.me'],
            subject: "Verification Email",
            html: "<div><h2>Thank you for registering with us.</h2><p>To verify your email click on this button</p><button style='background: green;padding: 8px;border: 2px solid gainsboro;text-align: center;border-radius: 5px;color: white;font-size: large;cursor:pointer;'>Click Here</button></div>",
        });

        if (error) {
            return res.status(400).json({ error });
        }

        const UpdatedUser = await User.findByIdAndUpdate(user._id, {
            isVerified: true
        }, {
            new: true
        });

        if (!UpdatedUser) {
            return res.status(400).json({
                success: false,
                message: 'Email not sent',
            });
        }

        return res.status(200).json({
            success: true,
            data,
            message: 'Email sent successfully',
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const profile = async (req, res) => {
    const user = req.user;

    return res.status(200).json({
        success: true,
        data: user,
    });

}

export {
    RegisterUser,
    LoginUser,
    uploadProfilePicture,
    verifyEmail,
    profile
}