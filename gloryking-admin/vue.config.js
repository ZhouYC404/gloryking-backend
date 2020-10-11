module.exports = {
     outputDir: __dirname + '/../gloryking-server/server/admin',    
      publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/'
}