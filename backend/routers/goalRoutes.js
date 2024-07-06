import express from 'express';  
const router = express.Router();
import { getGoals,updateGoal,deleteGoal,createGoal } from '../controllers/goalControllers.js';
import { protect } from '../middleware/auth.js';



router.get('/', protect,getGoals);

router.put('/:id', protect,updateGoal);

router.delete('/:id', protect,deleteGoal);

router.post('/', protect,createGoal);





export default router;