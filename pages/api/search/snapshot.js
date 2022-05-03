import { monthlySnapshot } from "../../../lib/redis";

export default async function handler(req, res) {
    const q = req.query.formattedDate;
    const sessions = await monthlySnapshot(q);
    res.status(200).json({sessions});
}
