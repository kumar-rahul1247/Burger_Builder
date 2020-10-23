import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import BuildControlsCSS from './BuildControls.module.css'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
];

const buildControls = (props)=> (
<div className={BuildControlsCSS.BuildControls}>
    <p>Total Price: <strong>₹ {props.price.toFixed(2)}</strong></p>
        {
        controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added= {() => props.ingredientsAdded(ctrl.type)}
                removed= {() => props.ingredientsRemoved(ctrl.type)} 
                disabled={props.disabled[ctrl.type]} />
        ))}

        <button className={BuildControlsCSS.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO CONTINUE'}</button>
</div>

);

export default buildControls;