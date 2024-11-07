const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
}
    = require('../controllers/userController');

    // GET all users and POST a new user
    get.router('/', getAllUsers).post('/', createUser);

    //GET a user by ID, use PUT to update a user, and DELETE to remove a user by id 
    router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

    // POST a friend to a user by ID
    router.route('/:userId/friends').post(addFriend);

    // DELETE a friend from a user by ID
    router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;