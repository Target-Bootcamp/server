const testRouter = require('./test.router')
const userRouter = require('./users.router')
const actionsRouter = require('./actions.router')

const maineRouter = (app) => {
    app.use("/", testRouter)
    app.use('/users', userRouter)
    app.use('/actions', actionsRouter)
}


module.exports = maineRouter




