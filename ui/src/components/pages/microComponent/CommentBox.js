import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/videos';

const CommentBox = ({ idVideo, addComment, profile }) => {


    const onSubmit = async e => {
        e.preventDefault();
        addComment({ text, idVideo, student: profile._id });
        setText('');
        CloseUp();
    }

    const [open, setOpen] = useState(false);

    const CloseUp = () => {
        setOpen(!open);
        setText('');
        setRow(1);
    }

    const [text, setText] = useState('');
    const [row, setRow] = useState(1);
    const [minRows] = useState(1);
    const [maxRows] = useState(10);

    const handleChange = e => {

        const textareaLineHeight = 24;

        const previousRows = e.target.rows;
        e.target.rows = minRows; // reset number of rows in textarea

        const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

        // setting the value of rows
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        }

        setText(e.target.value);
        setRow(currentRows < maxRows ? currentRows : maxRows);
    }

    const TextAreaFunction = () => {
        return (
            <>
                <textarea
                    className="textarea-style"
                    name="text"
                    cols="130"
                    rows={row}
                    placeholder=" Make a comment ..."
                    value={text}
                    onChange={handleChange}
                    required
                >
                </textarea>

                <hr className="rayita-textarea" />

            </>
        )
    }

    const DivFunction = () => {
        // this a div to looks like a textarea
        return (
            <>
                <div className="LookeLikeTextArea" placeholder="Make a comment..." onClick={() => setOpen(!open)}>
                </div>

            </>
        )
    }

    const buttonCommentCancel = () => {
        return (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <input type="submit" className="btn boton -claro btn-sm" value="Comment" />

                <button className="btn boton -oscuro btn-sm" onClick={() => CloseUp()}>
                    Cancel
                </button>
            </div>
        )
    }

    const avatarImage = () => {

        const { avatar } = profile;

        // Default avatar
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

        // Custom avatar picture
        if (typeof avatar === 'object') {

            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="avatar-mini" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="avatar-mini" alt="avatar" src={avatarUrl} />
        );

    }


    return (
        <div className="container-commentBox">
            <div className="Header-ProfilePicture-CommentForm">
                <div className="avatar-container-profile-commentBox">
                    <span className="avatar-mini">
                        {avatarImage()}
                    </span>
                </div>

                <form className="form-comment" onSubmit={e => onSubmit(e)}>
                    {open ? TextAreaFunction() : DivFunction()}
                </form>
            </div>

            <div>
                <form onSubmit={e => onSubmit(e)}>
                    {open ? buttonCommentCancel() : null}
                </form>
            </div>
        </div >
    );
}

CommentBox.propTypes = {
    addComment: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStatetoProps = state => ({
    profile: state.profile.ProfileUser
})

export default connect(mapStatetoProps, { addComment })(CommentBox);