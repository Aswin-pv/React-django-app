import { transition } from "./Header"

// animation for hovering product card
export const CardHover =  {
    scale : 1.05,
}


export const productCardButton = {
    hidden : { scale:1, rotate:"0deg" },
    visible: { scale:1.1 ,rotate:"-2deg"}
}


//product badge animation
export const BadgeAnimation = {
    visible : {
        color: ["#9933ff", "#1a1aff", "#ff3300", "#ffcc00"],
        transition : {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
        }
    }
}

export const DiscountBadge = {
    visible: {
        scale: [1, 1.2, 1], 
        rotate: [0, 10, -10, 0], 
        transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut",
        },
    },
};