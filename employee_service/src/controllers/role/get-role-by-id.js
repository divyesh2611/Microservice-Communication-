module.exports = function makeGetRoleByIdAction({
    getRoleById
}) {
    return async function getRoleByIdAction(req, res) {
        try {
            const roleid = req.params.roleid;

            const resutl = await getRoleById(roleid);
            res.status(206).send(resutl);
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }

    }
}