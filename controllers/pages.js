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

export const teamPage = (req, res) => {


    // res.render('showMembers', { teamMembers });
    res.render('showMembers');
}