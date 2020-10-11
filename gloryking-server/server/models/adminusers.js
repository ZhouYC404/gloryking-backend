const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    username:{type:String},
    password:{
        type:String,
        select:false,
        set(val){//利用set属性对password进行加工，加工方式为bcrypt生成一串乱码，然后把这串乱码存入password中
           return require('bcrypt').hashSync(val,10)
        }}
        //官方文档：schematypes-> schematypes options
})
module.exports = mongoose.model('adminusers',schema)//可以操作crud的实体