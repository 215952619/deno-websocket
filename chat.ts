import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std@0.85.0/ws/mod.ts'
import { v4 } from 'https://deno.land/std@0.85.0/uuid/mod.ts'

const users = new Map<string, WebSocket>()

function broadcast(message: string, senderId?: string): void {
    if (!message) return 
    for (const user of users.values()) {
        user.send(senderId ? `[${senderId}] : ${message}` : message)
    }
}

export async function chat(ws:WebSocket) : Promise<void> {
    const userId = v4.generate()

    users.set(userId, ws)
    broadcast(`> User with the id ${userId} is connected`)

    for await (const event of ws) {
        const message = typeof event === 'string' ? event : ''

        broadcast(message, userId)

        if (!message && isWebSocketCloseEvent(event)) {
            users.delete(userId)

            broadcast(`> User with the id ${userId} is disconnected`)

            break
        }
    }
}
