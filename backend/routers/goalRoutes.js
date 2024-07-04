import express from 'express';  
const router = express.Router();
import { getGoals,updateGoal,deleteGoal,createGoal } from '../controllers/goalControllers.js';



router.get('/', getGoals);

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

router.post('/', createGoal);





export default router;