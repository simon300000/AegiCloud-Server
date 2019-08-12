import fs from 'fs'
import Router from 'koa-router'
const install = new Router()

// /install
install.get('/', async (ctx, next) => {
  if (ctx.request.body.username && ctx.request.body.password) {
    ctx.response.status = 200
    await fs.promises.writeFile('/aegicloud/conf/user.conf', ctx.request.body)
    await next()
  } else {
    ctx.response.status = -101
    await next()
  }
})

module.exports = install
