class HomeController {
    async index(req, res) {
        res.send("API Running fine.")
    }
}

module.exports = new HomeController();
