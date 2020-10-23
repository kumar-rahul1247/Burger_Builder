import React from 'react';
import IngredCSS from './BurgerIngredient.module.css';  
import PropTypes from 'prop-types';

const burgerIngredient =(props) => {

    let ingredient =null;

    switch(props.type)
    {
        case 'bread-bottom':
            ingredient = <div className={IngredCSS.BreadBottom}></div>
            break;

        case 'bread-top':
            ingredient = (
                <div className={IngredCSS.BreadTop}>
                    <div className={IngredCSS.Seeds1}></div>
                    <div className={IngredCSS.Seeds2}></div>
                </div>)
            break;

        case 'meat':
            ingredient = <div className={IngredCSS.Meat}></div>
            break;

        case 'cheese':
            ingredient = <div className={IngredCSS.Cheese}></div>
            break;

        case 'bacon':
            ingredient = <div className={IngredCSS.Bacon}></div>
            break;

        case 'salad':
            ingredient = <div className={IngredCSS.Salad}></div>
            break;
   
        default:
            ingredient=null;
    }

    return ingredient;

};

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default burgerIngredient;