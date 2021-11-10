import { useState } from 'react'
import Modal from 'react-modal'

export default function useModalMassage(props){
    csont [modalIsOpen,setModalIsOpen]=useState(false)

return(


    <Modal >
        <h1>{props.massage}</h1>
        <button onClick={()=>setModalIsOpen(false)}></button>
        
    </Modal>
)
}