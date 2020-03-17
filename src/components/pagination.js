import React, { Component } from 'react';

class Pagination  extends Component {

    constructor(props) {
        super(props);

        //console.log('pagination dogs', props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <span>Prev</span>
                <span>Current page</span>
                <span>Next</span>
            </div>
        )
    }

}

export default Pagination;