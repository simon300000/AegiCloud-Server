const fs = require('fs')
const genId = require('uuid/v4')
const Router = require('koa-router')
const login = new Router()

// /login
login.post('/', async (ctx, next) => {
  if (ctx.request.body.username && ctx.request.body.password) {
    ctx.response.status = 500
    try {
      const userConf = JSON.parse(
        await fs.promises.readFile('/aegicloud/conf/user.conf', {
          flag: 'r+'
        })
      )
      if (
        ctx.request.body.username === userConf.username &&
        ctx.request.body.password === userConf.password
      ) {
        ctx.response.status = 200
        global.token = genId()
        ctx.response.set({
          Authorization: global.token
        })
      } else {
        ctx.response.status = 401
      }
      await next()
    } catch (error) {
      ctx.response.status = 405
      await next()
    }
  } else {
    ctx.response.status = 400
    await next()
  }
})

module.exports = login
