const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    name:{type:String},
    avatar:{type:String},
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'categories'}],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'items'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'items'}],
    usagetips:{type:String},
    battletips:{type:String},
    teamtips:{type:String},
    partners:[{
      hero:{type:mongoose.SchemaTypes.ObjectId,ref:'heros'},
      description:{type:String}
    }]
})

module.exports = mongoose.model('heros',schema)//实体