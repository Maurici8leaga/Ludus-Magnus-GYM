import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component{

    componentDidMount(){
        this.props.singOut();
    }

    render(){
        return(
            <div>Bye</div>
        );
    }
}

export default connect(null, actions) (SignOut);