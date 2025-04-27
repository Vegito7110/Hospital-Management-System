// module/packages
const db = require('../Database/connectDB');

// route functions
const getDoctorTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM doctor`)
    res.status(200).json(rows);
}

const getDoctor = async (req,res) =>{
    const {DoctorID,Name,Specialization, MobileNumber, Cabin, Address} = req.body;
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
        res.status(406).json({message:'Failed to fetch any doctors'})
    }
}

const postDoctor = async(req,res) =>{
    const { DoctorID, Name, Specialization, MobileNumber, Cabin, Address } = req.body;

    if (!DoctorID || !Name) {
      return res.status(400).json({ message: 'Please provide important details' });
    }
  
    const query = `
      INSERT INTO Doctor (DoctorID, Name, Specialization, MobileNumber, Cabin, Address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    // Fill missing optional values with null
    const queryObject = [
      Number(DoctorID),
      Name,
      Specialization || null,
      MobileNumber || null,
      Cabin || null,
      Address || null,
    ];
  
    try {
      const [result] = await db.execute(query, queryObject);
      res.status(200).json({ message: 'Doctor inserted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert doctor' });
    }
}

const patchDoctor = async (req, res) => {
    const { DoctorID, Name, Specialization, MobileNumber, Cabin, Address } = req.body;
  
    if (!DoctorID) {
      return res.status(400).json({ message: 'Please provide DoctorID for patching' });
    }
  
    let baseQuery = 'UPDATE doctor SET ';
    const queryParams = [];
    const updates = [];
  
    if (Name) {
      updates.push('Name = ?');
      queryParams.push(Name);
    }
    if (Specialization) {
      updates.push('Specialization = ?');
      queryParams.push(Specialization);
    }
    if (MobileNumber) {
      updates.push('MobileNumber = ?');
      queryParams.push(MobileNumber);
    }
    if (Cabin) {
      updates.push('Cabin = ?');
      queryParams.push(Cabin);
    }
    if (Address) {
      updates.push('Address = ?');
      queryParams.push(Address);
    }
    // Check if there's anything to update
    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update provided' });
    }
  
    // Join the update statements and add WHERE clause
    baseQuery += updates.join(', ');
    baseQuery += ' WHERE DoctorID = ?';
    queryParams.push(DoctorID); // Add DoctorID to the end of parameters
  
    try {
      const [result] = await db.execute(baseQuery, queryParams);
      res.status(200).json({ message: 'Doctor details updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update doctor' });
    }
};

const deleteDoctor = async (req, res) => {
    const { DoctorID } = req.body;
  
    if (!DoctorID) {
      return res.status(400).json({ message: 'Please provide DoctorID to delete' });
    }
  
    const deleteQuery = `DELETE FROM doctor WHERE DoctorID = ?`;
  
    try {
      const [result] = await db.execute(deleteQuery, [DoctorID]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No doctor found with ID: ${DoctorID}` });
      }
  
      res.status(200).json({ message: `Doctor with ID ${DoctorID} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete doctor' });
    }
};


module.exports ={getDoctorTables,getDoctor, postDoctor,patchDoctor,deleteDoctor}


// Alternate method for postDoctor
/*const postDoctor = async (req, res) => {
    const { DoctorID, Name, Specialization, MobileNumber, Cabin, Address } = req.body;

    if (!DoctorID || !Name) {
        return res.status(400).json({ message: 'Please provide important details' });
    }

    try {
        // Step 1: Initialize columns and values
        const columns = ['DoctorID', 'Name'];
        const values = [DoctorID, Name];
        const placeholders = ['?', '?'];

        // Step 2: Add optional fields if provided
        if (Specialization) {
            columns.push('Specialization');
            values.push(Specialization);
            placeholders.push('?');
        }
        if (MobileNumber) {
            columns.push('MobileNumber');
            values.push(MobileNumber);
            placeholders.push('?');
        }
        if (Cabin) {
            columns.push('Cabin');
            values.push(Cabin);
            placeholders.push('?');
        }
        if (Address) {
            columns.push('Address');
            values.push(Address);
            placeholders.push('?');
        }

        // Step 3: Construct final query
        const baseQuery = `INSERT INTO Doctor (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;

        // Step 4: Execute query
        const [result] = await db.execute(baseQuery, values);

        res.status(200).json({ message: 'Doctor inserted successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to insert doctor' });
    }
};
*/