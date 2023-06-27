module.exports = function makeGetAllEmployee({
    getAllEmployeeDb,
}){
    return async function getAllEmployee(){
        
        return await getAllEmployeeDb();;   
    }

}