//Banner section content
export const BannerContentVariant = {
    hidden: { x: "-100%", opacity: 0, scale: 0.8 },
    visible: { x: 0, opacity: 1, scale: 1 },
};

export const BannerContentTransition = { duration: 1.3, type: "spring" };

//Banner section buttons

export const BannerBtnVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, rotateX: [180, 0]},
};

export const BannerBtnTransition = { duration: 1.3, delay: 0.3 };

//view all styles

export const ViewAllVariant = {
    hover: { 
        scale: 1.1
    }
}