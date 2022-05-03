import { searchSessions } from '../../../lib/redis';

export default async function handler(req, res) {
    const q = req.query.q;
    const sessions = await searchSessions(q)
    res.status(200).json({ sessions })
}