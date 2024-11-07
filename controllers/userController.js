const { User} = require('./models/User');

const UserController = {
    // Get all users
    async getAllUsers(req, res) {
        // use try / catch block to handle errors
        try {
            // Use Sequelize's findAll method to get all users from the database
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
// Get user by ID
    async getUserById(req, res) {
        try {
            // Use Sequelize's findByPk method to get user by ID from the database
            const user = await User.findByPk(
                // Get user ID from the request parameters
                req.params.id);
                // If user not found, return 404
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async createUser(req, res) {
        // Use Sequelize's create method to create a new user in the database from the request body
        try {
            // new User object from the request body to create a new user with the provided data
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json({ error: error.errors.map(err => err.message) });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    },
// Update user by ID
    async updateUser(req, res) {
        try {
            // use findOneAndUpdate method to update user by ID in the database from the request body 
            const updatedUser = await User.findOneAndUpdate(req.body, {
                // Set where condition to update user by ID
                 where: { id: req.params.id } });
            if (!updatedUser[0]) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
// Delete user by ID
    async deleteUser(req, res) {
        try {
            // use destroy method to delete user by ID from the database from the request parameters
            const deletedUser = await User.destroy({ where: { id: req.params.id } });
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    //add friend 
    addFriend(req, res) {
        User.findOneAndUpdate(
            // Find the user by ID
            { _id: req.params.userId },
            // Add the friend's ID to the user's friends array using $addToSet operator
            { $addToSet: { 
                // Update the friend's ID to the user's friends array
                friends: req.body.friendId || req.params.friendId} },
                // Save the updated user data
            { new: true },
        )
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(userData);
    })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        });
    },
    //remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            // Find the user by ID  and remove the friend's ID from the user's friends array using $pull operator
            { _id: req.params.userId },
            { $pull: { friends: req.body.friendId || req.params.friendId} },
            { new: true },
        )
       .then(userData => {
            if (!userData) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(userData);
    })
       .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        });
    }
};

module.exports = UserController;

            