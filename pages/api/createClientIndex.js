import { createIndexClient } from "../../lib/redis";

export default async function handler(req, res) {
    await createIndexClient();
    res.status(200).send('ok')
}