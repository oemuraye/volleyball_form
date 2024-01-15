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