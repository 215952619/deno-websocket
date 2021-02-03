import { listenAndServe } from 'https://deno.land/std@0.85.0/http/server.ts'
import { acceptWebSocket, acceptable } from 'https://deno.land/std@0.85.0/ws/mod.ts'
import {chat} from './chat.ts'

listenAndServe({ port: 3000 }, async req => {
    if (req.method === 'GET' && req.url === '/') {
        req.respond({
            status: 200,
            headers: new Headers({
                'content-type': 'text/html',
            }),
            body: await Deno.open('./client.html')
        })
    }

    if (req.method === 'GET' && req.url === '/ws') {
        if (acceptable(req)) {
            acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers,
            }).then(chat)
        }
    }
})

console.log('Server running on localhost:3000')
