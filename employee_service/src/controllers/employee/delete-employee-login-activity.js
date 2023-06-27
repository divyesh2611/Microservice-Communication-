module.exports = function makeDeleteEmployeeLoginActivityAction({
    deleteEmployeeLoginActivity
}){
    return async function deleteEmployeeLoginActivityAction(req,res){
        try{
            const authIds = req.body.authIds;
            
            const result = await deleteEmployeeLoginActivity({authIds});
            res.status(201).send(result);
        }
        catch(e){
            console.log(`error:${e}`);
            res.status(401).send(e);
        }
    }
}