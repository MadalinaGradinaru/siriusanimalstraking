import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AnimalsReducer } from '../reducers/animalsReducer';
import { ModalReducer } from '../reducers/modalReducer';


const Reducer = combineReducers({
    AnimalsReducer,
    ModalReducer
});

export default createStore (
    Reducer,
    applyMiddleware(thunk)
)