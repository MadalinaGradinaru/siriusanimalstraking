import initialState from '../constants/initial-state';
export const AnimalsReducer = (state = initialState.animals, action) => {
    switch (action.type) {
        case 'ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
            };
        case 'DOG_TO_BE_EDITED' : {
            return {
                ...state,
                dogToBeEdited: action.payload,
            }
        }
        case 'OPEN_EDIT_DOG_MODAL':
            return {
                ...state,
                dogToBeEditedId: action.payload.dogId,
                formType: action.payload.formType,
                dog: action.payload,
                status: action.payload.status
            };
        default :
            return state;
    }
};

