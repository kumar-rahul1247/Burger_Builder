import React, {Component} from 'react';

import ModalCSS from './Modal.module.css';
import Aux from '../../../hoc/auxs/Auxs';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(aageProps, aageState)
    {     
        return aageProps.show !== this.props.show || aageProps.children !== this.props.children;
    }

    
    render(){

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={ModalCSS.Modal}
                style={{
                    transform:this.props.show?'translate(0)':'translateY(-100%)',
                    opacity:this.props.show ? '1':'0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );

    }

}
export default Modal;