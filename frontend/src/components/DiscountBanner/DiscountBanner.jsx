import React from "react";

const DiscountBanner = () => {
    return (
        <div className="col-12">
            <div className="banner-img">
                <img src={require("../../assets/images/Banner.jpeg")} alt="" />
            </div>
        </div>
    );
};

export default React.memo(DiscountBanner);
