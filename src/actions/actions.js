import {request} from '../constants/axios-wrapper';
import {closeModal} from './modal-actions';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

/**
 *  ALL DOGS
 * */

export const getDogs = (page) => {
    console.log(page);

    console.log('gjklasdgjasg')
    let dogsNumber = page === undefined ? '' : '?_page=' + page;

    return function (dispatch) {
        request.get("/dogs/" + dogsNumber)
            .then((response) => {
                dispatch(dogsList(response.data));
            })
    }
};

/**
 *  BY STATUS FILTER  DOGS
 * */
export const getDogsByStatus = (status) => {
    console.log('GET RESERVED DOGS')
    let dogsStatus = status;

    return function (dispatch) {
        request.get("/dogs/?status=" + dogsStatus)
            .then((response) => {
                dispatch(dogsList(response.data));
            })
    }
};

const dogsList = (dogs) => {
    return {
        type: 'ALL_DOGS',
        payload: dogs
    }
};


/**
 * CREATE DOG
 **/

export const openCreateDogModal = () => {
    return {
        type: 'OPEN_CREATE_DOG_MODAL'
    }
};

export const createDog = (dog) => {
    let newDog = {
        "name": dog.name || '',
        "status": dog.status || '',
        "image": dog.image || '',
        "start_date": dog.start_date || '',
        "end_date": dog.end_date || '',
        "dob": dog.dob || '',
        "size": dog.size || '',
        "gender": dog.gender || '',
        "medical_status": dog.medical_status || '',
        "new_name": dog.new_name || '',
        "last_update": dog.last_update || '',
        "is_returned": dog.is_returned || false,
        "comments": dog.comments || ''
    };

    return function (dispatch) {
        request.post('/dogs', newDog)
            .then(() => {
                dispatch(closeModal());
                dispatch(getDogs());
            })
    };
};

/**
 * EDIT DOG
 * **/

export const openDogToBeEdited = (id) => {
    return function (dispatch) {
        request.get('/dogs/' + id)
            .then((response) => {
                dispatch(getDogEdit(response));
            })
    };
};

export const openEditDogModal = (id, actionType, status) => {
    return {
        type: 'OPEN_EDIT_DOG_MODAL',
        payload: {
            dogId: id,
            formType: actionType,
            status: status
        }
    }
};

export const getDogEdit = (editedDog) => {
    return {
        type: 'DOG_TO_BE_EDITED',
        payload: editedDog
    }
};

export const saveDog = (dog, dogId) => {
    let status = localStorage.getItem('status')

    let newDog = {
        "name": dog.name || '',
        "status": dog.status || '',
        "image": dog.image || '',
        "start_date": dog.start_date || '',
        "end_date": dog.end_date || '',
        "dob": dog.dob || '',
        "size": dog.size || '',
        "gender": dog.gender || '',
        "medical_status": dog.medical_status || '',
        "new_name": dog.new_name || '',
        "last_update": dog.last_update || '',
        "is_returned": dog.is_returned || false,
        "comments": dog.comments || ''
    };

    return function (dispatch) {
        request.put('/dogs/' + dogId, newDog)
            .then(() => {
                dispatch(closeModal());
                dispatch(getDogsByStatus(status));
            })

    }
};

/**
 * Move to adopted
 * **/

export const testFn = (data) => dispatch => dispatch(moveToAdopted(data));


export const prepareToMoveToAdopted = (ids) => {
    ids.forEach(id => {
        return request.get('/dogs/' + id)
            .then((response) => {
                testFn(response.data);
            })
    })
}

export const moveToAdopted = (dog) => {
    console.log('DOG', dog[0]);

    /*    let dodToBeMoved = {
            "name": dog.name,
            "status": "adopted",
            "image": dog.image || '',
            "start_date": dog.start_date || '',
            "end_date": dog.end_date || '',
            "dob": dog.dob || '',
            "size": dog.size || '',
            "gender": dog.gender || '',
            "medical_status": dog.medical_status || '',
            "new_name": dog.new_name || '',
            "last_update": dog.last_update || '',
            "is_returned": dog.is_returned || false,
            "comments": dog.comments || ''
        };*/

    let dogToBeMoved = {
        "status": "adopted"
    };

    console.log(dogToBeMoved);

    return function (dispatch) {
        console.log('test')
        request.post('/dogs/' + dog[0], dogToBeMoved)
            .then(() => {
                dispatch(getDogsByStatus("reserved"));
            })
    }
}


/**
 * FACEBOOK REQUEST TEST
 * */

export const requestFBTest = () => {

    return function (dispatch) {

        console.log("TEST")

    }
}



