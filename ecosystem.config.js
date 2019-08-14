module.exports = {
  apps: [
    {
      name: 'aegicloud',
      script: 'server/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
