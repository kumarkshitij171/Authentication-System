import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import multer from 'multer';
import path from 'path';
import { LoginUser, RegisterUser, profile, uploadProfilePicture, verifyEmail } from './routes/user.route.js';
import { AuthMiddleware } from './middleware/auth.middleware.js';
const app = express();
const router = express.Router();

//Cors
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
connectDB();

//Multer Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // Define the destination folder
    },
    filename: function (req, file, cb) {
        // Generate a new filename using the original name, timestamp, and extension
        let fileNewName = path.parse(file.originalname.replace(/\s/g, '_')).name + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName) // Use the original file name with date
    }
});

const upload = multer({ storage });

//Routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/', router);

router.route('/login').post(LoginUser)
router.route('/register').post(RegisterUser)
router.route('/upload-profile-pic').put(
    upload.single('profilePicture'),
    AuthMiddleware,
    uploadProfilePicture)
router.route('/verify-email').put(AuthMiddleware, verifyEmail)
router.route('/profile').get(AuthMiddleware, profile)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})