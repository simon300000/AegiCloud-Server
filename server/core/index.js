const fs = require('fs')
const consola = require('consola')
const ws = require('ws')
const schedule = require('node-schedule')

module.exports = async function() {
  global.server = new ws.Server({
    host: '0.0.0.0',
    port: 2121
  })

  global.clients = []

  try {
    const preData = JSON.parse(
      await fs.promises.readFile(
        '/aegicloud/projects/' + global.data.conf.filename,
        {
          flag: 'r+'
        }
      )
    )
    global.data = {
      lines: preData.lines.map(),
      users: preData.users.map(),
      conf: {
        filename: global.data.conf.filename
      }
    }
  } catch (error) {
    global.data = {
      lines: new Map(),
      users: new Map(),
      conf: {
        filename: global.data.conf.filename
      }
    }
    global.data.lines = new Map()
    global.data.users = new Map()
  }

  global.lineChanged = []
  global.userChanged = []

  global.liveSchedule = schedule.scheduleJob('*/3 * * * * *', () => {
    if (global.lineChanged === [] && global.userChanged === []) return
    for (const cli of global.clients) {
      cli.send(
        JSON.stringify({
          lines: global.lineChanged,
          users: global.userChanged
        })
      )
    }
    global.lineChanged = []
    global.userChanged = []
  })

  global.server.on('connection', (client) => {
    global.clients.push(client)

    client.on('error', (err) => {
      consola.error('Error from WS')
      console.log(err)
    })

    client.on('message', (data) => {
      const preData = JSON.parse(data)
      for (const d of preData) {
        if (d.data) {
          global.lineChanged.push(d)
          global.data.lines.set(d.uid, d)
        } else {
          global.userChanged.push(d)
          global.data.users.set(d.user, d)
        }
      }
    })
  })

  global.server.on('error', (err) => {
    consola.error('Error from WS')
    console.log(err)
  })
}
