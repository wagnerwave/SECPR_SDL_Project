async function status(req, res, next) {
    return res.send("Status: OK");
};

module.exports = {
    status
}