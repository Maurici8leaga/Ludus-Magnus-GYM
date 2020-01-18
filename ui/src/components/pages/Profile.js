import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfile} from '../../actions/profile';

const Profile = ({getProfile, profile}) => {


    useEffect(() => {
        getProfile();
        // console.log('Profile --->', profile);
    }, []);
    
    console.log('Profile --->', profile);

    // <-- esto permitira que muestre el profile del usuario si solo si hay un "profile o _id de un profile" para evitar que me muestre un profile vacio
    if (!profile || !profile._id) return null;

    const { _id, name, lastname, age, height, weight } = profile;  
    
    return(
            <div className="ui centered grid">
                <div className="ui items">
                    <div className="item">

                        <div className="image">
                            <img src="http://alerta.mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"/>>
                        </div>

                        <table className="ui single line table">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Altura</th>
                                <th>Peso</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{lastname}</td>
                                    <td>{age}</td>
                                    <td>{height}</td>
                                    <td>{weight}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

Profile.propTypes = {
    getProfile:PropTypes.func.isRequired,
    ProfileUser: PropTypes.object
    // ProfileUser es mi objeto en donde tengo contenido la info del user, IMPORTANTE!!! COMPRENDER ESTO!!!
    // NO se le coloca "isRequired" ya que la data no se obtine en el primer momento, tiene que buscarse en el servidor y luego traerla, se le quita el "isRequired" para no causar problemas
}

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // se coloca "profile" para el nombre del prop de manera de no tener REDUDANCIA con el OBJETO que esta anidado dentro de mi reducer, para diferenciarlo se llaman distinto
});

export default connect (mapStateToProps, {getProfile})(Profile);