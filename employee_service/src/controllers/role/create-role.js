module.exports = function makeCreateRoleAction({
    createRole
}) {
    return async function createRoleAction(req, res) {
        try {
            let permission = req.body.permission;
            const roleName = req.body.roleName;
            const isMaster = req.body.isMaster;
            const companyId = req.body.companyId;
            console.log("createRoleAction", permission, roleName, isMaster, companyId)
            const resutl = await createRole({ permission, roleName, isMaster, companyId });
            res.status(201).send(resutl);
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }

    }
}