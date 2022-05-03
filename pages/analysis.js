import React, {useState, useEffect} from 'react'
import {MonthlyInvoices} from '../lib/Snapshot';
import Session from '../lib/Session';

function Analysis() {
    const [hits, setHits] = useState([])
    const [didLookup, setDidLookup] = useState([false])
    const [parentInvoices, setParentInvoices] = useState({});
    const clients = ['Tasheena', 'Simrin', 'Natalya', 'Will', 'Irina']

    useEffect(() => {
        let mounted = true;

        const fetchAll = async () => {
            api.get(`/api/sessions/all`).then((response) => {
                setHits(response.data['sessions'].reverse())
                setParentInvoices(getParentInvoices(response.data['sessions']))
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setDidLookup(true)
            })
        }
        if (!mounted || didLookup) {return}
        fetchAll ()

        return () => {mounted = false}
    })

    return (
        <div className="analysis-page__outer">
            <div className="snapshot__outer">
                <ol className="snapshot-list border-radius-upper">
                    <li className="snapshot-item">
                        <div className={`session__outer text-bold`}>
                            <div className="session-component">Parent</div>
                            <div className="session-component">Date mm/dd/yyyy</div> 
                            <div className="session-component">Length (h)</div>
                        </div>
                    </li>
                    {hits.map((hit, idx) => (

                        idx < 11 ? 
                        <li key={hit.entityId} className={`snapshot-item`}>
                            <Session session={hit} idx={idx}/>
                        </li> : <></>
                    ))}
                </ol>
            </div>
            <MonthlyInvoices invoices={parentInvoices} clients={clients}/>
        </div>
    )
}

export default Analysis;