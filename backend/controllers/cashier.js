// module/packages
const db = require('../Database/connectDB');

// 3.Cashier
const getCashierTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM cashier`)
    res.status(200).json(rows);
}

const getCashier = async (req,res) =>{
    const {StaffID,Name,BillID} = req.query;
    let baseQuery = 'SELECT * FROM cashier WHERE 1=1'
    const queryObject =[];
    if(BillID){
        baseQuery+= ' AND BillID= ?';
        queryObject.push(BillID);
    }
    if(Name){
        baseQuery+= ' AND Name LIKE ?';
        queryObject.push(`%${Name}%`);
    }
    if(StaffID){
        baseQuery+= ' AND StaffID= ?'
        queryObject.push(StaffID);
    }
    try {
        const [rows] = await db.execute(baseQuery,queryObject);
        if(rows.length===0){
            return res.status(404).json({message:'No valid cashier found'})
        }
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch any cashier'})
    }
}

const postCashier = async (req, res) => {
    const { StaffID, Name, BillID } = req.body;
  
    if (!StaffID || !Name || !BillID) {
      return res.status(400).json({ message: 'Please provide important details' });
    }
  
    const query = `
      INSERT INTO Cashier (StaffID, Name, BillID)
      VALUES (?, ?, ?)
    `;
  
    const queryObject = [
      Number(StaffID),
      Name,
      Number(BillID),
    ];
  
    try {
      const [result] = await db.execute(query, queryObject);
      res.status(200).json({ message: 'Cashier inserted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert Cashier' });
    }
};

const patchCashier = async (req, res) => {
    // const { StaffID, Name, BillID } = req.body;
  
    // if (!StaffID) {
    //   return res.status(400).json({ message: 'Please provide StaffID for patching' });
    // }
  
    // let baseQuery = 'UPDATE Cashier SET ';
    // const queryParams = [];
    // const updates = [];
  
    // if (Name) {
    //   updates.push('Name = ?');
    //   queryParams.push(Name);
    // }
    // if (BillID) {
    //   updates.push('BillID = ?');
    //   queryParams.push(BillID);
    // }
  
    // if (updates.length === 0) {
    //   return res.status(400).json({ message: 'No fields to update provided' });
    // }
  
    // baseQuery += updates.join(', ');
    // baseQuery += ' WHERE StaffID = ?';
    // queryParams.push(StaffID);
  
    // try {
    //   const [result] = await db.execute(baseQuery, queryParams);
    //   res.status(200).json({ message: 'Cashier details updated successfully', result });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to update Cashier' });
    // }
    const { id } = req.params;
    const { Name, BillID } = req.body;
  
    try {
      console.log(`Updating Cashier StaffID ${id} with data:`, req.body);
  
      let updateFields = [];
      let values = [];
  
      if (Name !== undefined) {
        updateFields.push('Name = ?');
        values.push(Name);
      }
      if (BillID !== undefined) {
        updateFields.push('BillID = ?');
        values.push(BillID);
      }
  
      if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
  
      const query = `
        UPDATE Cashier
        SET ${updateFields.join(', ')}
        WHERE StaffID = ?
      `;
      values.push(id);
  
      const [result] = await db.execute(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cashier not found' });
      }
  
      res.status(200).json({ message: 'Cashier updated successfully' });
    } catch (error) {
      console.error('Error updating Cashier:', error);
      res.status(500).json({ message: 'Failed to update Cashier' });
    }
};
  
const deleteCashier = async (req, res) => {
    // const { StaffID } = req.body;
  
    // if (!StaffID) {
    //   return res.status(400).json({ message: 'Please provide StaffID to delete' });
    // }
  
    // const deleteQuery = `DELETE FROM cashier WHERE StaffID = ?`;
  
    // try {
    //   const [result] = await db.execute(deleteQuery, [StaffID]);
  
    //   if (result.affectedRows === 0) {
    //     return res.status(404).json({ message: `No doctor found with ID: ${StaffID}` });
    //   }
  
    //   res.status(200).json({ message: `Doctor with ID ${StaffID} deleted successfully` });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to delete Staff' });
    // }
    const { id } = req.params;
    try {
      const [result] = await db.execute(`DELETE FROM Cashier WHERE StaffID = ?`, [id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Cashier not found' });
      res.json({ message: 'Cashier deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Cashier' });
    }
  };


module.exports ={ getCashierTables, getCashier, postCashier,patchCashier, deleteCashier}