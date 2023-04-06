const express = require('express')
const router = express.Router()
const { getGoals, setGoals, editGoals, deleteGoals 
} = require('../controllers/goalcontroller')
const {protect} =require('../middleware/authMiddleware')
router.route('/').get(protect,getGoals).post(protect,setGoals)
router.route('/:id').delete(protect,deleteGoals).put(protect,editGoals)



module.exports = router