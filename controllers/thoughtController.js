const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');
// get all thoughts from the database
const ThoughtController = {
    // get all thoughts from the database
    async getAllThoughts(req, res) {
      try {
        //find all thoughts from the database and return them.
        const thoughts = await Thought.find({});
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },

// get a single thought by its id
async getThoughtsById(req, res) {
    try {
        //find the thought by id and return it.
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      //create and if statement to check if the thought was found.
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req , red) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a thought by its id
  async deleteThought(req, res) {
    try{
        //find the thought by id and delete it from the database.
        const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json(thought);
    } catch(err){
        res.status(500).json(err);
    }
    },
    // update a thought by its id
    async updateThoughtById(req, res) {
        try{
            //find the thought by id and update it with the new data from the request body.
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, 
                {new: true});
            if(!thought){
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch(err){
            res.status(500).json(err);
        }
    },
    //create a new reaction to a thought
    async createReaction(req, res) {
        try {
            //find the thought by id and add a new reaction to the reactions array.
          const thought = await Thought.findOneAndUpdate(
            // Update the thought document to add the reaction with the given ID
              {_id:req.params.thoughtId},
              // Add the reaction with the given ID to the reactions array in the thought document.
              {$addToSet: {reactions: req.body}},
              // Update the document to save the changes.
              {runValidators: true, new: true}
          );
          thought ? res.json(thought) : res.status(404).json({message: notFound});
      } catch (e) {
          res.status(500).json(e);
      }
    },
  //delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // Update the thought document to remove the reaction with the given ID
          {_id: req.params.thoughtId},
          // Pull the reaction with the given ID from the reactions array in the thought document.
          {$pull: {reactions: {_id: Types.ObjectId(req.params.reactionId)}}},
          {runValidators: true, new: true}
      );
      thought? res.json(thought) : res.status(404).json({message: notFound});
    } catch (e) {
      res.status(500).json(e);
    }
  }
};
// Export the ThoughtController for use in other files. 
module.exports = ThoughtController;
