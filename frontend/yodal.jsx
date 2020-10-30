import React, {useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';


const Yodal = ({children}) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        const div = document.createElement('div');
        elRef.current = div;
    }
    
    useEffect( () => {
        const yodalRoot = document.getElementById('yodal');
        yodalRoot.appendChild(elRef.current);

        return () => yodalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div id = "Portal" >{children}</div>, elRef.current)

}

export default Yodal;