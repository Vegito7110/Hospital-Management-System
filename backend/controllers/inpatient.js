// module/packages
const db = require('../Database/connectDB');


// 4.InPatient
const getInPatientTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM inpatient`)
    res.status(200).json(rows);
}

const getInPatient = async (req,res) =>{
    const {PatientID,AdmissionID,AdmissionDate,DischargeDate,RoomNumber,Gender, MobileNumber, DoctorID, Address} = req.query;
    let baseQuery = 'SELECT * FROM inpatient WHERE 1=1'
    const queryObject =[];
    if(PatientID){
        baseQuery+= ' AND PatientID= ?';
        queryObject.push(PatientID);
    }
    if(AdmissionID){
        baseQuery+= ' AND AdmissionID= ?';
        queryObject.push(AdmissionID);
    }
    if(AdmissionDate){
        baseQuery+= ' AND AdmissionDate= ?';
        queryObject.push(AdmissionDate);
    }
    if(DischargeDate){
        baseQuery+= ' AND DischargeDate= ?';
        queryObject.push(DischargeDate);
    }
    if(RoomNumber){
        baseQuery+= ' AND RoomNumber= ?';
        queryObject.push(RoomNumber);
    }
    if(Gender){
        baseQuery+= ' AND Gender= ?';
        queryObject.push(Gender);
    }
    if(MobileNumber){
        baseQuery+= ' AND MobileNumber= ?'
        queryObject.push(MobileNumber);
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
            return res.status(404).json({message:'No valid inpatient found'})
        }
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch any inpatient'})
    }
}

const deleteInPatient = async (req, res) => {
    const { PatientID } = req.body;
  
    if (!PatientID) {
      return res.status(400).json({ message: 'Please provide InpatientID to delete' });
    }
  
    const deleteQuery = `DELETE FROM inpatient WHERE InpatientID = ?`;
  
    try {
      const [result] = await db.execute(deleteQuery, [PatientID]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No inpatient found with ID: ${PatientID}` });
      }
      res.status(200).json({ message: `Inpatient with ID ${PatientID} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete inpatient' });
    }
};

module.exports = {getInPatientTables, getInPatient, deleteInPatient}