/*
** Name of the function :  statusService
** Description : Check if the backend works
** Type : Service
** Return : HTTP code 200 & Message "Status: OK"
*/
async function statusService(req, res, next) {
    let request = req; // Catch all request to an useless variable (void)
    res.status(200).send("Status: OK");
    next();
};

module.exports = {
    statusService
}