import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogsByStatus, openDogToBeEdited, openEditDogModal
} from "../../actions/actions";
import Dog from "./dog";

class HHRDogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dogs: props.dogs.data || [],
            myValue: ''
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }

    componentWillMount() {
        this.props.getDogsByStatus('gone');
        localStorage.setItem('status', "gone")

    }

    filterByTitle = () => {
        this.setState({
            myValue: this.myValue.value
        })
    };

    render() {
        let dogItem = [];

        dogItem = this.state.dogs
/*            .filter(dog => {
                return dog.name.toLowerCase().indexOf(this.state.myValue.toLowerCase()) >= 0
            })*/
            .map(dog => (<Dog key={"dog_" + dog.id}
                              item={dog}
                              openEditDogModal={this.props.openEditDogModal}
                              dogToBeEdited={this.props.openDogToBeEdited}
                              edit/>)
            );

        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'> All gone  will be rendered here  - {this.props.dogs.length}</p>
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

export default connect(mapStateToProps, matchDispatchToProps)(HHRDogs);