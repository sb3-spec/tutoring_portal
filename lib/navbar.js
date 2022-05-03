import React, {useState, useEffect} from 'react'
import Link from 'next/link'

function Navbar({}) {
  const [styles, setStyles] = useState({})

  useEffect(() => {

  })

  return (
    <div className="navbar__outer">
        <nav className="navbar">
            <ul>
                <li className='nav-link' key='analysis' style={{justifyContent: 'flex-end', paddingRight: '70px'}}>
                    <Link href="/hub" passHref>Hub</Link>
                </li>
                <li className='nav-link' key='hub' style={{justifyContent: 'flex-start', paddingLeft: '70px'}}><Link href="/analysis" passHref>Analysis</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar