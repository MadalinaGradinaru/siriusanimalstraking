import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Pagination  extends Component {

    render() {
        let first = this.props.pagination  ? this.props.pagination['first'] : '',
            next =  this.props.pagination  ? this.props.pagination['next']: '',
            last = this.props.pagination  ? this.props.pagination['last'] : '';

        return (
            <div>
                <span className={first ? '' : 'hidden'} onClick={()=>this.props.getData(first)}>First</span>
                <span className={next ? '' : 'hidden'} onClick={()=>this.props.getData(next)}>Next</span>
                <span className={last ? '' : 'hidden'} onClick={()=>this.props.getData(last)}>Last</span>
            </div>
        )
    }

}

export default Pagination;