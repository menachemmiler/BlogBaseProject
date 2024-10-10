import { Router } from 'express';
import { login, logout } from '../controllers/authController';

const router = Router();


router.post('/login', login); // התחברות של משתמש למערכת (יוצר לו טוקן עם הפרטים שלו)


router.delete('/logout', logout); // התחברות של משתמש למערכת (יוצר לו טוקן עם הפרטים שלו)

export default router;
