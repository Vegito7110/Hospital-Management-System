// module/packages
const db = require('../Database/connectDB');

// route functions
const getRoomTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM room`)
    res.status(200).json(rows);
}

const getRoom = async (req,res) =>{
    const {RoomNumber,RoomCost,Vacant,InpatientID} = req.query;
    let baseQuery = 'SELECT * FROM cashier WHERE 1=1'
    const queryObject =[];
    if(RoomNumber){
        baseQuery+= ' AND RoomNumber= ?';
        queryObject.push(RoomNumber);
    }
    if(RoomCost){
        baseQuery+= ' AND RoomCost= ?'
        queryObject.push(RoomCost);
    }
    if(Vacant){
        baseQuery+= ' AND Vacant= ?'
        queryObject.push(Vacant);
    }
    if(InpatientID){
        baseQuery+= ' AND InpatientID= ?'
        queryObject.push(InpatientID);
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

const postRoom = async (req, res) => {
    let { RoomNumber, RoomCost, Vacant, InPatientID } = req.body;
  
    if (!RoomNumber || !RoomCost) {
      return res.status(400).json({ message: 'Please provide important details' });
    }
  
    if (typeof Vacant === 'string') {
      Vacant = Vacant.toLowerCase() === 'yes' ? 1 : 0;
    }

    const query = `
      INSERT INTO Room (RoomNumber, RoomCost, Vacant, InPatientID)
      VALUES (?, ?, ?, ?)
    `;
  
    const queryObject = [
      Number(RoomNumber),
      Number(RoomCost),
      Vacant !== undefined ? Vacant : null,
      InPatientID || null,
    ];
  
    try {
      const [result] = await db.execute(query, queryObject);
      res.status(200).json({ message: 'Room inserted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert Room' });
    }
};

const patchRoom = async (req, res) => {
    // const { RoomNumber, RoomCost, Vacant, InPatientID } = req.body;
  
    // if (!RoomNumber) {
    //   return res.status(400).json({ message: 'Please provide RoomNumber for patching' });
    // }
  
    // let baseQuery = 'UPDATE Room SET ';
    // const queryParams = [];
    // const updates = [];
  
    // if (RoomCost) {
    //   updates.push('RoomCost = ?');
    //   queryParams.push(RoomCost);
    // }
    // if (Vacant !== undefined) {
    //   updates.push('Vacant = ?');
    //   queryParams.push(Vacant);
    // }
    // if (InPatientID) {
    //   updates.push('InPatientID = ?');
    //   queryParams.push(InPatientID);
    // }
  
    // if (updates.length === 0) {
    //   return res.status(400).json({ message: 'No fields to update provided' });
    // }
  
    // baseQuery += updates.join(', ');
    // baseQuery += ' WHERE RoomNumber = ?';
    // queryParams.push(RoomNumber);
  
    // try {
    //   const [result] = await db.execute(baseQuery, queryParams);
    //   res.status(200).json({ message: 'Room details updated successfully', result });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to update Room' });
    // }
    const { id } = req.params;
    const { RoomCost, Vacant, InPatientID } = req.body;
  
    if (typeof Vacant === 'string') {
      Vacant = Vacant.toLowerCase() === 'yes' ? 1 : 0;
    }
    try {
      console.log(`Updating Room Number ${id} with data:`, req.body);
  
      let updateFields = [];
      let values = [];
  
      if (RoomCost !== undefined) {
        updateFields.push('RoomCost = ?');
        values.push(RoomCost);
      }
      if (Vacant !== undefined) {
        updateFields.push('Vacant = ?');
        values.push(Vacant);
      }
      if (InPatientID !== undefined) {
        updateFields.push('InPatientID = ?');
        values.push(InPatientID);
      }
  
      if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
  
      const query = `
        UPDATE Room
        SET ${updateFields.join(', ')}
        WHERE RoomNumber = ?
      `;
      values.push(id);
  
      const [result] = await db.execute(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
      console.error('Error updating Room:', error);
      res.status(500).json({ message: 'Failed to update Room' });
    }
};
  
const deleteRoom = async (req, res) => {
    // const { RoomNumber } = req.body;
  
    // if (!RoomNumber) {
    //   return res.status(400).json({ message: 'Please provide RoomNumber to delete' });
    // }
  
    // const deleteQuery = `DELETE FROM room WHERE RoomNumber = ?`;
  
    // try {
    //   const [result] = await db.execute(deleteQuery, [RoomNumber]);
  
    //   if (result.affectedRows === 0) {
    //     return res.status(404).json({ message: `No room found with ID: ${RoomNumber}` });
    //   }
  
    //   res.status(200).json({ message: `Room with ID ${RoomNumber} deleted successfully` });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Failed to delete room' });
    // }

    const { id } = req.params;
    try {
      const [result] = await db.execute(`DELETE FROM Room WHERE RoomNumber = ?`, [id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Room not found' });
      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Room' });
    }
};
// module exports
module.exports = { getRoomTables, getRoom,postRoom,patchRoom, deleteRoom}