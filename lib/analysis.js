import {useState} from 'react'
import Snapshot from "./Snapshot"
import Link from 'next/link'

export default function AnalysisHub() {
    const date = new Date();
    const [title, setTitle] = useState(`Your ${date.toLocaleString('default', {month: 'long'})} so far`)

    return (
        <div>
            
                <div className="analysis__outer">
                    <h1 className="analysis-title">{title}</h1>
                    <>
                        <div className="analysis-container form__outer" >
                            <Snapshot date={date} setTitle={setTitle}/>
                        </div>
                    </>
                </div>
        </div>
    )
}