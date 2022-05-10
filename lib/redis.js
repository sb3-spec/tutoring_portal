import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        console.log('Trying to connect...')
        await client.open(process.env.REDIS_URL);
    }
}

class TutoringSession extends Entity {}
class TutoringClient extends Entity {}

let schemaClient = new Schema(
    TutoringClient,
    {
        name: { type: 'string', textSearch: true},
        rate: { type: 'number'},
        email: { type: 'string', textSearch: true} 
    },
    {
        dataStructure: 'JSON'
    }
);

let schema = new Schema(
    TutoringSession,
    {
        parent: { type: 'string', textSearch: true},
        length: { type: 'number' },
        date: { type: 'date' },
        timestamp: { type: 'number', sortable: true},
        notes: { type: 'text', textSearch: true},
    },
    {
        dataStructure: 'JSON'
    }
);

export async function createClient(data) {
    await connect();

    const repository = client.fetchRepository(schemaClient);

    const tutoringClient = repository.createEntity(data);

    const id = await repository.save(tutoringClient);

    return id;
}

export async function createIndexClient() {
    await connect();

    const repository = client.fetchRepository(schemaClient);

    await repository.createIndex()
}

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

    console.log()

    const sessions = await repository.search()
        .where('date').is.greaterThanOrEqualTo(floor).and('date').is.lessThan(ceiling).sortBy('timestamp').all()
    
    return sessions
}
