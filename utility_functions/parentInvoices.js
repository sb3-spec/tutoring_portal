export function getParentInvoices(sessions) {
    const parentRates = {
        'Will': 15,
        'Natalya': 35,
        'Simrin': 40,
        'Irina': 35,
        'Tasheena': 35
    }
    let clients = {}

    sessions.map((session, i) => {
        if (clients[session.parent] === undefined) {
            clients[session.parent] = session.length * parentRates[session.parent]
        } else {
            clients[session.parent] = clients[session.parent] + session.length * parentRates[session.parent]
        }
    })

    return clients;
}