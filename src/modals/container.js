import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from '../actions/modal-actions';
import BaseModal from './base';

const ModalContainer = (props) => {
    return (
        <div className="modal-container">
            <BaseModal />
            <div onClick={props.closeModal} className={props.modalOpen ? 'modal-backdrop ' : 'modal-backdrop hidden'}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        modalOpen: state.ModalReducer.modalOpen,
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            closeModal: closeModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(ModalContainer);