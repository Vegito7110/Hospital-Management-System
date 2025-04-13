// module/packages
const db = require('../Database/connectDB');

// route functions
const getDoctorTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM doctor`)
    res.status(200).json(rows);
}

const getDoctor = async (req,res) =>{
    const {DoctorID,Name,Specialization, MobileNumber, Cabin, Address} = req.query;
    let baseQuery = 'SELECT * FROM doctor WHERE 1=1'
    const queryObject =[];
    if(DoctorID){
        baseQuery+= ' AND DoctorID= ?';
        queryObject.push(DoctorID);
    }
    if(Name){
        baseQuery+= ' AND Name LIKE ?';
        queryObject.push(`%${Name}%`);
    }
    if(Specialization){
        baseQuery+= ' AND Specialization LIKE ?'
        queryObject.push(`%${Specialization}%`);
    }
    if(MobileNumber){
        baseQuery+= ' AND MobileNumber= ?'
        queryObject.push(MobileNumber);
    }
    if(Cabin){
        baseQuery+= ' AND Cabin= ?'
        queryObject.push(Cabin)
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

module.exports ={getDoctorTables,getDoctor}