const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.put('/:id/status', auth, taskController.updateTaskStatus);
router.get('/users', auth, adminAuth, taskController.getUsers);

module.exports = router;
