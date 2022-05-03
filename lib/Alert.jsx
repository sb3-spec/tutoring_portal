import {useEffect, useState} from 'react'
import {animated, useTransition} from 'react-spring'


function Alert({alertType, message, setAlertType, setMessage}) {
    const [isAlive, setIsAlive] = useState(true)
    const alertStyles = [
        '',
        'alert-success', 
        'alert-danger'
    ]

    const transition = useTransition(isAlive, {
        from: {opacity: 1},
        leave: {opacity: 0},
    })

    useEffect(() =>{
        const timeId = setTimeout(() => {
            setMessage('')
            setAlertType(0)
            setIsAlive(false)
        }, 4000)

        return () => {
            clearTimeout(timeId)
        }
    }, [setAlertType, setMessage])

    

    return (
        <div>
            {transition((style, item) => (item) ? 
            <animated.div style={style}>
                <div className={`error-container ${alertStyles[alertType]}`}>
                    {message}
                </div>
            </animated.div>
            : '')}
             
        </div>
  )
}

export default Alert