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
    const date = new Date()
    const floor = new Date(date.getFullYear(), month, 1)
    floor.setMonth(floor.getMonth() - 1)
    const ceiling = new Date(date.getFullYear(), floor.getMonth() + 1, 0)

    console.log(floor.toDateString(), ceiling.toDateString())
    return {floor, ceiling}
}

async function getCustomRange(floor, ceiling) {
    const repository = new Repository(schema, client);

    const sessions = await repository.search().
    where('timestamp').is.greaterThanOrEqualTo(floor.getTime() / 1000).
    and('timestamp').is.lessThanOrEqualTo(ceiling.getTime() / 1000).sortBy('timestamp').all()

    return sessions
}

