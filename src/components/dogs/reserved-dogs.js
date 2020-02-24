import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogsByStatus,
    openEditDogModal,
    openDogToBeEdited,
} from "../../actions/actions";
import Dog from './dog';
import logger from "less/lib/less/logger";

class ReservedDogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dogs: props.dogs.data || [],
            myValue: '',
            selectedItems: {},
            action: 'add'
        };

        this.selectTheDog = this.selectTheDog.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }

    componentWillMount() {
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
                },
            }
        }));

    };

    getSelectedDogs = () => {
        const dogNames = Object.keys(this.state.selectedItems).reduce((acc, id) => {
            if (!this.state.selectedItems[id] || !this.state.selectedItems[id].checked) {
                return <p>acc</p>;
            }

            return [...acc, <p>{this.state.selectedItems[id].name}</p>];
        }, []);

        return (<div>{dogNames}</div>)
    };

    render() {
        let dogItem = [];

        dogItem = this.state.dogs
            .filter(dog => {
                return dog.name.toLowerCase().indexOf(this.state.myValue.toLowerCase()) >= 0
            })
            .map(dog => (<Dog key={"dog_" + dog.id}
                              item={dog}
                              openEditDogModal={this.props.openEditDogModal}
                              dogToBeEdited={this.props.openDogToBeEdited}
                              selectDog={this.selectTheDog}
                              edit/>)
            );

        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'> All reserved will be rendered here - {this.state.dogs.length}</p>
                </div>
                <input type="text"
                       placeholder='Search by title'
                       ref={(value) => this.myValue = value}
                       onChange={this.filterByTitle}/>

                <div className="dogs row" style={{width: "80%", float: "left"}}>
                    {dogItem}
                </div>
                <div className="selected-dogs" style={{width: "20%", float: "left"}}>
                    Selected Dogs
                    {this.getSelectedDogs()}
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

export default connect(mapStateToProps, matchDispatchToProps)(ReservedDogs);