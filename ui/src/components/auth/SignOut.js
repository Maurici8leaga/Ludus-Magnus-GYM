// SE DEJA ESTE COMPONENTE DESABILITADO YA QUE SE EMIGRO ESTE COMPONENT AL HEADER HACIENDOLO MUCHO MAS DRY, EN EL CASO DE NECESITAR UN MENSAJE DESPUES DEL LOGOUT SE PUEDE USAR ESTE COMPONENT
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as actions from '../../actions';

// class SignOut extends Component{

//     componentDidMount(){
//         this.props.history.push("/");
//         this.props.signOut();
//         console.log(this.props);
//     }

//     render(){
//         return null;
//     }
// }

// export default connect(null, actions) (SignOut);