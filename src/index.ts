import 'dotenv/config'
import http from 'http'

import app from './app'

const PORT = process.env.PORT || 5001

const server = http.createServer(app)

server.listen(PORT, () => {
    console.clear()
    console.log(`Port: ${PORT}`)
})