module.exports = function makeGetEmployeeLoginActivityAction({
    getEmployeeLoginActivity
}){
    return async function getEmployeeLoginActivityAction(req,res){
        console.log("getEmployeeLoginActivityAction");
        const id = req.id;
        const search = req.params.search;
        const data = req.params.data;
        console.log("employee",id);
        console.log("search",search);
        console.log("data",data);
        const result = await getEmployeeLoginActivity({id,search,data})
        res.send(result);
    }
}