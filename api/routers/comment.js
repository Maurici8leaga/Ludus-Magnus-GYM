const express = require('express');
const routerComment = express.Router();
const User = require('../models/user');
const Videos = require('../models/Videos');
const Comment = require('../models/Comment');

// Create a new comment 
routerComment.post('/comment', async (req, res) => {

    try {

        let comment = await Comment.create(req.body);

        comment = await comment.populate(['idVideo', 'student']).execPopulate();

        res.json({ msg: 'Comment created', comment });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: { msg: 'There was a problem posting the comment. Server Error' } });
    }
});

// Delete a comment
routerComment.delete('/deleteComment/:commentId', async (req, res) => {
    try {

        const commentToDelete = await Comment.findById({ _id: req.params.commentId });

        if (!commentToDelete) {
            return res.status(404).json({ msg: 'This comment does not exist' });
        }

        if (commentToDelete.student._id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario not authorized' });
        }

        await commentToDelete.delete();
        res.json({ msg: 'The comment was deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: { msg: 'An error has occurred. Server Error' } });
    }
});

// Like a video
routerComment.put('/like/:id', async (req, res) => {
    try {

        const video = await Videos.findById({ _id: req.params.id });

        // checking if the user has liked it before
        if (video.likes.filter(like => like.student.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'You have already liked it before' });
        }

        video.likes.unshift({ student: req.user.id });
        await video.save();
        res.json(video);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: { msg: 'Server Error' } });
    }
});

// Dislike a video
routerComment.put('/dislike/:id', async (req, res) => {
    try {

        const video = await Videos.findById({ _id: req.params.id });

        // checking if the user has disliked it before
        if (video.likes.filter(like => like.student.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'You have already disliked it before' });
        }

        const removeLike = video.likes.map(like => like.student.toString()).indexOf(req.user.id);
        video.likes.splice(removeLike, 1);
        await video.save();
        res.json(video);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: { msg: 'Server Error' } });
    }
});


module.exports = { routerComment };