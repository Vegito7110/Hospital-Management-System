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


module.exports ={getDoctorTables,getDoctor, postDoctor}


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