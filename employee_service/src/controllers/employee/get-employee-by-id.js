module.exports = function makeGetEmployeeByIdAction({
    getEmployeeById,
    Joi
}){
    return async function getEmployeeByIdAction(req,res){
        try{
            const id = req.id;
            console.log('***************getEmployeeByIdAction***************');
            console.log(req.id);
            
           const result = await getEmployeeById({id});
            res.status(200).send(result);
        }
        catch(e){
            console.log("error");
            res.status(400).send(`${e} employee is not geted`);
        }

    }
}