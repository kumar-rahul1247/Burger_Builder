import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import AuthCSS from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your EMail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid:false,
                touched:false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                isValid:false,
                touched:false
            },
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
        {
            this.props.onsetAuthRedirectPath();
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value:event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    }


    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }


    render () {
        
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.isValid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
            />

            
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage =null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
      
        if(this.props.isAuthenticated)
        {
           
            authRedirect = <Redirect to= {this.props.authRedirectPath} />
        }

        return (
            <div className={AuthCSS.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType = "Success" > Submit</Button>
                </form>

                <Button 
                    clicked= {this.switchAuthModeHandler}
                    btnType = "Danger" > Switch To {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onsetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);