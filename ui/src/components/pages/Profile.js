import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { uploadAvatar } from '../../actions/avatar';
import Alert from '../extras/Alert';

const Profile = ({ getProfile, uploadAvatar, profile }) => {
    // getProfile y uploadAvatar son actions que estan siendo pasados como props aqui porque estan siendo conectados por conect!!

    useEffect(() => {
        getProfile();
    }, [getProfile]);
    // hay que agregar este "getProfiles" ya que "useEffect" pide que se agregue esta dependencia o que se quite la matriz de la dependencia.

    const formData = new FormData();
    // formData es donde se va almacenar el file y es el que va a ser enviado al actions

    const onChange = (e) => {
        if (e.target && e.target.files[0]) {
            // el resultados de estos es que si entre ellos es igual a 1 se ejecuta lo siguiente
            formData.append('picture-profile', e.target.files[0]);
            // append el inserta un grupo de objects , en este caso el picture , si no existe ninguno lo crea
            // el 1er element es el key o name del value o file en este caso 'picture-profile', por eso debe ser llamado tal como se puso en el back
            // 2do element es el value o el archivo a almacenar
            buttonSubmit(formData);
            // se coloca el buttonSubmit aca para que apenas sea seleccionada la foto se envie en un solo boton
        }
    }

    const buttonSubmit = () => {
        uploadAvatar(formData);
    }

    
    // <-- esto permitira que muestre el profile del usuario si solo si hay un "profile o _id de un profile" para evitar que me muestre un profile vacio
    if (!profile || !profile._id) return null;
    
    const { _id, name, lastname, age, height, weight, avatar } = profile;
    
    const avatarImage = () => {
        // esta funcion que es condicional tiene que ir afuera del component ya que cuando los usuarios no tiene avatar y entran al profile
        // ocurre un error ya que retorna undefined, entonce se crea este condicional para que cuando no tenga avatar no colpase pag y pueda carga subir su picture
        const {avatar} = profile;

        // Avatar default
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        // colocamos let en vez de const ya que let tiene mayor scope que const este puede ser llamado mas adentro de otros elementos

        // Avatar picture custom
        if(typeof avatar === 'object' ) {
            // typeof es un operator que indica dentro de un string lo que es el operador en este caso 'avatar' = 'object'. Entonces el condicional se indica si es exactamente eso retorna lo siguiente
              avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return(
                <img className="img-profile" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="img-profile" alt="avatar" src={avatarUrl} />
        );

    }

    return (
        <div className="container-Profile-background">
            <Alert />

            <div className="container-Profile">

                <div className="Title-container-Profile">
                    <h1 className="grande">Perfil</h1>
                    <p className="title-small">Aca puedes ver tu informacion actual</p>
                </div>

                <div>

                    <div className="profile">
                        <div>
                                {avatarImage()}
                                {/* hay que hacer el llamado de la funcion con () porque si no da error*/}
                            <div>
                                <>
                                    <input type='file' name='fileInput' onChange={onChange} required />
                                </>

                            </div>
                        </div>

                        <div>
                            <h2>{name} {lastname}</h2>
                            <ul>
                                <li> <i className="far fa-clock"></i> Edad</li>
                                <li > <i className="fas fa-ruler-vertical"></i> Altura</li>
                                <li> <i className="fas fa-balance-scale"></i> Peso</li>
                            </ul>
                            <button className="boton -positive"> Editar Perfil <i className="fas fa-pencil-alt"></i> </button>
                        </div>


                        <ul>
                            <li> {age} Años</li>
                            <li> {height} m</li>
                            <li> {weight} kg</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func,
    ProfileUser: PropTypes.object
    // ProfileUser es mi objeto en donde tengo contenido la info del user, IMPORTANTE!!! COMPRENDER ESTO!!!
    // NO se le coloca "isRequired" ya que la data no se obtine en el primer momento, tiene que buscarse en el servidor y luego traerla, se le quita el "isRequired" para no causar problemas
}

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // se coloca "profile" para el nombre del prop de manera de no tener REDUDANCIA con el OBJETO que esta anidado dentro de mi reducer, para diferenciarlo se llaman distinto
});

export default connect(mapStateToProps, { getProfile, uploadAvatar })(Profile);