import fs from 'fs'
import ws from 'ws'
import schedule from 'node-schedule'

export default async function() {
  global.server = new ws.Server({
    host: '0.0.0.0',
    port: 2121
  })

  try {
    const preData = JSON.parse(
      await fs.promises.readFile(
        '/aegicloud/projects/' + global.data.conf.filename,
        'w+'
      )
    )
    global.data = {
      lines: preData.lines.map(),
      users: preData.users.map()
    }
  } catch (error) {
    global.data = {}
    global.data.lines = new Map()
    global.data.users = new Map()
  }

  global.lineChanged = []
  global.userChanged = []

  global.liveSchedule = schedule.scheduleJob('*/3 * * * * *', async () => {
    await global.server.send(
      JSON.stringify({
        lines: global.lineChanged,
        users: global.userChanged
      })
    )
    global.lineChanged = []
    global.userChanged = []
  })

  global.server.on('connection', (client) => {
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
}
