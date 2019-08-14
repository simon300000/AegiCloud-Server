const fs = require('fs')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const { ready } = require('consola')
const Koa = require('koa')
const schedule = require('node-schedule')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const config = require('../nuxt.config.js')

const router = new Router()
const app = new Koa()

// Import and Set Nuxt.js options
const dev = app.env !== 'production'
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

  // Struct Initialize
  global.data = {
    lines: new Map(),
    users: new Map(),
    conf: {
      filename: ''
    }
  }

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    const urlPath = ctx.request.url
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
  const urls = fs.readdirSync(path.join(__dirname, '/api'))
  urls.forEach((element) => {
    const mod = require(path.join(__dirname, '/api/', element))
    router.use(
      '/api/' + element.replace('.js', ''),
      mod.routes(),
      mod.allowedMethods()
    )
  })

  app.use(async (ctx, next) => {
    if (ctx.request.headers.authorization === global.token) {
      ctx.isLogin = true
    } else {
      ctx.isLogin = false
    }
    await next()
  })

  app.use(router.routes()).use(router.allowedMethods())

  schedule.scheduleJob('*/30 * * * * *', async () => {
    try {
      if (global.data.lines && global.data.users && global.data.conf.filename)
        await fs.promises.writeFile(
          '/aegicloud/projects/' + global.data.conf.filename,
          JSON.stringify(global.data),
          {
            flag: 'w+'
          }
        )
    } catch (e) {}
  })

  app.listen(port, host)
  ready({
    message: `AegiCloud Server listening on http://${host}:${port}`,
    badge: true
  })
})()
