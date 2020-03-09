import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogsByStatus,
    openEditDogModal,
    openDogToBeEdited,
} from "../../actions/actions";
import Dog from './dog'

class AvailableDogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myValue: ''
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }

    componentWillMount() {
        this.props.getDogsByStatus('available');
        localStorage.setItem('status', "available")
    }

    filterByTitle = () => {
        this.setState({
            myValue: this.myValue.value
        })
    };

    render() {
        const {dogs} = this.props;

        let dogItem = [];

        dogItem = dogs.filter(dog => {
            return dog.name.toLowerCase().indexOf(this.state.myValue.toLowerCase()) >= 0
        })
            .map(dog => (<Dog key={"dog_" + dog.id}
                              item={dog}
                              openEditDogModal={this.props.openEditDogModal}
                              dogToBeEdited={this.props.openDogToBeEdited}
                              edit/>)
            );


        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'>All available test dogs - {dogs.length}</p>
                </div>
                <input type="text"
                       placeholder='Search by title'
                       ref={(value) => this.myValue = value}
                       onChange={this.filterByTitle}/>

                <div className="dogs row">
                    {dogItem}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dogs: state.AnimalsReducer.dogs,
        dogToBeEdited: state.AnimalsReducer.dogToBeEdited,
        dogConfirmationModal: state.AnimalsReducer.dogConfirmationModal,
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getDogsByStatus: getDogsByStatus,
            openEditDogModal: openEditDogModal,
            openDogToBeEdited: openDogToBeEdited,
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(AvailableDogs);