exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM bikes ORDER BY id ASC";

    db.query(query, (err, result) => {
        if (err) {
            return res.redirect('/');
        }
        res.render('index.ejs', {
            title: 'Supermarket Admin | Dashboard',
            bikes: result,
            success: req.query.success || null
        });
    });
};
