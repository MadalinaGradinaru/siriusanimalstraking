import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogs,
    openCreateDogModal
} from "../../actions/actions";
import {closeModal} from '../../actions/modal-actions';

class Dogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dogs: props.dogs.data || []
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }

    componentWillMount() {
        this.props.getDogs();
        localStorage.setItem('status', "")

    }

    render() {
        const dogs = this.state.dogs.map(
            dog => <div className={dog.status + " dog-item"} key={dog.id}>
                <p className="name">{dog.name}</p>
                <p className="status">{dog.status}</p>
                <div>
                    <img src={dog.image} alt=""/>
                </div>
            </div>
        );
        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'> All dogs will be rendered here - {this.state.dogs.length}</p>
                    <button className="create"
                            onClick={() => this.props.openCreateDogModal()}>Add a dog
                    </button>
                </div>
                <div className="dogs row">
                    {dogs}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dogs: state.AnimalsReducer.dogs,
        modalOpen: state.ModalReducer.modalOpen,
        modalType: state.ModalReducer.modalType
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getDogs: getDogs,
            closeModal: closeModal,
            openCreateDogModal: openCreateDogModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(Dogs);