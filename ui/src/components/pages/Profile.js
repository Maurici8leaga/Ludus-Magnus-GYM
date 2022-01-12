import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { uploadAvatar } from '../../actions/avatar';
import { Link } from 'react-router-dom';
import Alert from '../extras/Alert';
import EditProfile from './microComponent/modal/EditProfile';
import { loadToTop } from '../extras/helpers';

const Profile = ({ getProfile, uploadAvatar, profile }) => {
    // getProfile y uploadAvatar son actions que estan siendo pasados como props aqui porque estan siendo conectados por conect!!


    const [open, setOpen] = useState(false);
    // este state es solo para abrir y cerrar el modal
    // los state deben estar en minuscula

    useEffect(() => {
        getProfile();
        loadToTop();
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
        const { avatar } = profile;

        // Avatar default
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        // colocamos let en vez de const ya que let tiene mayor scope que const este puede ser llamado mas adentro de otros elementos

        // Avatar picture custom
        if (typeof avatar === 'object') {
            // typeof es un operator que indica dentro de un string lo que es el operador en este caso 'avatar' = 'object'. Entonces el condicional se indica si es exactamente eso retorna lo siguiente
            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="image" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="image" alt="avatar" src={avatarUrl} />
        );

    }

    return (
        <div className="container-Profile-background">
            <div className="container-Profile-background-blur">
                <Alert/>

                <div className="Title-container-Profile">
                    <h1 className="highlight-title texto-secundary">Perfil</h1>
                    <h3 className="highlight-title2-ultraCenter">Esta es tu informacion actual</h3>
                </div>

                <div className="frame">
                    <div className="center">

                        <div className="profile">
                            <div className="image">
                                {avatarImage()}
                            </div>

                            <div className="name">{name}  {lastname}</div>

                            <div className="actions">
                                <label className="btn-small">
                                    {/* metemos el input dentro de un label para atraves del label el input pueda tomar el stye que queremos */}
                                    <input type="file" name='fileButton' onChange={onChange} required></input>
                                    <i className="fas fa-camera"></i>
                                </label>
                                {/* <Link to="/profile/edit" className="btn"> Editar Perfil</Link> */}
                                <div className="btn">

                                    <button onClick={() => setOpen(true)}> Editar Profile</button>
                                    {open ? (
                                        <EditProfile closeUp={() => setOpen(false)} profile={profile} />
                                        // se le pasa como prop esta funcion "closeUp" y "profile" como prop tambien para que pueda tener acceso a los datos del user en el child component y la funcion para que pueda cerrar el modal
                                    ) : null}
                                    {/* se le pone esta conditional para que solo se abra el modal cuando se desee y NO DE ERROR  */}
                                </div>
                            </div>
                        </div>

                        <div className="stats">
                            <div className="box">
                                <span className="value">{age} Años</span>
                                <span className="value"> <i className="fas fa-clock"></i> Edad </span>
                            </div>

                            <div className="box">
                                <span className="value">{height} m</span>
                                <span className="value"> <i className="fas fa-ruler-vertical"> Altura</i> </span>
                            </div>

                            <div className="box">
                                <span className="value">{weight} Kg</span>
                                <span className="value"> <i className="fas fa-balance-scale"> Peso </i> </span>
                            </div>

                        </div>

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