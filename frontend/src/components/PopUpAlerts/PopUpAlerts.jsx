import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeModal } from '../../redux/reducers/popupReducer';

const PopUpAlerts = ({message,buttonValue,link}) => {

    const dispatch = useDispatch();

    const handleClose = (event) => {
        event.stopPropagation();
        dispatch(changeModal());
    };

  return (
    <div id="popup-alert" onClick={handleClose}>
            <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
                <div className="mt-4">
                    <h5 className="mb-4 text-center fw-bold">Success</h5>
                    <p className='text-center'>{message}</p>
                    <div className='d-flex justify-content-center'>
                    <button type='button' className="btn btn-primary btn-inverse-info">
                        <Link className='text-decoration-none' to={link}>{buttonValue}</Link></button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PopUpAlerts
