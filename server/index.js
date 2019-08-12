import fs from 'fs'
import path from 'path'
import { Nuxt, Builder } from 'nuxt'
import { ready } from 'consola'
import Koa from 'koa'
import schedule from 'node-schedule'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { config, dev } from '../nuxt.config.js'

const router = new Router()
const app = new Koa()

// Import and Set Nuxt.js options
dev = app.env !== 'production'
;(async () => {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 2120
  } = nuxt.options.server

  // Build in development
  if (dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    const urlPath = new URL(ctx.request.url).pathname
    if (/^\/api\/.+/.test(urlPath.toLowerCase())) {
      await next()
    } else {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    }
  })

  // Load API Modules
  const urls = fs.readdirSync(path.resolve(__dirname, '/api'))
  urls.forEach((element) => {
    const module = require(path.resolve(__dirname, '/api/', element))
    router.use(
      '/api/' + element.replace('.js', ''),
      module.routes(),
      module.allowedMethods()
    )
  })

  app.use(async (ctx, next) => {
    if (ctx.request.headers.Authorization === global.token) {
      ctx.isLogin = true
    } else {
      ctx.isLogin = false
    }
    await next()
  })

  app.use(router.routes())

  schedule.scheduleJob('*/30 * * * * *', async () => {
    if (global.data.lines && global.data.users && global.data.conf.filename)
      await fs.promises.writeFile(
        '/aegicloud/projects/' + global.data.conf.filename,
        JSON.stringify(global.data)
      )
  })

  app.listen(port, host)
  ready({
    message: `AegiCloud Server listening on http://${host}:${port}`,
    badge: true
  })
})()
