import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getDogs, requestFBTest
} from "../actions/actions";
import Table from 'react-bootstrap/Table'
import moment, {months} from "moment";
import Chart from './prices';
import FontAwesome from 'react-fontawesome';
import Facebook from "./facebook";
import Pagination from "./pagination"
import {forEach} from "react-bootstrap/cjs/ElementChildren";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            totalDays: "",
            currentSort: 'default',
            myValue: '',
            ages: [],
            pagination: ''
        };

        this.getDays = this.getDays.bind(this);
        this.calculateDob = this.calculateDob.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            pagination: props.pagination,
            dogs: props.dogs
        }
    }

    componentDidMount() {
        this.props.getDogs(1);
        if (this.state.dogs.length !== 0) {
            this.calculateCostPerDog();
        }
       // this.props.requestFBTest() facebook login
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if (this.state.dogs.length !== 0) {
           this.calculateCostPerDog();
       }
    }

    getDays(start, end) {
        if (!start) {
            return 0
        }

        let startDay = moment(start, 'YYYY-MM-DD'),
            endDate = end ? moment(end, 'YYYY-MM-DD') : moment(),
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

    calculateDob = (dob) => {
        let currentDate = new Date().toISOString().split('T')[0],
            dateOfBirth = new Date(dob),
            currentDateYear = new Date(currentDate).getFullYear(),
            dateOfBirthYear = dateOfBirth !== undefined ? new Date(dob).getFullYear() : "",
            currentDateMonth = new Date(currentDate).getMonth(),
            dateOfBirthMonth = dateOfBirth !== undefined ? new Date(dob).getMonth() : "";

        var months;
        months = (currentDateYear - dateOfBirthYear) * 12;
        months -= currentDateMonth + 1;
        months += dateOfBirthMonth;

        if (months) {
            return (<div><span>{Math.floor(months / 12) - 1 }</span> ani si <span>{months % 12}</span> luni</div>);
        }

        return  (<p>DOB not added</p>)
    };

    calculateCostPerDog = () => {
        this.props.dogs.map(dog => (this.getDays(dog.start_date, dog.end_date) * 5));
    };

    displayAnimals = () => {
        let allDogs = [],
            dogsArrayTable = [];

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
                fn: (a) => a
            }
        };

        this.props.dogs
            .forEach(dog => {
                dog.status !== "rest in peace" &&
                dogsArrayTable.push({
                    "status": dog.status,
                    "name": dog.name,
                    "dob": dog.dob,
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
                dog.status !== "rest in peace" &&
                allDogs.push(<tr key={i} className={dog.status + " dog-item"}>
                    <td className="name">{dog.name}</td>
                    <td className="dob">{this.calculateDob(dog.dob)}</td>
                    <td className="start-date">{dog.start}</td>
                    <td className="end_date">{dog.end}</td>
                    <td className="days-number">{dog.days}</td>
                    <td className="value-per-dog">{dog.value}</td>
                </tr>);
            });

        return allDogs;
    }

    createPagination = () => {
        let data = [this.state.pagination]


        if (data[0] != undefined) {
            let parsed_data = {}
            let arrData = data[0].split(",")

            arrData.forEach(item => {
                const  linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(item)

                parsed_data[linkInfo[2]]=linkInfo[1].split('=')[1]
            })

            return parsed_data;
        }
    };


    render() {
        const { cost } = this.state;

        return (
            <div className="container-fluid">
                {/*<Facebook />*/}

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
                            <th>Data nasterii</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Number of days</th>
                            <th>Value per dog (lei)
                                <button onClick={this.onSortChange}>
                                    {/*<FontAwesome className={`fas fa-${sortTypes[currentSort].class}`}/>*/}
                                    {/*TO DO - get class*/}
                                    Sort
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.displayAnimals()}
                        </tbody>
                    </Table>
                    <Pagination pagination={this.createPagination()}
                                getData={this.props.getDogs}/>
                </div>
                <div className='chart'>
                    <Chart costs={cost}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dogs: state.AnimalsReducer.dogs,
        pagination: state.AnimalsReducer.pagination
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getDogs: getDogs,
            requestFBTest: requestFBTest
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(DashBoard);