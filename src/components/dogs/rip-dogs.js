import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogsByStatus
} from "../../actions/actions";

class RipDogs extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDogsByStatus('rest in peace');
    }

    displayAnimals = () => {
        const dogs = this.props.dogs.map(
            dog => <div className="dog-item" key={dog.id}>
                <p className={dog.status + " name"}>{dog.name}</p>
                <p className="status">{dog.status}</p>
                <div>
                    <img src={dog.image} alt=""/>
                </div>
            </div>
        );

        return dogs;
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'>Rest in peace  - {this.props.dogs.length}</p>
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
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getDogsByStatus: getDogsByStatus
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(RipDogs);