module.exports = function makeGetAllCompany({
    getAllCompanyDb,
}){
    return async function getAllCompany(){
        console.log("getAllCompanyUsecase");

        //dataaccess call to company data
        const result = await getAllCompanyDb();
        return result;
    }

    
}