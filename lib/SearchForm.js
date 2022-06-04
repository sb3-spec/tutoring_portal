import { useState } from 'react'
import {api} from '../axios/api'


export default function SearchForm() {
    const [hits, setHits] = useState([]);

    const search = async (event) => {
        const q = event.target.value;

        if (q.length > 2) {
            const params = new URLSearchParams({ q })

            api.get(`/api/search/text?` + params).then((response) => {
                setHits(response.data['sessions'])
            })
        }
    }

    return (
        <div className="parent-search__outer">
            <h2>Search by parent</h2>
            <select onChange={search} name="parent">
                <option value="Tasheena">Tasheena</option>
                <option value="Irina">Irina</option>
                <option value="Natalya">Natalya</option>
                <option value="Simrin">Simrin</option>
                <option value="Will">Will</option>
            </select>

            <ul>
                
                {hits.map((hit) => (
                    <li key={hit.entityId}>
                        {hit.parent} {hit.date} {hit.length} {hit.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
}