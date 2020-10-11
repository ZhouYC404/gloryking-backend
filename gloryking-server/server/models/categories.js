const mongoose = require('mongoose')

const schema = new mongoose.Schema({//骨架
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'categories'}
    //parent的type定义为objectid是因为_id为objectid类型，
    //并且mongoose.schemaxxxx是使用关联查询的前置条件；
    //ref表示使用populate关联查询的时候，mongodb会去哪个集合查询；
    //很显然就是在本身这个集合查询。

})
module.exports = mongoose.model('categories',schema)//可以操作crud的实体