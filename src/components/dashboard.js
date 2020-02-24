import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogs
} from "../actions/actions";
import Table from 'react-bootstrap/Table'
import moment from "moment";
import Chart from './prices';
import FontAwesome from 'react-fontawesome';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: props.dogs.data || [],
            totalDays: "",
            currentSort: 'default',
            myValue: ''
        };

        this.getDays = this.getDays.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }

    componentWillMount() {
        this.props.getDogs();
    }

    getDays(start, end) {
        if (!start) {
            return 0
        }

        let startDay = moment(start, 'YYYY-MM-DD'),
            endDate = moment(end, 'YYYY-MM-DD'),
            days = endDate.diff(startDay, 'days');

        return days
    }

    onSortChange = () => {
        const {currentSort} = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        });
    };

    filterByTitle = () => {
        this.setState({
            myValue: this.myValue.value
        })
    };

    render() {
        let allDogs = [],
            dogsArrayTable = [],
            costArray = [];
        const {currentSort} = this.state;

        const sortTypes = {
            up: {
                class: 'sort-up',
                fn: (a, b) => a.value - b.value
            },
            down: {
                class: 'sort-down',
                fn: (a, b) => b.value - a.value
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        };

        this.state.dogs
            .forEach((dog, i) => {
                dog.status !== "rest in peace" &&
                dogsArrayTable.push({
                    "status":dog.status,
                    "name": dog.name,
                    "start": dog.start_date,
                    "end": dog.end_date,
                    "days": this.getDays(dog.start_date, dog.end_date),
                    "value": this.getDays(dog.start_date, dog.end_date) * 5
                })
            });

        dogsArrayTable
            .sort(sortTypes[currentSort].fn)
            .filter(dog => {
                return dog.name.toLowerCase().indexOf(this.state.myValue.toLowerCase()) >= 0
            })
            .map((dog, i) => {
                console.log(dog);
                dog.status !== "rest in peace" &&
                allDogs.push(<tr key={i} className={dog.status + " dog-item"}>
                    <td className="name">{dog.name}</td>
                    <td className="start-date">{dog.start}</td>
                    <td className="end_date">{dog.end}</td>
                    <td className="days-number">{dog.days}</td>
                    <td className="value-per-dog">{dog.value}</td>
                </tr>);
            });

        this.state.dogs.map((dog) => {
            costArray.push(this.getDays(dog.start_date, dog.end_date) * 5)
        });

        return (
            <div className="container-fluid">
                <div className="title-wrapper">
                    <p className='title'>Statistics</p>
                </div>
                <input type="text"
                       placeholder='Search by title'
                       ref={(value) => this.myValue = value}
                       onChange={this.filterByTitle}/>
                <div className="dogs-table">
                    <Table className="statistics" bordered>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Number of days</th>
                            <th>Value per dog (lei)
                                <button onClick={this.onSortChange}>
                                    <FontAwesome className={`fas fa-${sortTypes[currentSort].class}`}/>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {allDogs}
                        </tbody>
                    </Table>
                </div>
                <div className='chart'>
                    <Chart costs={costArray}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dogs: state.AnimalsReducer.dogs
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getDogs: getDogs
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(DashBoard);