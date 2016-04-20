/// FILES ///
var User = require('../models/User.js');




module.exports = {

    addUser: function(req, res) {
        new User(req.body).save(function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(user);
            }
        });
    },

    /// gets current, logged in user ///
    getCurrentUser: function(req, res) {
        if (req.user) {
            res.status(200).send(req.user);
        } else {
            res.status(403).send('forbidden');
        }
    },


    getUser: function(req, res) {
        User.findById(req.query.id, function(err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.send(user);
            }
        });
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

    isAuth: function(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.status(403).send('Not Permitted');
        }
    }


};
