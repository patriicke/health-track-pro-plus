const welcomeController = {
    welcome: (req, res) => {
        res.json({
            message: "Welcome to Health-Track-Pro-Plus API.",
        });
    }
}

module.exports = welcomeController;