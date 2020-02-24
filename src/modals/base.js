import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from '../actions/modal-actions';
import ManageDog from './manage-dog';

const ModalComponents = {
    'CreateDog': ManageDog,
    'EditDog': ManageDog,
};

const BaseModal = (props) => {
    if (props.modalType === '') {
        return null;
    }
    const Modal = ModalComponents[props.modalType];

    return (
        <div className={props.modalOpen ? "show" : ""}>
            <div className='modal-dialog'>
                <div id="modal" className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={props.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{props.modalTitle}</h4>
                    </div>
                    <div className="modal-body">
                        <Modal/>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        modalOpen: state.ModalReducer.modalOpen,
        modalType: state.ModalReducer.modalType,
        modalTitle: state.ModalReducer.modalTitle,
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            closeModal: closeModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(BaseModal);