import ProModalImage from "../../images/imageObject/ProModalImage";
import Timer from "./Timer";
const { Modal, Snackbar } = wp.components;
const { useState } = wp.element;

const Promo = ({ handleChange, modalText }) => {
    const [promodata, setPromoData] = useState(JSON.parse(cwmm.promodata));

    return (
        <Modal
            className="cwmm-popup"
            //   title="Unlock all the PRO features"
            onRequestClose={() => handleChange({ showProModal: false })}
        >
            {promodata.discount_image ? (
                <img
                    className="discount-img"
                    src={promodata.discount_image}
                    alt="Discount"
                />
            ) : (
                <>
                    <div
                        className="close_btn"
                        onClick={() => handleChange({ showProModal: false })}
                    >
                        <span className="bar bar-1"></span>
                        <span className="bar bar-2"></span>
                    </div>
                    <div class="popupContent">
                        <div className="discount">
                            <div className="proModalImage">
                                {ProModalImage.discountImage}
                            </div>
                            <span className="discount-rate">
                                {promodata.discount}%
                            </span>
                        </div>
                        <div className="content">
                            <h2 className="title">Get Unlimited Access</h2>
                            {/* <p>{modalText}</p> */}
                            <p className="sub-title">
                                Unlock all <strong>premium features</strong> and
                                awesome 😍 customizations for chat widgets
                            </p>
                            <Timer time={promodata.counter_time} />

                            <a
                                href="https://go.wppool.dev/EiRM"
                                target={"_blank"}
                                className="pro-button"
                            >
                                GET PRO
                            </a>
                        </div>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default Promo;
