import React, {Component} from 'react';
import {menuItems} from '../../constants/constants';
import {NavLink} from 'react-router-dom';


class Menu extends Component {
    render() {
        let menuArray = [];

        menuItems.map((item, i) => {
            menuArray.push(<NavLink to={item.route}
                                    className={item.level !== 1 ? "submenu" : ""}
                                    key={'menu_' + i}>
                {item.name}
            </NavLink>)
        });

        return (
            <div className="menu">
                <a href="/" className="logo">
                    <img src="https://www.siriusanimalrescue.ro/wp-content/uploads/2018/08/cropped-watermark_SAR_1-1.png" alt="Sirius Logo"/><h2>Sirius Animal Rescue</h2>
                </a>
                {menuArray}
            </div>
        )
    }
}

export default Menu;