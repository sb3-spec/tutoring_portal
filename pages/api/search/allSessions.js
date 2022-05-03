import {allSessions} from '../../../lib/redis'

export default async function handler(req, res) {
    const sessions = await allSessions()

    res.status(200).send({sessions})
} 