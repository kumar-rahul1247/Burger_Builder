import React, {Component} from 'react';
import Aux from '../../../hoc/auxs/Auxs';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients) 
        .map((igKey) => {
        return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A choosy deligious burger ingredient :)</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Ready For Boom Boom CheckOut :-)</p>
                <p>Continue OR Cancel </p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    } 
}


export default OrderSummary;