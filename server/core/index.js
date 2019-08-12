import fs from 'fs'
import ws from 'ws'
import error from 'consola'

export default async function() {
  global.server = new ws.Server({
    host: '0.0.0.0',
    port: 2121
  })

  try {
    global.data = JSON.parse(
      await fs.promises.readFile(
        '/aegicloud/projects/' + global.data.conf.filename,
        'w+'
      )
    )
  } catch (error) {
    global.data = {}
    global.data.lines = []
    global.data.users = []
  }

  global.server.on('connection', (client) => {
    // Connect

    client.on('close', () => {
      // Client Close
    })

    client.on('error', (err) => {
      error('Err')
      console.log(err)
    })

    client.on('message', (data) => {
      // Data
    })
  })

  global.server.on('error', (err) => {
    error('Err')
    console.log(err)
  })

  global.server.on('headers', (data) => {
    // Return
  })
}
