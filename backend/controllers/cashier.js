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

module.exports ={ getCashierTables, getCashier}