import { parentInvoices } from "../../../lib/redis";

export default async function handler(req, res) {
    const q = req.query.formattedDate;
    const invoices = await monthlySnapshot(q);
    res.status(200).json({sessions});
}