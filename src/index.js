import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/sirius-store';
import {BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content';
import DashBoard from './components/dashboard';
import Dogs from './components/dogs/dogs';
import AvailableDogs from './components/dogs/available-dogs';
import Menu from './components/menu/menu';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css"
import ResidentsDogs from "./components/dogs/residents-dogs";
import HHRDogs from "./components/dogs/hhr-dogs";
import ReservedDogs from "./components/dogs/reserved-dogs";
import OtherDogs from "./components/dogs/other-dogs";
import RipDogs from "./components/dogs/rip-dogs";
import ModalContainer from './modals/container';
import AdoptedDogs from "./components/dogs/adopted-dogs";


const LayoutRoute = ({component: Component, path, display, exact}) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={props => (
                <div>
                    <Menu display={display} url={path}/>
                    <Content>
                        <Component />
                    </Content>
                    <ModalContainer/>
                </div>
            )}
        />
    )
};


const SiriusContent = () => {
    return (
        <div>
            <LayoutRoute exact path="/" component={DashBoard} display={true} />
            <LayoutRoute exact path="/dogs" component={Dogs} display={true} />
            <LayoutRoute exact path="/dog-available" component={AvailableDogs} display={true} />
            <LayoutRoute exact path="/dog-adopted" component={AdoptedDogs} display={true} />
            <LayoutRoute exact path="/dog-reserved" component={ReservedDogs} display={true} />
            <LayoutRoute exact path="/dog-residents" component={ResidentsDogs} display={true} />
            <LayoutRoute exact path="/dog-gone" component={HHRDogs} display={true} />
            <LayoutRoute exact path="/dog-other" component={OtherDogs} display={true} />
            <LayoutRoute exact path="/dog-rip" component={RipDogs} display={true} />
        </div>
    )
};

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <SiriusContent/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

