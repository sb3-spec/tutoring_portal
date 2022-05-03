import {useState} from 'react'
import {api} from '../axios/api'
import Alert from './Alert'

export default function SessionForm() {
    const [message, setMessage] = useState('');
    // 0 is no alert
    // 1 is success
    // 2 is danger
    const [alertType, setAlertType] = useState(0)
 
    const handleSubmit = (event) => {
        event.preventDefault();
        let date = new Date(event.target.date.value)
        let timestamp = date.getTime()/1000;
        const form = new FormData(event.target)
        const formData = Object.fromEntries(form.entries());

        let canSubmit = formData.date !== null && formData.length !== ''

        if (!canSubmit) {
            setAlertType(2)
            setMessage('Enter all required fields')
            return
        }

        formData.length = parseInt(formData.length)
        formData.timestamp = timestamp

        api.post('/api/sessions', JSON.stringify(formData)).then((response) => {
            setAlertType(1)
            setMessage('Session Saved')
        }).catch((error) => {   
            setAlertType(2)
            setMessage('Error saving session')
        })

        const formElement = document.getElementById('session-form')
        formElement.reset()
    }

    return (
        <div className="session-form__outer">
            <h1 className="session-form__title">Enter session data</h1>
            {message !== '' && <Alert alertType={alertType} message={message} setAlertType={setAlertType} setMessage={setMessage}/>}    
            
            <form onSubmit={handleSubmit} id='session-form' className='form__outer'>
                <div className="form-field">
                    <label>Parent</label>
                    <select name="parent">
                        <option value="Tasheena">Tasheena</option>
                        <option value="Irina">Irina</option>
                        <option value="Natalya">Natalya</option>
                        <option value="Simrin">Simrin</option>
                        <option value="Will">Will</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Date</label>
                    <input name="date" type="date"></input>
                </div>
                <div className="form-field">
                    <label>Length</label>
                    <input name="length" type="string"></input>
                </div>
                <div className="form-field">
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes"></textarea>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
