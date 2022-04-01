import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/index.scss';

// Alert component
const Alert = ({ alert }) =>
    alert !== null && alert.length > 0 && alert.map(message => (

        <div key={message.id} className="d-flex justify-content-center">
            <div className={`alert ${message.typeMessage} extra-mt-x5 position-fixed`}>
                <div className="text-center black-letter">
                    {message.msg}
                </div>
            </div>
        </div>
    ));

Alert.propTypes = {
    alert: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alert: state.message
});

export default connect(mapStateToProps)(Alert);
