import {useState} from 'react'
import {api} from '../axios/api'
import Alert from './Alert'

export default function SessionForm() {
    const [message, setMessage] = useState('');
    const [sessionLength, setSessionLength] = useState(0);
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
        
        
        if (sessionLength === '1.5') {
            formData.length = parseFloat(sessionLength)
        } else {
            formData.length = parseInt(sessionLength)
        }

        formData.timestamp = timestamp

        let canSubmit = formData.date !== null && formData.length !== undefined

        if (!canSubmit) {
            setAlertType(2)
            setMessage('Enter all required fields')
            return
        }

        api.post('/api/sessions', JSON.stringify(formData)).then(() => {
            setAlertType(1)
            setMessage('Session Saved')
        }).catch(() => {   
            setAlertType(2)
            setMessage('Error saving session')
        })

        const formElement = document.getElementById('session-form')
        formElement.reset()
    }

    const handleLengthChoice = (event) => {
        let length = event.target.value

        if (length === sessionLength) {
            setSessionLength(0)
        } else {
            setSessionLength(length)
            console.log(length)
        }
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
                    <div className="length-field">
                        {console.log(sessionLength === 1, sessionLength)}
                        <button type="button" value={1} className={`length-option ${sessionLength === "1" && 'selected'}`} onClick={handleLengthChoice}>1</button>
                        <button type="button" value={1.5} className={`length-option ${sessionLength === "1.5" && 'selected'}`} onClick={handleLengthChoice}>1.5</button>
                        <button type="button" value={2} className={`length-option ${sessionLength === "2" && 'selected'}`} onClick={handleLengthChoice}>2</button>
                    </div>
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
