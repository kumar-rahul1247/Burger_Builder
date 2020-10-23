import React from 'react';

import BuildControlCSS from './BuildControl.module.css';

const buildControl = (props) => {
    return (
    
<div className={BuildControlCSS.BuildControl}>
    <div className={BuildControlCSS.Label}>{props.label}</div>
    <button 
        className={BuildControlCSS.Less} 
        onClick = {props.removed}
        disabled={props.disabled}>Less</button>
    <button className={BuildControlCSS.More} onClick = {props.added}>More</button>
</div>
);

};

export default buildControl;