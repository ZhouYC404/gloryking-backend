module.exports = function (app) {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/gloryking-test',{
        useNewUrlParser:true,
        useFindAndModify:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    require('require-all')(__dirname+'/../models')//利用require-all包来导入所有的mongoose模型，不然在关联查询的时候，模型之间互相引用，因为部分模型没有导入可能会报错！
}



