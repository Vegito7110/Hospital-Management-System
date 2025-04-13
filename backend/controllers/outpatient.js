// module/packages
const db = require('../Database/connectDB');

// route functions 
const getOutPatientTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM outpatient`)
    res.status(200).json(rows);
}

const getOutPatient = async (req,res) =>{
    const {PatientID,AdmissionDate,DischargeDate,Gender, MobileNumber,OPD_Date, DoctorID, Address} = req.query;
    let baseQuery = 'SELECT * FROM outpatient WHERE 1=1'
    const queryObject =[];
    if(PatientID){
        baseQuery+= ' AND PatientID= ?';
        queryObject.push(PatientID);
    }
    if(AdmissionDate){
        baseQuery+= ' AND AdmissionDate= ?';
        queryObject.push(AdmissionDate);
    }
    if(DischargeDate){
        baseQuery+= ' AND DischargeDate= ?';
        queryObject.push(DischargeDate);
    }
    if(Gender){
        baseQuery+= ' AND Gender= ?';
        queryObject.push(Gender);
    }
    if(MobileNumber){
        baseQuery+= ' AND MobileNumber= ?'
        queryObject.push(MobileNumber);
    }
    if(OPD_Date){
        baseQuery+= ' AND OPD_Date= ?';
        queryObject.push(OPD_Date);
    }
    if(DoctorID){
        baseQuery+= ' AND DoctorID= ?'
        queryObject.push(DoctorID)
    }
    if(Address){
        baseQuery+= ' AND Address= ?'
        queryObject.push(`%${Address}%`);
    }
    try {
        const [rows] = await db.execute(baseQuery,queryObject);
        if(rows.length===0){
            return res.status(404).json({message:'No valid outpatient found'})
        }
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch any outpatients'})
    }
}

module.exports ={getOutPatientTables, getOutPatient}