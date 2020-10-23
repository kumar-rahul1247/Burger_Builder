import React, { Component } from 'react';
import axios from '../../axios-orders';
import  { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount(){
  
        // **** Without Redux ****
        // axios.get('/orders.json')
        //     .then(res => {
        //         console.log(res);
        //         const fetchedOrders = [];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id:key});
        //         }

        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });

        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render( ) {

        let orderFetch = <Spinner/>;
        if(!this.props.loading)
        {
            orderFetch = this.props.orders.map(order => (
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
            ));
        }

        return (
            <div>
               {orderFetch}
            </div>
        );
    }
}

const mapToStateProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(WithErrorHandler(Orders,axios)); 