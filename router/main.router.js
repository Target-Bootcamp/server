const indexR = require('./index.router')

const mainRouter =(app)=>{
    app.use("/",indexR)
}
module.exports = mainRouter
