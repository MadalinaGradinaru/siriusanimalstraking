import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogsByStatus,
    openEditDogModal,
    openDogToBeEdited,
     moveToAdopted,
    //prepareToMoveToAdopted
} from "../../actions/actions";
import Dog from './dog';

class ReservedDogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myValue: '',
            selectedItems: {},
            action: 'add'
        };
    }

    componentDidMount() {
        this.props.getDogsByStatus('reserved');
        localStorage.setItem('status', "reserved");
    }

    filterByTitle = () => {
        this.setState({
            myValue: this.myValue.value
        })
    };

    selectTheDog = (item, e) => {
        const checked = e.target.checked;

        this.setState((prevState) => ({
            selectedItems: {
                ...prevState.selectedItems,
                [item.id]: {
                    checked,
                    name: item.name
                }
            }
        }));
    };

    getSelectedDogs = () => {
        const dogNames = Object.keys(this.state.selectedItems).reduce((acc, id) => {
            if (!this.state.selectedItems[id] || !this.state.selectedItems[id].checked) {
                return [...acc];
            }
            return [...acc, <p key={id}>{this.state.selectedItems[id].name}</p>];
        }, []);

        return (<div>{dogNames}</div>)
    };

    functionTest = () => {
        let selectedIds = Object.keys(this.state.selectedItems);

        this.props.moveToAdopted(selectedIds);
    }

    displayAnimals = () => {
        const { dogs } = this.props;
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

        if (dogItem.length > 0) {
            return dogItem
        } else {
            return (<div>No dogs available</div>)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'> All reserved will be rendered here - {this.props.dogs.length}</p>
                </div>
                <input
                    type="text"
                    placeholder='Search by title'
                    ref={(value) => this.myValue = value}
                    onChange={this.filterByTitle}
                />

                <div className="dogs row" style={{width: "80%", float: "left"}}>
                    {this.displayAnimals()}
                </div>
                <div className="selected-dogs" style={{width: "20%", float: "left"}}>
                    Selected Dogs
                    {this.getSelectedDogs()}
                    <button className="btn" onClick={this.functionTest}>Move to Adopted</button>
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
            moveToAdopted: moveToAdopted,
            // prepareToMoveToAdopted: prepareToMoveToAdopted
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(ReservedDogs);