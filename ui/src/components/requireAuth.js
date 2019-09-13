import React, {Component} from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    // esta es una forma de crear nuestro HOC en el que va a aplicarse en nuestro component que queramos

    class ComposedComponent extends Component{
    // este "ComposedComponent" va ser como "CommentBox" solo imaginarlo, puede ser este o otro componente en el que queramos que se aplique, este es el que se envolvera nuestra jerarquia de components

        // our component just got rendered
        componentDidMount(){
            // esto hara que el usuario si no esta logged no lo dejara entrar
            this.shouldNavigateAway();
        }
    
        // our component jus got updated
        componentDidUpdate(){
            // y esto se ejecutara lo mismo solo cada vez que se actualice el component
            // en este caso cuando el usuario estando en el commentbOX logged y le de "Sing Out" este lo saque al inicio de la pagina
            this.shouldNavigateAway();    
        }
    
        shouldNavigateAway(){
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }    

        render(){
                                // este "{...this.props}" su funcion es tomar cualquier prop que recibe y pasarlo directamente al component child o en su defecto en el que es llamado
            return( <ChildComponent {...this.props}/>);
                    // este "childComponent" es el argumento que se paso a la funcion su vez este de una mas entendible va a ser o "CommentBox" o el component que se vaya a utilizar
        }
    }

    function mapStateToprops (state){
        return {auth: state.auth.isSignedIn };
    }
    
    return connect (mapStateToprops) (ComposedComponent);
    // esto es conocido como el "Scaffold" que se agrega en nuestro HOC
}