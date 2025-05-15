import { AlertProps } from '@/interfaces/interfaces';
import React from 'react';

const AlertComponent = (alert: AlertProps) => {

    const { alertType, alertMessage } = alert;

    return (
        <div className="toast toast-bottom toast-end z-50">
            <div className={`alert ${alertType}`}>
                <span>{alertMessage}</span>
            </div>

        </div>


    );
};

export default AlertComponent;