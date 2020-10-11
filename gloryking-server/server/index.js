const express = require('express')
const app = express()
//const authmiddlware = require('./middleware/auth')
require('./plugin/db')(app)//引入连接mongodb代码

app.set('secret','ycgodgogogo')//给app加一个属性secret，其值为ycgodgogogo，为了后面的jwt验证

app.use(require('cors')())//解决跨域
app.use(express.json())//解决json数据读取问题
app.use('/uploads',express.static(__dirname + '/uploads'))//url以uploads开头的路径，express自动去uploads文件夹下面寻找文件并返回给客户端，返回什么文件是根据url中/uploads/后面的路径为文件名返回的。


require('./routes/admin/index')(app)//引入路由相关代码

app.listen(10086,()=>{
    console.log('10086为您服务~');
})