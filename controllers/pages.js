export const homePage = (req, res) => {
    const errors = req.flash("error");
    const formData = req.flash("formData")[0];

    res.render('index', { title: "Home", errors, formData });
}