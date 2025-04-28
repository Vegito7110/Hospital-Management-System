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

const postOutPatient = async (req, res) => {
    const { PatientID, AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID } = req.body;
  
    if (!PatientID || !AdmissionDate) {
      return res.status(400).json({ message: 'Please provide important details' });
    }
  
    const query = `
      INSERT INTO OutPatient (PatientID, AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const queryObject = [
      Number(PatientID),
      AdmissionDate,
      DischargeDate || null,
      Gender || null,
      MobileNumber || null,
      Address || null,
      OPD_Date || null,
      DoctorID || null,
    ];
  
    try {
      const [result] = await db.execute(query, queryObject);
      res.status(200).json({ message: 'OutPatient inserted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert OutPatient' });
    }
  };

const patchOutPatient = async (req, res) => {
    // const { PatientID, AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID } = req.body;
  
    // if (!PatientID) {
    //   return res.status(400).json({ message: 'Please provide PatientID for patching' });
    // }
  
    // let baseQuery = 'UPDATE OutPatient SET ';
    // const queryParams = [];
    // const updates = [];
  
    // if (AdmissionDate) {
    //   updates.push('AdmissionDate = ?');
    //   queryParams.push(AdmissionDate);
    // }
    // if (DischargeDate) {
    //   updates.push('DischargeDate = ?');
    //   queryParams.push(DischargeDate);
    // }
    // if (Gender) {
    //   updates.push('Gender = ?');
    //   queryParams.push(Gender);
    // }
    // if (MobileNumber) {
    //   updates.push('MobileNumber = ?');
    //   queryParams.push(MobileNumber);
    // }
    // if (Address) {
    //   updates.push('Address = ?');
    //   queryParams.push(Address);
    // }
    // if (OPD_Date) {
    //   updates.push('OPD_Date = ?');
    //   queryParams.push(OPD_Date);
    // }
    // if (DoctorID) {
    //   updates.push('DoctorID = ?');
    //   queryParams.push(DoctorID);
    // }
  
    // if (updates.length === 0) {
    //   return res.status(400).json({ message: 'No fields to update provided' });
    // }
  
    // baseQuery += updates.join(', ');
    // baseQuery += ' WHERE PatientID = ?';
    // queryParams.push(PatientID);
  
    // try {
    //   const [result] = await db.execute(baseQuery, queryParams);
    //   res.status(200).json({ message: 'OutPatient details updated successfully', result });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to update OutPatient' });
    // }
    // const { id } = req.params;
    // const { AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID } = req.body;
    // try {
    //   const [result] = await db.execute(
    //     `UPDATE OutPatient SET AdmissionDate = ?, DischargeDate = ?, Gender = ?, MobileNumber = ?, Address = ?, OPD_Date = ?, DoctorID = ? WHERE PatientID = ?`,
    //     [AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID, id]
    //   );
    //   if (result.affectedRows === 0) return res.status(404).json({ message: 'OutPatient not found' });
    //   res.json({ message: 'OutPatient updated successfully' });
    // } catch (error) {
    //   res.status(500).json({ error: 'Failed to update OutPatient' });
    // }

    const { id } = req.params;
    const { AdmissionDate, DischargeDate, Gender, MobileNumber, Address, OPD_Date, DoctorID } = req.body;
  
    try {
      console.log(`Updating OutPatient ID ${id} with data:`, req.body);
  
      let updateFields = [];
      let values = [];
  
      if (AdmissionDate) {
        updateFields.push('AdmissionDate = ?');
        values.push(AdmissionDate);
      }
      if (DischargeDate) {
        updateFields.push('DischargeDate = ?');
        values.push(DischargeDate);
      }
      if (Gender) {
        updateFields.push('Gender = ?');
        values.push(Gender);
      }
      if (MobileNumber) {
        updateFields.push('MobileNumber = ?');
        values.push(MobileNumber);
      }
      if (Address) {
        updateFields.push('Address = ?');
        values.push(Address);
      }
      if (OPD_Date) {
        updateFields.push('OPD_Date = ?');
        values.push(OPD_Date);
      }
      if (DoctorID) {
        updateFields.push('DoctorID = ?');
        values.push(DoctorID);
      }
  
      if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
  
      const query = `
        UPDATE OutPatient
        SET ${updateFields.join(', ')}
        WHERE PatientID = ?
      `;
      values.push(id);
  
      const [result] = await db.execute(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'OutPatient not found' });
      }
  
      res.status(200).json({ message: 'OutPatient updated successfully' });
    } catch (error) {
      console.error('Error updating OutPatient:', error);
      res.status(500).json({ message: 'Failed to update OutPatient' });
    }
};
  
const deleteOutPatient = async (req, res) => {
    // const { PatientID } = req.body;
  
    // if (!PatientID) {
    //   return res.status(400).json({ message: 'Please provide PatientID to delete' });
    // }
  
    // const deleteQuery = `DELETE FROM outpatient WHERE PatientID = ?`;
  
    // try {
    //   const [result] = await db.execute(deleteQuery, [PatientID]);
  
    //   if (result.affectedRows === 0) {
    //     return res.status(404).json({ message: `No outpatient found with ID: ${PatientID}` });
    //   }
  
    //   res.status(200).json({ message: `OutPatient with ID ${PatientID} deleted successfully` });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to delete outpatient' });
    // }
    const { id } = req.params;
    try {
      const [result] = await db.execute(`DELETE FROM OutPatient WHERE PatientID = ?`, [id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'OutPatient not found' });
      res.json({ message: 'OutPatient deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete OutPatient' });
    }
};
module.exports ={getOutPatientTables, getOutPatient,postOutPatient,patchOutPatient, deleteOutPatient}