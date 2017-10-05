import React from 'react';
import './Modal.css';

class Modal extends React.Component {

    render() {
        const { isOpen, onOk, onCancel, textOk, textCancel, type, disabledOk, content } = this.props;

        return (
            <div className={`modal-container ${ isOpen ? '' : 'hidden' }`}>

                <div className="modal">

                    <div className="content">{ content }</div>

                    <div className="buttons">

                        <button className={ type === 'warning' ? 'warning' : '' }
                                disabled={ disabledOk }
                                onClick={ onOk }>
                            <i className="fa fa-check"
                               aria-hidden="true">
                            </i>
                            { textOk }
                        </button>

                        <button className="secondary"
                                onClick={ onCancel }>
                            <i className="fa fa-times"
                               aria-hidden="true">
                            </i>
                            { textCancel }
                        </button>

                    </div>

                </div>

            </div>
        );
    }
}

export default Modal;
