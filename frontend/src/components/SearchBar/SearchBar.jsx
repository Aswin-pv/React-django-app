import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeachText } from "../../redux/reducers/searchReducer";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.search.searchText);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        dispatch(setSeachText(e.target.value));
    };

    const handleSearchSubmit = () => {
        navigate(`/search-results?query=${searchText}`)
    }

    return (
        <div className="searchbar">
            <input
                className="search-input"
                type="search"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            {
                searchText && 
                <button type="submit" className="search_icon btn" onClick={handleSearchSubmit}>
                <i className="fas fa-search"></i>
            </button>
            }
           
        </div>
    );
};

export default React.memo(SearchBar);
