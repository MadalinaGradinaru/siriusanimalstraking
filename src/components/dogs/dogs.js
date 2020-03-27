import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogs, getDogsByStatus,
    openCreateDogModal, openDogToBeEdited, openEditDogModal
} from "../../actions/actions";
import {closeModal} from '../../actions/modal-actions';
import Dog from "./dog";

class Dogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myValue: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            dogs: props.dogs
        }
    }

    componentWillMount() {
        this.props.getDogs();
        localStorage.setItem('status', "")
    }

    filterByTitle = () => {
        this.setState({
            myValue: this.myValue.value
        })
    };

    displayAnimals = () => {
        const {dogs} = this.props;

        let dogItem = [];

        dogItem = dogs.filter(dog => {
            return dog.name.toLowerCase().indexOf(this.state.myValue.toLowerCase()) >= 0
        })
            .map(dog => (<Dog
                    key={`doc-${dog.id}`}
                    item={dog}
                    openEditDogModal={this.props.openEditDogModal}
                    dogToBeEdited={this.props.openDogToBeEdited}
                    selectDog={this.selectTheDog}
                    edit
                />)
            );

        return dogItem;
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'> All dogs will be rendered here - {this.state.dogs.length}</p>
                    <input type="text"
                           placeholder='Search by title'
                           ref={(value) => this.myValue = value}
                           onChange={this.filterByTitle}/>
                    <button className="create"
                            onClick={() => this.props.openCreateDogModal()}>Add a dog
                    </button>
                </div>
                <div className="dogs row">
                    {this.displayAnimals()}
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
            openCreateDogModal: openCreateDogModal,
            getDogsByStatus: getDogsByStatus,
            openEditDogModal: openEditDogModal,
            openDogToBeEdited: openDogToBeEdited,
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(Dogs);