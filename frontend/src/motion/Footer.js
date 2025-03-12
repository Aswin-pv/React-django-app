

export const FooterLinks = {
    hidden: { x: "-100%", opacity: 0 }, 
    visible: {
        x: 0, 
        opacity: 1, 
        transition: {
            duration: 1, 
            staggerChildren: 0.2, 
            when: "beforeChildren", 
        },
    },
};

export const FooterVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: {
        duration: 3
    } },
    
}