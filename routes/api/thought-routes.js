const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction,
}= require('../.../thoughtController');

// GET all thoughts and POST a new thought
router.get('/', getAllThoughts).post('/', createThought);

//GET a thought by ID and POST a new reaction
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThoughtById);

// POST a reaction to a thought by ID
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE a reaction from a thought by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;