import ws from 'ws'
import error from 'consola'

const coreInit = function() {
  const server = new ws.Server({
    host: '0.0.0.0',
    port: 2121
  })

  global.data = {}
  global.data.lines = []
  global.data.users = []

  server.on('connection', (client) => {
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

  server.on('error', (err) => {
    error('Err')
    console.log(err)
  })

  server.on('headers', (data) => {
    // Return
  })
}

module.exports(coreInit)
