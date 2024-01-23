import mongoose from 'mongoose'

import player from "../models/player.js";

export const homePage = (req, res) => {
    const errors = req.flash("error");
    const formData = req.flash("formData")[0];
    
    res.render('index', { errors, formData });
}

export const successPage = (req, res) => {
    const formData = req.flash("formData")[0];

    res.render('success', { formData });
}

export const errorPage = (req, res) => {
    res.render('error');
}

export const teamPage = async (req, res) => {
    try {
        const allPlayers = await player.find().lean();
        res.render('showMembers', { teamMembers: allPlayers });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.render('error');
    }
}


export const getPlayer = async (req, res) => {
    const playerId = req.params.id
    const singlePlayer = await player.findOne({_id: playerId});


    res.render('singlePlayer', {singlePlayer})
}

export const getTeamPlayer = async (req, res) => {
    const playerId = req.params.id

    console.log('Received playerId:', playerId);
    try {
        // Check if the provided id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(playerId)) {
            console.error('Invalid ObjectId:', playerId);
            return res.render('error', { errorMessage: 'Invalid player ID' });
        }

        const singlePlayer = await player.findOne({_id: playerId}).lean();

        if (!singlePlayer) {
            console.error('Player not found:', playerId);
            return res.render('error', { errorMessage: 'Player not found' });
        }
        console.log(singlePlayer);

        res.render('singlePlayer', { singlePlayer });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.render('error');
    }
};

export const deletedTeamPlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const singlePlayer = await player.findByIdAndDelete(id);
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        req.flash("success_msg", `Player ${singlePlayer.name} has been deleted successfully`);
        res.render("showMembers");
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.render('error');
    }
}