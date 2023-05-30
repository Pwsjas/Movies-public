import { React, useState } from 'react';
import RegisterPopup from '../components/RegisterPopup';
import LoginPopup from '../components/LoginPopup';
import './PopupOverlay.scss';

export default function PopupOverlay(props) {
    
    const [popupType, setPopupType] = useState(props.popupType);

    return (
        <div className='overlay'>
            {popupType === 'register' &&
                <RegisterPopup popupState={props.popupState}></RegisterPopup>
            }
            {popupType === 'login' &&
                <LoginPopup popupState={props.popupState}></LoginPopup>
            }
        </div>
    );
};