import Snapshot from "./Snapshot"
import Link from 'next/link'

export default function AnalysisHub() {
    const date = new Date();

    return (
        <div>
            
                <div className="analysis__outer">
                    <h1 className="analysis-title">{`Your ${date.toLocaleString('default', {month: 'long'})} so far`}</h1>
                    <Link href='/analysis' passHref>
                        <div className="analysis-container form__outer" >
                            <Snapshot date={date}/>
                        </div>
                    </Link>
                </div>
        </div>
    )
}