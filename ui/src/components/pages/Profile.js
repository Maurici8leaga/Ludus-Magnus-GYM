import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';

const Profile = ({ getProfile, profile }) => {


    useEffect(() => {
        getProfile();
        // console.log('Profile --->', profile);
    }, [getProfile]);
    // hay que agregar este "getProfiles" ya que "useEffect" pide que se agregue esta dependencia o que se quite la matriz de la dependencia.
    // console.log('Profile --->', profile);

    // <-- esto permitira que muestre el profile del usuario si solo si hay un "profile o _id de un profile" para evitar que me muestre un profile vacio
    if (!profile || !profile._id) return null;

    const { _id, name, lastname, age, height, weight } = profile;

    return (
        <div className="container">
            
            <h1 className="grande">Perfil</h1>

            <p className="title-small">Aca puedes ver tu informacion actual</p>

            <div className=" ">

                <div className="profile fondo-claro">
                    <div>
                        <img className="img-profile" alt="avatar" src="data:image/jpeg;base64,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" />
                    </div>

                    <div>
                        <h2>{name} {lastname}</h2>
                        <ul>
                            <li> <i class="far fa-clock"></i> Edad</li>
                            <li > <i class="fas fa-ruler-vertical"></i> Altura</li>
                            <li> <i class="fas fa-balance-scale"></i> Peso</li>
                        </ul>
                        <button className="boton -positive"> Editar Perfil <i class="fas fa-pencil-alt"></i> </button>
                    </div>


                    <ul>
                        <li> {age} Años</li>
                        <li> {height} m</li>
                        <li> {weight} kg</li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    ProfileUser: PropTypes.object
    // ProfileUser es mi objeto en donde tengo contenido la info del user, IMPORTANTE!!! COMPRENDER ESTO!!!
    // NO se le coloca "isRequired" ya que la data no se obtine en el primer momento, tiene que buscarse en el servidor y luego traerla, se le quita el "isRequired" para no causar problemas
}

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // se coloca "profile" para el nombre del prop de manera de no tener REDUDANCIA con el OBJETO que esta anidado dentro de mi reducer, para diferenciarlo se llaman distinto
});

export default connect(mapStateToProps, { getProfile })(Profile);