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
            //dogs: props.dogs.data || [],
            totalDays: "",
            currentSort: 'default',
            myValue: '',
            ages: [],
            cost: [],
        };

        this.getDays = this.getDays.bind(this);
        this.calculateDob = this.calculateDob.bind(this);
    }

/*    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            dogs: nextProps.dogs,
        })
    }*/

    componentDidMount() {
        this.props.getDogs();
        if (this.props.dogs.length === 0) {
            this.calculateCostPerDog();
        }
       // this.props.requestFBTest()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if (this.props.dogs.length === 0) {
           this.calculateCostPerDog();
       }
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

    calculateDob = (dob) => {
        let today = new Date().toISOString().split('T')[0],
            date1 = new Date(dob),
            date1Year = new Date(today).getFullYear(),
            date2Year = date1 !== undefined ? new Date(dob).getFullYear() : "",
            date1Month = new Date(today).getMonth(),
            date2Month = date1 !== undefined ? new Date(dob).getMonth() : "";

        var months;
        months = (date1Year - date2Year) * 12;
        months -= date1Month + 1;
        months += date2Month;

        if (months) {
            return (<div><span>{Math.floor(months / 12) - 1 }</span> ani si <span>{months % 12}</span> luni</div>);
        }

        return  (<p>DOB not added</p>)
    };

    calculateCostPerDog = () => {
        const cost = this.props.dogs.map((dog) => (this.getDays(dog.start_date, dog.end_date) * 5));
        console.log('calculateCostPerDog - dogs, cost = ', this.props.dogs, cost)
        this.setState({ cost })
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
        let data = [
            '<http://localhost:3001/posts?_page=1>; rel="first", <http://localhost:3001/posts?_page=2>; rel="next", <http://localhost:3001/posts?_page=5>; rel="last"']

        function parseData(data) {
            let parsed_data = {}
            console.log('data = ', data)
            let arrData = data[0].split(",")

            arrData.forEach(item => {
                const  linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(item)

                parsed_data[linkInfo[2]]=linkInfo[1]
            })

            return parsed_data;
        }

        console.log('DOGS', this.props);
        console.log('cost = ', cost);
    }

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
                    <Pagination dogs={this.props.dogs}/>
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
        dogs: state.AnimalsReducer.dogs
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