module.exports = function makeUpdateRoleAction({
    updateRole
}) {
    return async function updateRoleAction(req, res) {
        try {
            const roleId = req.params.roleid;

            const updateData = req.body;
            const result = await updateRole({ updateData, roleId });
            res.status(204).json({
                message: result,
            });
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }
    }
}