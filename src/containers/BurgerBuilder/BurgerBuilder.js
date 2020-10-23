import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/auxs/Auxs'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{

    // constructor(props){
    //     super(propps);
    //     this.state={ }
    // }

    state={
        purchasing: false

    }

    componentDidMount(){

        // axios.get('https://react-my-burger-c2ab2.firebaseio.com/ingredients.jsoS')
        //     .then(response => {
 
        //         this.setState({ingredients:response.data})
        //     })
        //     .catch(error => {

        //         this.setState({error:true})
        //     });

        this.props.onInitIngredient();
    }


    updatePurchase(ingredients){
    
        const sum = Object.keys(ingredients)
                    .map(igkey => {
                        return ingredients[igkey];
                    })
                    .reduce((sum,el) => {
                        return sum+el;
                    },0);
        
        return sum>0;
    }

    //******** Without Redux ***** */

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredient})
    //     this.updatePurchase(updatedIngredient);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <=0)
    //     {
    //         return;
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredient});
    //     this.updatePurchase(updatedIngredient);
    // }

    purchaseHandler = ()=>{
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true});
        }
        else {
            this.props.onsetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{

        // ***** Without Redux *******
        // const queryParams = [];

        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        //     //queryParams.push(i+'='+this.state.ingredients[i]);
        // }

        // queryParams.push('price=' + this.props.totalPrice)
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?'+queryString
        
        // });

        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }


    render(){
        const disabledInfo={
            ...this.props.ings
        }

        for (const key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummary = null;
        
        let burger = this.props.error ? <p> ingredients can't be loaded.. Somrthing Went Wrong</p> : <Spinner/>;
        

        if(this.props.ings !== null)
        {
             burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientsAdded = {this.props.onIngredientAdded} 
                    ingredientsRemoved = {this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchase(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}/>
                </Aux>
                  );

              orderSummary=  <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}/>;
        
        }

        // if(this.state.loading)
        // {
        //     orderSummary = <Spinner/>;
        // }
        
        return (
            <Aux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
            
        ); 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onsetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));  