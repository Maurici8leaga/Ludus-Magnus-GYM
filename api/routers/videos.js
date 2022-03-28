const express = require('express');
const routerVideo = express.Router();
const Videos = require('../models/Videos');
const Comment = require('../models/Comment');

// Get video by category
routerVideo.get('/', async function (req, res) {
    try {

        const videoList = await Videos.find({ category: req.query.category });

        res.json(videoList);
    } catch (error) {
        console.error(error.msg);
        res.status(500).send({ error: { msg: 'Server Error ' } });
    }
});

// Get video by Id
routerVideo.get('/:id', async function (req, res) {
    try {

        const video = await Videos.findById({ _id: req.params.id }).lean();

        if (!video) {
            return res.status(400).json({ error: { msg: 'The video does not exist' } });
        }

        // finding comments on the video
        const comments = await Comment.find({ idVideo: req.params.id }).populate([{ path: 'student', populate: { path: 'avatar' } }]).lean();
        video.comments = comments;
        res.json(video);
        
    } catch (error) {
        console.error(error.msg);
        res.status(500).send({ error: { msg: 'Video not found, the video was deleted or does not exist' } });
    }
});



module.exports = { routerVideo }
