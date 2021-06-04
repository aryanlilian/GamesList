const getIndex = (req, res) => {
    const context = {
        title: 'Home',
        isLoggedIn: req.isAuthenticated()
    }
    res.render('index/index', context);
}

module.exports = {
    getIndex
}
