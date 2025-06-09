import { AlertProps } from '@/interfaces/interfaces';
import React from 'react';

const AlertComponent = (alert: AlertProps) => {

    const { alertType, alertMessage, alertPosition } = alert;

    return (
        <div className={`toast toast-${alertPosition} toast-center z-50`}>
            <div className={`alert ${alertType}`}>
                <span>{alertMessage}</span>
            </div>

        </div>


    );
};

export default AlertComponent;