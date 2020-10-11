const mongoose = require('mongoose')
const schema = new mongoose.Schema({//骨架
    title:{type:String},
    category:{type:mongoose.SchemaTypes.ObjectId,ref:'categories'},
    img:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('videos',schema)//实体