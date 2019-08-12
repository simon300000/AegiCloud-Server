import fs from 'fs'
import genId from 'uuid/v4'
import Router from 'koa-router'
const login = new Router()

// /login
login.post('/', async (ctx, next) => {
  if (ctx.request.body.username && ctx.request.body.password) {
    ctx.response.status = 200
    const userConf = JSON.parse(
      await fs.promises.readFile('/aegicloud/conf/user.conf', {
        flag: 'w'
      })
    )
    if (
      ctx.request.body.username === userConf.username &&
      ctx.request.body.password === userConf.password
    ) {
      global.token = genId()
      global.token = ctx.headers.Authorization = global.token
    } else {
      ctx.response.status = 401
    }
    await next()
  } else {
    ctx.response.status = 400
    await next()
  }
})

module.exports = login
