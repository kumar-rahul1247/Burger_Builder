import React from 'react';
import BurgerCSS from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger =(props) => {
    
    let transformationIngredients= Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
              return  <BurgerIngredient key={igKey+i} type={igKey}/>
            })
        }).reduce((arr,el)=>{return arr.concat(el)},[]);

        if(transformationIngredients.length===0)
        {
            transformationIngredients=<p>Please Add Your Choosy .. :)</p>
        }
    
    return (
        <div className={BurgerCSS.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformationIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;