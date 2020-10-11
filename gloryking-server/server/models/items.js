const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    name:{type:String},
    icon:{type:String}
})

module.exports = mongoose.model('items',schema)//实体