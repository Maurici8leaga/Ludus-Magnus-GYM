import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { uploadAvatar } from '../../actions/avatar';
import { showModal } from '../../actions/modal';
import moment from 'moment';
import Alert from '../extras/Alert';
import EditProfile from './microComponent/modal/EditProfile';
import Spinner from '../extras/Spinner';
import PortalModal from '../pages/microComponent/modal/PortalModal';

const Profile = ({ getProfile, uploadAvatar, profile, showModal }) => {
    // getProfile y uploadAvatar son actions que estan siendo pasados como props aqui porque estan siendo conectados por conect!!

    const { name, lastname, birth, height, weight } = profile;

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
                <img className="img-thumbnail avatar-mini" alt="avatar" src={avatarUrl} />
                // img-thumbnail nos ayuda a colocar la img mas pequeña, y avatar-mini es un class creado propio
            );
        }
        return (
            <img className="img-thumbnail avatar-mini" alt="avatar" src={avatarUrl} />
        );

    }

    // operacion para hacer el calculo de la edad del user antes de ser colocada en el form
    const dateToDay = moment();
    // moment nos da la fecha actual llamandola
    const userBirth = moment(birth);
    // pasamos birth dentro de moment para poderlo meter en el formato de moment y en la operacion ser llamada
    const yearsToDay = dateToDay.diff(userBirth, 'years');
    // de esta forma moment hace la operacion de resta del año actual en que este con los que tiene el user

    return !profile || !profile._id ? <Spinner /> : (
        // <-- esto permitira que muestre el profile del usuario si solo si hay un "profile o _id de un profile" o si no mostrara el spinner mientras se carga
        <div className="screen-Profile">
            <div className="screen-Profile-blur overflow-scroll">
                {/* colocamos el overflow aca para que cuando la pagina sea cargada en un mobile el contenido se pueda ver completo */}
                <div className="container">
                    <Alert />

                    <div className="text-center extra-pt-x10">
                        <h1 className="highlight-title white-letter">Profile</h1>
                        <h3 className="highlight-title2 ">This is your current information</h3>
                    </div>

                    <div className="card mb-3 extra-max-w mx-auto screen-card-profile">
                        {/* card es el class ideal para lo que queremos en este component, usamos mx-auto para que nos centre en el medio el card en la pag */}
                        <div className="row g-0 text-center ">
                            {/* como queremos un card horizontal debemos usar row y mas abajo col  */}

                            <div className="col-md-4 extra-ptYpb-of0-to1">
                                {/* creamos un class extra para que cuando cambie el width este pueda colocar un padding en el elemento */}
                                <div className="avatar-container-profile">
                                    <div className="avatar-mini">
                                        {avatarImage()}
                                    </div>
                                </div>

                                <>
                                    <label className="button-border-line-positive-small">
                                        {/* metemos el input dentro de un label para atraves del label el input pueda tomar el stye que queremos */}
                                        <input type="file" name='fileButton' onChange={onChange} required></input>
                                        <i className="fas fa-camera"></i>
                                    </label>

                                    <>
                                        <button className="button-border-line-positive" onClick={e => showModal()}> Edit profile</button>
                                            <PortalModal title={"Edit your personal information"}>
                                                {/* "Portal" va ser nuestro modal generic y de esta forma se implementa */}
                                                        {/* el prop "title" es el titulo que va a llevar el modal, este debe colocar aqui y no dentro del portal modal */}
                                                <EditProfile  profile={profile}/>
                                                {/* "EditProfile" va a ser el contenido del modal y  por ende sera el children a colocar en el component de portal */}
                                            </PortalModal>
                                            {/* // se le pasa como prop esta funcion "closeUp" y "profile" como prop tambien para que pueda tener acceso a los datos del user en el child component y la funcion para que pueda cerrar el modal */}
                                    </>
                                </>
                            </div>

                            <div className="col-md-4 mt-4">
                                {/* colocamos col-md-4 porque diviremos el card en 3 partes de tamaño 4 sumando 12 en total */}
                                <div className="card-body">
                                    {/* card-body es un class para los titulos en los card */}
                                    <h5 className="card-title extra-ptYpb-of3-to1  positive-letter">{name}  {lastname} </h5>
                                    {/* card-title es el class para los titulos, extra es para cuando cambie el width este cambie el padding top y bottom */}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-flush">
                                    {/* list-group y list-group-flush es un class de bootstrap para lista de info o etc */}
                                    <li className="list-group-item box-data-info positive-letter">
                                        {/* list-group-item es un class de boostrap para los items que vaya a llevar la lista en el card */}
                                        <span className="card-text">{yearsToDay} Years old</span>
                                        {/* card-text es el class para los textos en las listas segun bootstrap */}
                                        <span className="card-text"> <i className="fas fa-clock">Age</i> </span>
                                    </li>
                                    <li className="list-group-item box-data-info positive-letter">
                                        {/* box-data-info es un class creado propio */}
                                        <span className="card-text">{height} m</span>
                                        <span className="card-text"> <i className="fas fa-ruler-vertical"> Height</i> </span>
                                    </li>
                                    <li className="list-group-item box-data-info positive-letter">
                                        <span className="card-text">{weight} Kg</span>
                                        <span className="card-text"> <i className="fas fa-balance-scale"> Weight </i> </span>
                                    </li>
                                </ul>
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
    showModal: PropTypes.func,
    ProfileUser: PropTypes.object
    // ProfileUser es mi objeto en donde tengo contenido la info del user, IMPORTANTE!!! COMPRENDER ESTO!!!
    // NO se le coloca "isRequired" ya que la data no se obtine en el primer momento, tiene que buscarse en el servidor y luego traerla, se le quita el "isRequired" para no causar problemas
}

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // se coloca "profile" para el nombre del prop de manera de no tener REDUDANCIA con el OBJETO que esta anidado dentro de mi reducer, para diferenciarlo se llaman distinto
});

export default connect(mapStateToProps, { getProfile, uploadAvatar, showModal })(Profile);