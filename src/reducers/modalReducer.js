import initialState from '../constants/initial-state';

export const ModalReducer = (state = initialState.modals, action) => {
    switch (action.type) {
        case 'OPEN_EDIT_DOG_MODAL':
            return {
                ...state,
                modalOpen: true,
                modalType: 'EditDog',
                modalTitle: 'Edit Dog',
            };
        case 'OPEN_CREATE_DOG_MODAL':
            return {
                ...state,
                modalOpen: true,
                modalType: 'CreateDog',
                modalTitle: 'Create Dog',
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false,
                modalType: '',
                modalTitle: '',
                reportId: '',
            };
        default :
            return state;
    }
};

