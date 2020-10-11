const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'categories'}],
    detail:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('articles',schema)//实体