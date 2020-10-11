module.exports = function (option) {
    
        return  async(req,res,next)=>{//中间件，检查token
            const adminusers = require('../models/adminusers')
            const jwt = require('jsonwebtoken')
            const assert = require('http-assert')
        const token = String(req.headers.authorization || '').split(' ').pop()//通过split(' ')分去前缀bearer，但是会变成数组，于是pop出来，就是token字符串了
        
        assert(token,401,'请先登陆')//没有token，让用户登陆
        const {id} = jwt.verify(token,req.app.get('secret'))//直接用app会获取不到，所以用req.app
        assert(id,401,'请先登陆')//tken不正确，让用户登陆
        req.user = await adminusers.findById(id)
        assert(req.user,401,'请先登陆')//根据id找不到用户，让用户登陆
        await next()
    }
}