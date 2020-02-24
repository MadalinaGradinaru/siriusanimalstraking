import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {closeModal} from '../actions/modal-actions';
import {dogsStatuses} from '../constants/constants';
import {
    createDog,
    saveDog,
    openDogToBeEdited
} from '../actions/actions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ManageDog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.dogToBeEdited.name || '',
            status: props.dogToBeEdited.status || '',
            image: props.dogToBeEdited.image || '',
            dob: props.dogToBeEdited.dob || '',
            gender: props.dogToBeEdited.gender || '',
            size: props.dogToBeEdited.size || '',
            medical_status: props.dogToBeEdited.medical_status || '',
            last_update: props.dogToBeEdited.last_update || '',
            is_returned: props.dogToBeEdited.is_returned || false,
            new_name: props.dogToBeEdited.new_name || '',
            comments: props.dogToBeEdited.comments || '',
            start_date: props.dogToBeEdited.start_date || new Date().toISOString().slice(0,10),
            end_date: props.dogToBeEdited.end_date || new Date().toISOString().slice(0,10)
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.saveDog = this.saveDog.bind(this);
        this.updateDog = this.updateDog.bind(this);
        this.handleChange_date = this.handleChange_date.bind(this);
    }

    componentWillMount() {
        if (this.props.formType === 'edit') {
            this.props.openDogToBeEdited(this.props.dogId);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            name: nextProps.dogToBeEdited.data.name || '',
            status: nextProps.dogToBeEdited.data.status || '',
            image: nextProps.dogToBeEdited.data.image || '',
            dob: nextProps.dogToBeEdited.data.dob || '',
            gender: nextProps.dogToBeEdited.data.gender || '',
            size: nextProps.dogToBeEdited.data.size || '',
            medical_status: nextProps.dogToBeEdited.data.medical_status || '',
            last_update: nextProps.dogToBeEdited.data.last_update || '',
            is_returned: nextProps.dogToBeEdited.data.is_returned || false,
            new_name: nextProps.dogToBeEdited.data.new_name || '',
            comments: nextProps.dogToBeEdited.data.comments || '',
            start_date: nextProps.dogToBeEdited.data.start_date || '',
            end_date: nextProps.dogToBeEdited.data.end_date || ''
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleReturn(e) {
        const {checked} = e.target;
        this.setState({
            is_returned: checked,
        })
    }

    handleGender(e) {
        this.setState({
            gender: e.label,
        })
    }

    handleStatus(e) {
        this.setState({
            status: e.label,
        })
    }

    handleChange_date = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    };

    saveDog(e) {
        e.preventDefault();
        let inputs = {
            name: this.state.name,
            status: this.state.status,
            image: this.state.image,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            dob: this.state.dob,
            gender: this.state.gender,
            size: this.state.size,
            medical_status: this.state.medical_status,
            last_update: this.state.last_update,
            new_name: this.state.new_name,
            comments: this.state.comments,
            is_returned: this.state.is_returned
        };

        this.props.createDog(inputs)
    }

    updateDog(e) {
        e.preventDefault();
        let inputs = {
            name: this.state.name,
            status: this.state.status,
            image: this.state.image,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            dob: this.state.dob,
            gender: this.state.gender,
            size: this.state.size,
            medical_status: this.state.medical_status,
            last_update: this.state.last_update,
            new_name: this.state.new_name,
            comments: this.state.comments,
            is_returned: this.state.is_returned
        };

        this.props.saveDog(inputs, this.props.dogId, this.state.status)
    }

    render() {
        let statuses = [],
            button,
            gender = ["male", "female"],
            visibleOnEdit = this.props.formType === "edit" ? "block" : "none";

        dogsStatuses.map((status, i) => {
            statuses.push(
                <option key={i}
                        id="status"
                        name="status"
                        value={status}>{status}
                </option>
            )
        });

        button = this.props.formType ?
            <button className="btn btn-default" onClick={this.updateDog}>Save and close</button> :
            <button className="btn btn-default" onClick={this.saveDog}>Save and close</button>;

        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-12">Name</label>
                        <div className="col-md-12">
                            <input id="name"
                                   type="text"
                                   className="form-control"
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   required/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Status</label>
                        <div className="col-md-12">
                            <Dropdown options={dogsStatuses}
                                      onChange={this.handleStatus}
                                      value={this.state.status}
                                      placeholder='Select a status'/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Accommodation period</label>
                        <div className="col-md-12">
                            <input type="date"
                                   id="date-age"
                                   name="start_date"
                                   value={this.state.start_date}
                                   onChange={this.handleChange_date} />
                                   -
                            <input type="date"
                                   id="date-age"
                                   name="end_date"
                                   value={this.state.end_date}
                                   onChange={this.handleChange_date} />
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-12">Image</label>
                        <div className="col-md-12">
                            <input id="image"
                                   type="text"
                                   className="form-control"
                                   name="image"
                                   value={this.state.image}
                                   onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Date of birth</label>
                        <div className="col-md-12">
                            <input type="date"
                                   id="date-age"
                                   name="dob"
                                   defaultValue={this.state.dob}
                                   onChange={this.handleChange_date} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Size</label>
                        <div className="col-md-12">
                            <input id="size"
                                   type="text"
                                   className="form-control"
                                   name="size"
                                   value={this.state.size}
                                   onChange={this.handleChange}
                                   required/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Gender</label>
                        <div className="col-md-12">
                            <Dropdown options={gender}
                                      onChange={this.handleGender}
                                      value={this.state.gender}
                                      placeholder='Select a gender'/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-12">Medical status</label>
                        <div className="col-md-12">
                            <textarea id="medical_status"
                                      type="textare"
                                      className="form-control"
                                      name="medical_status"
                                      value={this.state.medical_status}
                                      onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div style={{"display": visibleOnEdit}}>
                        <div className="form-group">
                            <label className="col-md-12">New Name</label>
                            <div className="col-md-12">
                                <input id="new_name"
                                       type="text"
                                       className="form-control"
                                       name="new_name"
                                       value={this.state.new_name}
                                       onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12">Last Update</label>
                            <div className="col-md-12">
                                <input id="last_update"
                                       type="text"
                                       className="form-control"
                                       name="last_update"
                                       value={this.state.last_update}
                                       onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12">Is returned</label>
                            <div className="col-md-12">
                                <input type="checkbox"
                                       name="is_returned"
                                       checked={this.state.is_returned}
                                       onChange={this.handleReturn}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12">Comments</label>
                            <div className="col-md-12">
                            <textarea id="comments"
                                      type="textare"
                                      className="form-control"
                                      name="comments"
                                      value={this.state.comments}
                                      onChange={this.handleChange}
                            />
                            </div>
                        </div>
                    </div>

                    {button}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dogId: state.AnimalsReducer.dogToBeEditedId,
        dogToBeEdited: state.AnimalsReducer.dogToBeEdited,
        formType: state.AnimalsReducer.formType,
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
            closeModal: closeModal,
            createDog: createDog,
            openDogToBeEdited: openDogToBeEdited,
            saveDog: saveDog
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(ManageDog)