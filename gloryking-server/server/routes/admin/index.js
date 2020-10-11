module.exports = function (app) {
    //导出一个函数，把父级的app传过来，不然还需要像父级那样再次写一遍app.use(..json),app.use(cors)，很麻烦。
    const adminusers = require('../../models/adminusers')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const express = require('express')
    const router = express.Router({mergeParams:true}) 
    const multer = require('multer')//中间件，处理二进制数据
    const authmiddlware = require('../../middleware/auth')
    const resourcemiddlware = require('../../middleware/resource')//↑引入两个自己封装的中间件
    const upload = multer({dest:__dirname + '/../../uploads'})//使用multer并配置图片的路径为uploads文件夹

    app.post('/api/admin/upload',authmiddlware(),upload.single('file'),async(req,res)=>{
       
          let file = req.file
         //file.url = `http://pvp.ycgod.cn/uploads/${file.filename}`
          file.url = `http://localhost:10086/uploads/${file.filename}`
        
          res.send(file.url)

    })
   
    app.use('/api/admin/rest/:resource',authmiddlware(),resourcemiddlware() ,router)//app.use中的path会被添加到router中最为前缀。

    router.post('/new',async (req,res)=>{//新增数据
          let cat = await req.model.create(req.body)
          res.send(cat)
    })
    router.get('/list',async(req,res)=>{//获取数据
        //require('../../models/categories')
        const queryoption = {}
        if(req.model.modelName === 'categories'){
                queryoption.populate = 'parent'
        }
         /* if(req.model.modelName === 'articles'){
            queryoption.populate = 'categories'
    }  */
        let cats = await req.model.find().setOptions(queryoption)//如有需要，populate关联查询
        res.send(cats)
    })
    router.get('/edit/:id',async(req,res)=>{//获取数据（显示编辑页面数据）
        let cat = await req.model.findById(req.params.id)
        //console.log(cat);
        res.send(cat)
    })
    router.put('/edit/:id',async(req,res)=>{//修改数据
        //req.body为对象，express.json自动完成了json到对象的解析
        let cat = await req.model.findByIdAndUpdate(req.params.id,req.body)
        res.send('修改成功！')
    })
    router.delete('/delete/:id',async(req,res)=>{
        await req.model.findByIdAndDelete(req.params.id)
        res.send('删除成功！')
    })

    app.get('/api/admin/isshowlogin',authmiddlware(),async(req,res)=>{
        //根据token判断显示登陆还是退出登录按钮，独立接口
        res.send({
            message:'合格'
        })
    })

    app.post('/api/admin/login',async (req,res)=>{//登陆接口
        let valid = false
        let {username,password} = req.body
        assert(username,422,'用户不能为空')//用户为空，抛出错误
        assert(password,422,'密码不能为空')//没有密码，抛出错误，这个必须抛出，因为后面comparesync不能传入空值。
        const user = await adminusers.findOne({username:username}).select('+password')//强制找出password并且不排除username
        assert(user,422,'用户不存在')//用户找不到，抛出错误
        valid = require('bcrypt').compareSync(password,user.password)//检查password，返回值为boolean，赋值给valid变量
        assert(valid,422,'密码错误')//如果valid为false，则表示密码不对，抛出错误
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    app.post('/api/admin/register',async(req,res)=>{
        //console.log(req.body);
        let{username,password} = req.body
        assert(username,422,'用户不能为空')
        assert(password,422,'密码不能为空')
        let yes = await adminusers.create(req.body)
        res.send(yes)
    })

    app.use((err,req,res,next)=>{//捕获错误中间件
        res.status(err.statusCode ||500).send({//因为use捕获所有错误，所以可能捕获到的错误没有状态码，此类一律返回500。
            message:err.message
        })
    })
}
