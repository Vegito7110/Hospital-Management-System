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

module.exports ={getBillingTables,getBilling}