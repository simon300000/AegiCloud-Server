import ws from 'ws'

const coreInit = function() {
  const server = new ws.Server({
    host: '0.0.0.0',
    port: 2121
  })

  server.on('connection', (client) => {
    // Connect

    client.on('close', () => {
      // Client Close
    })

    client.on('error', (err) => {
      // Error
    })

    client.on('message', (data) => {
      // Data
    })
  })

  server.on('error', (err) => {
    // Error
  })

  server.on('headers', (data) => {
    // Return
  })
}

module.exports(coreInit)
