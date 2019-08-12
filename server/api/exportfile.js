import fs from 'fs'
import Router from 'koa-router'
import coreexportfile from '../core/export'
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
      global.data.conf.filename = ctx.request.body.filename
      const file = coreexportfile(ctx.request.body.filename)
      const size = (await fs.promises.stat(file.path)).size
      const f = fs.createReadStream(file.path)
      ctx.response.status = 200
      ctx.response.headers['Content-Type'] = 'application/force-download'
      ctx.response.headers['Content-Disposition'] =
        'attachment; filename=' + file.name
      ctx.response.headers['Content-Length'] = size
      f.pipe(ctx.response)
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
