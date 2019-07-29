import React from 'react';
import './../../pages/tracker.scss'
import { Link } from 'gatsby'

const BasicInfo = ({
    avatar,
    username,
    platform
}) => {
    let icon;
    switch(platform) {
        case 'PC':
            icon = <i className="fab fa-windows account-icon"></i>
            break;
        case 'X1':
            icon = <i className="fab fa-xbox xbox-icon account-icon"></i>
            break;
        case 'PS4':
            icon = <i className="fab fa-playstation ps-icon account-icon"></i>
            break;
        default:
            icon = <i className="fab fa-windows account-icon"></i>
            
    }
    return (
        <div className='account-top-page'>
            <div className='account-basic-info'>

                <div className='account-avatar-container'>
                    <img className='account-avatar' src={avatar} alt=""/>
                </div>

                <h2 className='account-username'>{username}</h2>

                {icon}

            </div>
            <p className='account-beta-reminder'><Link to='/news/check-your-stats/'>Our tracker is still in beta! Click here for more info</Link></p>
        </div>
    )


};

export default BasicInfo;