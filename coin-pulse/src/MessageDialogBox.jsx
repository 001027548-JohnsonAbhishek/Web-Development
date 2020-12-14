import React from 'react';
import {useState} from 'react';
import './public/message-dialog-box.css'; 


export default function MessageDialogBox({errorMessage,err}) {
    
    let [isOpen,setIsOpen] = useState(true);

    if(!errorMessage)
        return null;

    let content; 
    
    const hideDialog = function(e){
        
        setIsOpen(false);
        err(null);
        content = null;

    }
    
    if(isOpen){
        content = <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={(e)=>hideDialog(e)}>x</span>
                    <p>{errorMessage}</p>
                </div>
            </div>;
    }

        
    return (
        <div>
            {content}
        </div>
    )
}
