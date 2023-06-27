module.exports = function makeDeleteRoleAction({
    deleteRoleDb
}) {
    return async function deleteRoleAction(req, res) {
        try {
            const roleId = req.params.roleid;
            await deleteRoleDb({ roleId });
            res.status(203).send('role is deleted');
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }

    }
}