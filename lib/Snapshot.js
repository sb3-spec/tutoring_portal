import {useState, useEffect} from 'react'
import Session from './Session'
import {api} from '../axios/api'
import {MonthlyView} from './MonthlyView'
import {getParentInvoices} from '../utility_functions'
import Alert from './Alert'

function Snapshot({date, setTitle}) {
    const [didLookup, setDidLookup] = useState(false);
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState(0);
    
    const [hits, setHits] = useState([]);
    const [parentInvoices, setParentInvoices] = useState({});
    const clients = ['Tasheena', 'Simrin', 'Natalya', 'Will', 'Irina']

    let exampleData = [
        {
            parent: "Andrew",
            data: new Date()
        }

    ]
    

    useEffect(() => {
        let mounted = true;

        const fetchSnapshot = async () => {
            const currMonth = date.getMonth() + 1
            const formattedDate = formatMonth(currMonth)
            const params = new URLSearchParams({ formattedDate })

            let temp = `/api/search/snapshot?` + params

            api.get(temp).then((response) => {
                setHits(response.data['sessions'].reverse())
                console.log(response.data['sessions'])
                setParentInvoices(getParentInvoices(response.data['sessions']))
            }).catch((error) => {
                console.log(error)
                setAlert('Unable to fetch data')
                setAlertType(2)
            }).finally(() => {
                setDidLookup(true)
            })
        }
        if (!mounted || didLookup) {return}
        fetchSnapshot()

        return () => {
            mounted = false
        }
    })

    return (
        <>
            <div className="snapshot__outer">
                <ol className="snapshot-list border-radius-upper">
                    <li className="snapshot-item">
                        <div className={`session__outer text-bold`}>
                            <div className="session-component">Parent</div>
                            <div className="session-component">Date mm/dd/yyyy</div> 
                            <div className="session-component">Length (h)</div>
                        </div>
                    </li>
                    {alert !== '' && <Alert alertType={alertType} error={alert} setAlertType={setAlertType} setMessage={setAlert} message={alert}/>}
                    {hits.map((hit, idx) => (

                        idx < 11 ? 
                        <li key={hit.entityId} className={`snapshot-item`}>
                            <Session session={hit} idx={idx}/>
                        </li> : <></>
                    ))}
                </ol>
            </div>
            <MonthlyInvoices invoices={parentInvoices} clients={clients}/>
            <MonthlyView setHits={setHits} setDidLookup={setDidLookup} setParentInvoices={setParentInvoices} setTitle={setTitle}/>
        </>
    )
}

function getTotalOwed(invoices, clients) {
    let total = 0
    clients.forEach((client) => {
        if (invoices[client]) {
            total += invoices[client]
        }
    })
    
    return total
}

export function MonthlyInvoices({invoices, clients}) {
    var total = getTotalOwed(invoices, clients)
    return (
        <div className="invoices">
            <div className="invoices-container">
                <ul>
                    {clients.map((client, idx) => 
                        
                        <li key={idx} className="invoice-item">
                            <div className="client-name-container">
                                <h4 className="client-name">{client}:</h4>
                            </div> 
                            <div>
                                <h4 className="money">${invoices[client] || 0}</h4>
                            </div>
                        </li>
                    )}
                </ul>
                <div className="total_container">
                    <h1 className="total_owed underline">Total</h1><h1 className="money total_owed">${total}</h1>
                </div>
            </div>
        </div>
    )
}

function formatMonth(month) {
    if (month < 10) {
        return `0${month}`
    }
    return month
}

export default Snapshot