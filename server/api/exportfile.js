// const fs = require('fs')
const send = require('koa-send')
const Router = require('koa-router')
// const coreexportfile = require('../core/export')
const exportfile = new Router()

// /exportfile
exportfile.post('/', async (ctx, next) => {
  if (!ctx.isLogin) {
    ctx.response.status = 403
    await next()
    return
  }
  if (ctx.request.body.filename) {
    try {
      ctx.response.status = 200
      // global.data.conf.filename = ctx.request.body.filename
      // const file = coreexportfile(ctx.request.body.filename)
      // const size = (await fs.promises.stat(file.path)).size
      // const f = fs.createReadStream(file.path)
      // ctx.response.status = 200
      // ctx.response.set({
      //   'Content-Type': 'application/force-download',
      //   'Content-Disposition': 'attachment; filename=' + file.name,
      //   'Content-Length': size
      // })
      // f.pipe(ctx.response)
      // console.log(file)
      ctx.attachment(
        '/aegicloud/projects/' + ctx.request.body.filename.toString()
      )
      await send(
        ctx,
        '/aegicloud/projects/' + ctx.request.body.filename.toString()
      )
    } catch (error) {
      ctx.response.status = 500
      ctx.response.message = error
    }
    await next()
  } else {
    ctx.response.status = 500
    await next()
  }
})

module.exports = exportfile
