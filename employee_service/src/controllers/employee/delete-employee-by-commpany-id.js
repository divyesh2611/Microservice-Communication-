module.exports = function makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId,
}){
    return async function deleteEmployeeByCompanyIdAction(req,res){
        const companyId = req.params.companyid;
        
        await deleteEmployeeByCompanyId({companyId})
        res.status(200).send("employees are deleted")
    }
 
}