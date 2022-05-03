import React from 'react'
import SessionForm from '/lib/SessionForm'
import AnalysisHub from '/lib/analysis'
import Navbar from '/lib/navbar'

function Home() {
  return (
    <div className="hub__outer">   
        <div className="root__outer">    
            <SessionForm />
            <AnalysisHub />
        </div>
    </div>
  )
}

export default Home;
