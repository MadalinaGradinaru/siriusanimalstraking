import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighcharts.src';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var config = {
            title: {
                text: 'Price per dog'
            },
            series: [{
                name: 'Price per dog',
                data: this.props.costs,
            }]
        };

        return <ReactHighcharts config={config}  />;
    }
}

export default Chart;