import {useState} from 'react'
export default function componetenteGlobal({children}){
    const [estadoG, setEstadoG] = useState('')
    return(
        <div>
            
            {children}
        </div>

    )
} 