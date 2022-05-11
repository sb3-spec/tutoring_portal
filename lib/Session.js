
function Session({session, idx}) {
    session.length = Number(session.length)

    session.date = new Date(session.date)

    return (
        <div className={`session__outer`}>
            <div className="session-component">{session.parent}</div>
            <div className="session-component">{session.date.getMonth() + 1} - {session.date.getDate()} - {session.date.getFullYear()}</div> 
            <div className="session-component">{session.length}</div>
            {/* <div className="session-component">{session.Notes}</div> */}
        </div>
    )
}

export default Session