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

module.exports ={getStaffTables, getStaff}