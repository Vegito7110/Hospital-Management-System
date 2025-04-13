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

// module exports
module.exports = { getRoomTables, getRoom}