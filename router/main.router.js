const userR = require('./users.router')

const maineRouter =(app)=>{

    app.use('/users',userR)
}
module.exports = maineRouter




