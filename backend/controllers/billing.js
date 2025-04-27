// module/packages
const db = require('../Database/connectDB');


// 2.Billing
const getBillingTables = async (req,res)=>{
    const [rows] = await db.query(`SELECT * FROM billing`)
    res.status(200).json(rows);
}

const getBilling = async (req,res) =>{
    const {BillID,InPatientID,Specialization, MobileNumber, Cabin, Address} = req.query;
    let baseQuery = 'SELECT * FROM billing WHERE 1=1'
    const queryObject =[];
    if(BillID){
        baseQuery+= ' AND BillID= ?';
        queryObject.push(BillID);
    }
    if(InPatientID){
        baseQuery+= ' AND InPatientID= ?';
        queryObject.push(InPatientID);
    }
    if(OutPatientID){
        baseQuery+= ' AND OutPatientID= ?';
        queryObject.push(OutPatientID);
    }
    if(RoomID){
        baseQuery+= ' AND RoomID= ?'
        queryObject.push(RoomID);
    }
    if(Expenses){
        baseQuery+= ' AND Expenses= ?'
        queryObject.push(Expenses)
    }
    try {
        const [rows] = await db.execute(baseQuery,queryObject);
        if(rows.length===0){
            return res.status(404).json({message:'No valid bill found'})
        }
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch any bills'})
    }
}

const postBilling = async (req, res) => {
    const { BillID, InPatientID, OutPatientID, RoomID, Expenses } = req.body;
  
    if (!BillID || !Expenses) {
      return res.status(400).json({ message: 'Please provide important details' });
    }
  
    const query = `
      INSERT INTO Billing (BillID, InPatientID, OutPatientID, RoomID, Expenses)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    const queryObject = [
      Number(BillID),
      InPatientID || null,
      OutPatientID || null,
      RoomID || null,
      Number(Expenses),
    ];
  
    try {
      const [result] = await db.execute(query, queryObject);
      res.status(200).json({ message: 'Billing inserted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to insert Billing' });
    }
};

const patchBilling = async (req, res) => {
    const { BillID, InPatientID, OutPatientID, RoomID, Expenses } = req.body;
  
    if (!BillID) {
      return res.status(400).json({ message: 'Please provide BillID for patching' });
    }
  
    let baseQuery = 'UPDATE Billing SET ';
    const queryParams = [];
    const updates = [];
  
    if (InPatientID) {
      updates.push('InPatientID = ?');
      queryParams.push(InPatientID);
    }
    if (OutPatientID) {
      updates.push('OutPatientID = ?');
      queryParams.push(OutPatientID);
    }
    if (RoomID) {
      updates.push('RoomID = ?');
      queryParams.push(RoomID);
    }
    if (Expenses) {
      updates.push('Expenses = ?');
      queryParams.push(Expenses);
    }
  
    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update provided' });
    }
  
    baseQuery += updates.join(', ');
    baseQuery += ' WHERE BillID = ?';
    queryParams.push(BillID);
  
    try {
      const [result] = await db.execute(baseQuery, queryParams);
      res.status(200).json({ message: 'Billing details updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Billing' });
    }
};
  
const deleteBill = async (req, res) => {
    const { BillID } = req.body;
  
    if (!BillID) {
      return res.status(400).json({ message: 'Please provide BillID to delete' });
    }
  
    const deleteQuery = `DELETE FROM billing WHERE BillID = ?`;
  
    try {
      const [result] = await db.execute(deleteQuery, [BillID]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No doctor found with ID: ${BillID}` });
      }
  
      res.status(200).json({ message: `Bill with ID ${BillID} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete bill' });
    }
};

module.exports ={getBillingTables,getBilling,postBilling,patchBilling, deleteBill}