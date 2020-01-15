import React, {Component} from 'react';
// import { connect } from 'react-redux';

class Profile extends Component{
    render (){
        return(
            <div className="ui centered grid">
                <div className="ui items">
                <div className="item">

                    <div className="image">
                        <img src="https://bashny.net/uploads/images/00/00/45/2013/11/13/44d12bc354.jpg"/>>
                    </div>

                    <div className="content">
                        <a className="header">Profile</a>

                        <div className="meta">
                            <span>Description</span>
                        </div>

                        <div className="description">
                            <p></p>
                        </div>

                        <div className="extra">
                            Additional Details
                        </div>
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

export default Profile;