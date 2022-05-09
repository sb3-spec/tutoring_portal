import {useState} from 'react'
import { api } from '../axios/api'
import {getParentInvoices} from '../utility_functions'

export function MonthlyView({setHits, setDidLookup, setTitle, setParentInvoices}) {
  const [error, setError] = useState('')
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  const onSubmit = (event) => {
      var formattedDate = event.target.value
      setTitle(`${months[formattedDate]}`)

      const params = new URLSearchParams({ formattedDate })

      api.get(`/api/search/snapshot?` + params).then((response) => {
        setHits(response.data['sessions'].reverse())
        setDidLookup(true)
        setParentInvoices(getParentInvoices(response.data['sessions']))
        setAlertType(1)
      }).catch((error) => {
        setError('Unable to fetch data')
      })
  }


  return (
    <div className="monthly-search__outer">
        <select default='August' onChange={onSubmit}>
            <option value='01'>January</option>
            <option value='02'>February</option>
            <option value='03'>March</option>
            <option value='04'>April</option>
            <option value='05'>May</option>
            <option value='06'>June</option>
            <option value='07'>July</option>
            <option value='08'>August</option>
            <option value='09'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
        </select>
    </div>
  )
}

export default MonthlyView