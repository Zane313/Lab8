const fs = require('fs');

// Show Add Form
exports.addBikePage = (req, res) => {
    res.render('add-bike.ejs', {
        title: 'Supermarket Admin | Add New Product',
        message: ''
    });
};

// Add Bike
exports.addBike = (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let brand    = req.body.brand;
    let model    = req.body.model;
    let cc       = req.body.cc;
    let price    = req.body.price;
    let stock    = req.body.stock;
    let slug     = req.body.slug;
    let uploadedFile  = req.files.image;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    let imageName     = slug + '.' + fileExtension;

    // Check slug unique
    let slugQuery = "SELECT * FROM bikes WHERE slug = ?";
    db.execute(slugQuery, [slug], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length > 0) {
            return res.render('add-bike.ejs', {
                title: 'BigBike Admin | Add New Bike',
                message: 'Slug already exists! Please use a different slug.'
            });
        }

        const allowed = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
        if (!allowed.includes(uploadedFile.mimetype)) {
            return res.render('add-bike.ejs', {
                title: 'BigBike Admin | Add New Bike',
                message: "Invalid file format. Only PNG, JPEG, GIF, WEBP allowed."
            });
        }

        uploadedFile.mv(`public/assets/img/${imageName}`, (err) => {
            if (err) return res.status(500).send(err);

            let query = 'INSERT INTO bikes (brand, model, cc, price, stock, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.execute(query, [brand, model, cc, price, stock, imageName, slug], (err) => {
                if (err) return res.status(500).send(err);
                res.redirect('/?success=Bike+added+successfully!');
            });
        });
    });
};

// Show Edit Form
exports.editBikePage = (req, res) => {
    let bikeId = req.params.id;
    db.execute("SELECT * FROM bikes WHERE id = ?", [bikeId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.render('edit-bike.ejs', {
            title: 'BigBike Admin | Edit Bike',
            bike: result[0],
            message: ''
        });
    });
};

// Update Bike
exports.editBike = (req, res) => {
    let bikeId   = req.params.id;
    let brand    = req.body.brand;
    let model    = req.body.model;
    let cc       = req.body.cc;
    let price    = req.body.price;
    let stock    = req.body.stock;
    let slug     = req.body.slug;
    let oldImage = req.body.old_image;
    let uploadedFile = req.files ? req.files.image : null;

    let imageName = oldImage;

    if (uploadedFile) {
        const allowed = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
        if (!allowed.includes(uploadedFile.mimetype)) {
            return res.render('edit-bike.ejs', {
                title: 'BigBike Admin | Edit Bike',
                bike: { id: bikeId, brand, model, cc, price, stock, slug, image: oldImage },
                message: "Invalid file format. Only PNG, JPEG, GIF, WEBP allowed."
            });
        }
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        imageName = slug + '.' + fileExtension;

        // Delete old image
        let oldPath = `public/assets/img/${oldImage}`;
        if (fs.existsSync(oldPath) && oldImage !== 'default.jpg') {
            fs.unlinkSync(oldPath);
        }

        uploadedFile.mv(`public/assets/img/${imageName}`, (err) => {
            if (err) return res.status(500).send(err);
        });
    }

    let query = 'UPDATE bikes SET brand=?, model=?, cc=?, price=?, stock=?, image=?, slug=? WHERE id=?';
    db.execute(query, [brand, model, cc, price, stock, imageName, slug, bikeId], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?success=Bike+updated+successfully!');
    });
};

// Delete Bike
exports.deleteBike = (req, res) => {
    let bikeId = req.params.id;

    db.query('SELECT image FROM bikes WHERE id = ?', [bikeId], (err, result) => {
        if (err) return res.status(500).send(err);

        let image = result[0].image;
        let imagePath = `public/assets/img/${image}`;

        if (fs.existsSync(imagePath) && image !== 'default.jpg') {
            fs.unlinkSync(imagePath);
        }

        db.query('DELETE FROM bikes WHERE id = ?', [bikeId], (err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/?success=Bike+deleted+successfully!');
        });
    });
};
