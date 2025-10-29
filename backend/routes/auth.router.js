import express from 'express';
import { signup } from '../controllers/auth.controller.js'; // 💡 Import signup
import { signin } from '../controllers/auth.controller.js'; // 💡 Import signin

const router = express.Router();

// Route for signing up
router.post('/signup', signup);

// Route for signing in
router.post('/signin', signin);

export default router;