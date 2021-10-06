/*
** Name of the function :  status
** Description : Check if the backend works
** Type : 
** Return : HTTP code 200 & Message "Status: OK"
*/
async function status(req, res, next) {
    req; // Catch all request to an useless variable (void)
    res.status(200).send("Status: OK");
    next();
};

module.exports = {
    status
}