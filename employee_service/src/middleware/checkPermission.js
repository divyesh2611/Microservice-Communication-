module.exports = function makeCheckPermission({
    permissionsObj,
    getRoleById,
    getRoleId
}) {
    return async function checkPermission(req, res, next) {
        try {
            console.log("checkPermission", req.headers.companypermission)
            if (req.headers.companypermission) {
                next();
            }
            else {
                const id = req.id;
                const roleIdArr = await getRoleId({ employeeId: id });
                if (roleIdArr.length == 1 && roleIdArr[0].is_master) {
                    next();
                }
                else {
                    const methodUrl = req.method + ':' + req.route.path;
                    console.log("req.method and req.url", methodUrl);

                    const urlValue = permissionsObj[methodUrl];
                    console.log("urlValue", urlValue);

                    console.log("roleIdARR", roleIdArr)
                    let isPermission;
                    for (const role of roleIdArr) {
                        const perm = await getRoleById({ roleId: role.role_id });
                        console.log("perm", perm);
                        const permissions = perm.permission;
                        isPermission = permissions[urlValue];
                        console.log("ispermission", isPermission)
                        if (isPermission) {
                            break;
                        }
                    }
                    if (!isPermission) {
                        throw new Error("Permission forbidden!!!");
                    }
                    next();
                }

            }

        }
        catch (error) {
            console.log(error);
            res.status(400).send({ Error: "Error while checking permissions :: " + error });
        }
    }
}
