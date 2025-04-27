// module/packages
const db = require('../Database/connectDB');

// 7.staff
const getStaffTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM staff`)
    res.status(200).json(rows);
}

const getStaff = async (req,res) =>{
    const {StaffID,FirstName,Surname, Designation, Address, MobileNumber} = req.query;
    let baseQuery = 'SELECT * FROM staff WHERE 1=1'
    const queryObject =[];
    if(StaffID){
        baseQuery+= ' AND StaffID= ?';
        queryObject.push(StaffID);
    }
    if(FirstName){
        baseQuery+= ' AND FirstName LIKE ?';
        queryObject.push(`%${FirstName}%`);
    }
    if(Surname){
        baseQuery+= ' AND Surname LIKE ?';
        queryObject.push(`%${Surname}%`);
    }
    if(Designation){
        baseQuery+= ' AND Designation LIKE ?'
        queryObject.push(`%${Designation}%`);
    }
    if(MobileNumber){
        baseQuery+= ' AND MobileNumber= ?'
        queryObject.push(MobileNumber);
    }
    if(Address){
        baseQuery+= ' AND Address= ?'
        queryObject.push(`%${Address}%`);
    }
    try {
        const [rows] = await db.execute(baseQuery,queryObject);
        if(rows.length===0){
            return res.status(404).json({message:'No valid doctor found'})
        }
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch any doctors'})
    }
}

const deleteStaff = async (req, res) => {
    const { StaffID } = req.body;
  
    if (!StaffID) {
      return res.status(400).json({ message: 'Please provide StaffID to delete' });
    }
  
    const deleteQuery = `DELETE FROM staff WHERE StaffID = ?`;
  
    try {
      const [result] = await db.execute(deleteQuery, [StaffID]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No staff found with ID: ${StaffID}` });
      }
  
      res.status(200).json({ message: `Staff with ID ${StaffID} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete staff' });
    }
};
module.exports ={getStaffTables, getStaff}