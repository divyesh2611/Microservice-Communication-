module.exports = function makeCreateMasterRoleAction({
    createMasterRole
}) {
    return async function createMasterRoleAction(req, res) {
        try {
            const companyId = req.body.id;
            const roleId = createMasterRole({ companyId });
            res.status(201).json({
                message: "role is successfully created for master !!",
                roleId: roleId
            });
        }
        catch (e) {
            console.log(`error: ${e}`);
            res.status(e.httpStatusCode).send(e)
        }

    }
}