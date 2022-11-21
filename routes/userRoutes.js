import express from 'express';
import {
  register,
  authentication,
  confirm,
  forgotPassword,
  proveToken,
  newPassword,
  perfil
} from '../controller/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', register);
router.post('/login', authentication);
router.get('/confirm/:token', confirm);
router.post('/forgot-the-password', forgotPassword);
router.route('/forgot-the-password/:token').get(proveToken).post(newPassword);

router.get('/perfil', checkAuth, perfil)

export default router;
