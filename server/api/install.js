const fs = require('fs')
const Router = require('koa-router')
const install = new Router()

// /install
install.post('/', async (ctx, next) => {
  if (ctx.request.body.username && ctx.request.body.password) {
    ctx.response.status = 200
    await fs.promises.writeFile(
      '/aegicloud/conf/user.conf',
      JSON.stringify(ctx.request.body),
      {
        flag: 'w+'
      }
    )
    await next()
  } else {
    ctx.response.status = 400
    await next()
  }
})

module.exports = install
