const getIndex = (req, res) => {
    const context = {
        title: 'Home'
    }
    res.render('index/index', context);
}

module.exports = {
    getIndex
}
