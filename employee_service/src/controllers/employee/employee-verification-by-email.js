module.exports = function makeEmployeeVerificationByEmailAction({
    employeeVerificationByEmail
}){
    return async function employeeVerificationByEmailAction(req,res){
        try{
            console.log("employeeVerificationByEmailAction",req.params.verificationToken)
            const verificationToken  = req.params.verificationToken;
            const result =  await employeeVerificationByEmail({verificationToken});
            res.send(result);
        }
        catch(e){
            console.log(`error:${e}`);
            res.status(400).send(e);
        }

    }
}