const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    name:{type:String},
    items:[{
       image:{type:String},
       url:{type:String}
    }]
})

module.exports = mongoose.model('ads',schema)//实体