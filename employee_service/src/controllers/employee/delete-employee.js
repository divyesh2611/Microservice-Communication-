module.exports = function makeDeleteEmployeeAction({
    deleteEmployee,
    Joi
}){
    return async function deleteEmployeeAction(req,res){
        try{
            const id = req.id;
            const result = await deleteEmployee({id});
            res.status(200).send("employee is deleted");
        }
        catch(e){
            console.log("error");
            res.send(`${e} employee is not deleted`);
        }

    }

   
}