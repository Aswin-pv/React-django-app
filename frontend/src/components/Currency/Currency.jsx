import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeCurrency } from "../../redux/reducers/currencyReducer";

const Currency = () => {
    const dispatch = useDispatch();
    //get the currency state from redux store
    const currency = useSelector((state) => state.currency);

    return (
        <div>
            {/* if currency type is not us dollar */}
            {currency.currencyValue != "usd" && (
                <li className="nav-item">
                    <div className="nav-link currency-switch">
                        <select name="" id="" onChange={() => dispatch(changeCurrency())} title="Change currency">
                            <option value="inr">INR</option>
                            <option value="usd">USD</option>
                        </select>
                    </div>
                </li>
            )}
            {/* if currency type is in us dollar */}
            {currency.currencyValue == "usd" && (
                <li className="nav-item">
                    <div className="nav-link currency-switch">
                        <select name="" id="" onChange={() => dispatch(changeCurrency())} title="Change currency">
                            <option value="usd">USD</option>
                            <option value="inr">INR</option>
                        </select>
                    </div>
                </li>
            )}
        </div>
    );
};

export default React.memo(Currency);
