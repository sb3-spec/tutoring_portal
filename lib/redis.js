import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        console.log('Trying to connect...')
        await client.open(process.env.REDIS_URL);
        console.log('Connection Successful')
    }
}

class TutoringSession extends Entity {}

let schema = new Schema(
    TutoringSession,
    {
        parent: { type: 'string'},
        length: { type: 'number'},
        date: { type: 'string' },
        timestamp: { type: 'number', sortable: true},
        notes: { type: 'string'},
    },
    {
        dataStructure: 'JSON'
    }
);


export async function createSession(data) {
    await connect();
    
    const repository = client.fetchRepository(schema)
    
    const tutoringSession = repository.createEntity(data);
    
    
    const id = await repository.save(tutoringSession);

    return id;
}

export async function createIndex(data) {
    await connect();

    
    const repository = new Repository(schema, client);
    await repository.createIndex();
}

export async function searchSessions(q) {
    await connect();
    const repository = new Repository(schema, client)


    const sessions = await repository.search()
        .where('parent').eq(q)
        .or('notes').matches(q)
        .return.all();
    return sessions;
}

export async function monthlySnapshot(q) {
    await connect();

    const {floor, ceiling} = getMonthlyRange(q)

    const sessions = await getCustomRange(floor, ceiling)
    
    return sessions;
}

export async function allSessions() {
    await connect();
    
    return new Repository(schema, client).search().all()
}

function getMonthlyRange(month) {
    const currYear = new Date().getFullYear()
    const floor = new Date(`${currYear}-${month}-01`)
    const ceiling = new Date(`${currYear}-${month}-${floor.getDate()}`)
    return {floor, ceiling}
}

async function getCustomRange(floor, ceiling) {
    const repository = new Repository(schema, client);

    let hits = []

    let all = await repository.search().all()

    for (const session of all) {
        let date = new Date(session.date)
        let crit1 = date.getTime() >= floor.getTime()
        let crit2 = date.getTime() <= ceiling.getTime()

        if (crit1 && crit2) {
            hits.push(session)
        }
        console.log(`Meets snapshot criteria? ${crit1 && crit2 ? 'yes' : 'no'}`)
    }

    return hits
}

