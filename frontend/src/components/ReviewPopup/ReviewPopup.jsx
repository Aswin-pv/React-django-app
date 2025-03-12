import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeModal } from "../../redux/reducers/popupReducer";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../utils/apiURL";


const ReviewPopup = ({product_id}) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [review, setReview] = useState("");


    const dispatch = useDispatch();

    const handleClose = (event) => {
        event.stopPropagation();
        dispatch(changeModal());
    };

    const handleInput = (event) => {
        setReview({
            ...review,
            [event.target.name]: event.target.value,
          });
    }
    const submitHandler = (event) =>{
        event.preventDefault();
        
        axios
        .post(BASE_URL + `/products/add-product-rating/${product_id}/`, {
            product:product_id,
            customer:9,
            reviews:review.review,
            rating:rating
        })
        .then((response) => {
           console.log("successfull")

           setRating(null);
        setReview("");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id="review-popup" onClick={handleClose}>
            <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn btn" onClick={handleClose}>
                    <i className="fa-solid fa-xmark fa-lg text-white"></i>
                </button>

                <div className="mt-4">
                    <h5 className="mb-4">Add your reviews Here</h5>
                    <form action="">
                        <div className="rating">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#ffffff"}
                                            size={30}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <textarea name="review" value={review.review} id="" onChange={handleInput}></textarea>
                        <br />
                        <button onClick={submitHandler} type="submit" className="btn btn-primary close-popup mt-3">
                            post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopup;
