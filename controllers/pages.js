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
export const getTeamPlayer = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const singlePlayer = await player.findById(id);

    res.json(singlePlayer)
    // try {
    //     const singlePlayer = await player.findOne({ id });
    //     res.render('success');
    // } catch (error) {
    //     console.error('Error fetching team members:', error);
    //     res.render('error');
    // }
}

export const deletedTeamPlayer = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const singlePlayer = await player.findByIdAndDelete(id);
    
        // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        req.flash("success_msg", `Player ${singlePlayer.name} has been deleted successfully`);
        res.render("showMembers");
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.render('error');
    }
}