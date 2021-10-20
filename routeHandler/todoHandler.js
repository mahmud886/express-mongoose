const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

// Get all the todos
router.get('/', async (req, res) => {
    await Todo.find({ status: 'active' }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                result: data,
                message: 'Todo were inserted successfully',
            });
        }
    });
});

// Get a todo by id
router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                result: data,
                message: 'Todo were inserted successfully',
            });
        }
    });
});

// Post a todo done
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                message: 'Todo was inserted successfully',
            });
        }
    });
});

// Post multiple todos done
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                message: 'Todo were inserted successfully',
            });
        }
    });
});

// Put todo update
router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: 'active',
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            } else {
                res.status(200).json({
                    message: 'Todo was updated successfully',
                });
            }
        }
    );
});

// delete todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error',
            });
        } else {
            res.status(200).json({
                message: 'Todo was deleted successfully',
            });
        }
    });
});

module.exports = router;
