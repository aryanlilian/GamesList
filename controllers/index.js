const getIndex = (req, res) => {
    const context = {
        title: 'Home'
    }
    res.render('index', context);
}

module.exports = {
    getIndex
}
