import express from 'express';
import {registerUser,loginUser,getuserData,logoutUser} from '../controllers/userController.js';
import {protect} from '../middleware/auth.js';


const router = express.Router();

router.post('/',registerUser);



router.post('/login',loginUser);


router.get('/me',protect,getuserData);

router.post('/logout',protect,logoutUser);







export default router;