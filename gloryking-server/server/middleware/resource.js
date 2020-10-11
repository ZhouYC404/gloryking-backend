module.exports = function (option) {
    return async function (req,res,next) {//中间件，当路径为请求crud操作时，根据url中的resource的不同，动态地请求不同的mongoose模块，实现crud操作的封装，减少crud路由的代码数。
        const modelname = req.params.resource
        req.model = require(`../models/${modelname}`)//根据url不同，请求不同的模块并挂在req.model上
        next()
    }
}