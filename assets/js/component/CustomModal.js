import React from "react";

const CustomModal = React.forwardRef(({ handleClose, children }, ref) => {
    return (
        <div className="secondaryModalOverlay">
            <div className="secondaryModal" ref={ref}>
                <div className="modalContent">
                    <div
                        className="close_btn"
                        onClick={() => handleClose(false)}
                    >
                        <span className="bar bar-1"></span>
                        <span className="bar bar-2"></span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
});

export default CustomModal;
