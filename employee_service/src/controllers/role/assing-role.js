module.exports = function makeAssingRoleAction({
    assingRole
}) {
    return async function assingRoleAction(req, res) {
        try {
            console.log("assingroleAction");
            const roleId = req.body.roleId;
            const id = req.body.id;

            const resutl = await assingRole({ roleId, id });
            res.status(200).send(resutl);
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }

    }
}