import React ,{ Component } from "react";
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import ContactDataCSS from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid:false,
                touched:false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid:false,
                touched:false
            },

            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                isValid:false,
                touched:false
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid:false,
                touched:false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid:false,
                touched:false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                isValid: true
                
            }          
        },

        formIsValid:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        
        for(let formElmId in this.state.orderForm){
            formData[formElmId] = this.state.orderForm[formElmId].value;
        }

        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData : formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
        
    }

    checkValidity(value, rules){
        let isValid=true;

        if(!rules)
        {
            return true;
        }
        if(rules.required && isValid){
            isValid = value.trim() !=='';
        }

        if(rules.minLength && isValid){
            isValid = value.length >= rules.minLength;
        }

        if(rules.maxLength && isValid){
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]}

        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid});
    }

    render(){ 
        
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
        <form onSubmit={this.orderHandler}>
        
            {formElementArray.map(formElement => (
                <Input 
                    key = {formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.isValid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            
            <Button 
                btnType="Success" 
                disabled = {!this.state.formIsValid}>ORDER</Button>
        </form>
        );

        if(this.props.loading)
        {
            form = <Spinner />
        }

        return (
        <div className = {ContactDataCSS.ContactData} >
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>  )
    }

}

const mapToStateProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData,token))
    }
    
}

export default connect(mapToStateProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));