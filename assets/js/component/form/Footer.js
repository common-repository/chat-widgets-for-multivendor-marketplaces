import MissingPopupImage from "../../../images/imageObject/MissingPopupImage";
import { DataContextConsumer } from "../../DataContext";
import CustomModal from "../CustomModal";
import icons from "../icons";
const { Modal } = wp.components;
const { useState, useEffect, useRef } = wp.element;

export default function Footer({ tab, handleTab, widgets, getItems, itemId, config }) {

    const {
        timeDelay,
        pageScroll,
        exitIntent,
    } = config;

    const [showMissingModal, setShowMissingModal] = useState(false);
   // const [showTigerModal, setShowTigerModal] = useState(false);
    const [dropDownBtn, setDropDownBtn] = useState(false);
    //const [enableTigger, setEnableTigger] = useState(false);
    const dropdownBtnRef = useRef(null);
    const missingpopupRef = useRef(null);
   // const tiggerpopupRef = useRef(null);



    // useEffect(() => {
    //     if( 'on' === timeDelay || 'on' ===  pageScroll || 'on' ===  exitIntent ) {
    //         setEnableTigger(true);
    //     }else{
    //         setEnableTigger(false);
    //     }
    // }, [timeDelay,pageScroll,exitIntent ]);
    


    const handlemMissingpopupRef = (e) => {
        if (
            missingpopupRef.current &&
            !missingpopupRef.current.contains(e.target)
        ) {
            setShowMissingModal(false);
        }
    };

    // const handleTiggerpopupRef = (e) => {
    //     if (
    //         tiggerpopupRef.current &&
    //         !tiggerpopupRef.current.contains(e.target)
    //     ) {
    //         setShowTigerModal(false);
    //     }
    // };

    const handleToggleDropdownButton = (e) => {
        if (
            dropdownBtnRef.current &&
            !dropdownBtnRef.current.contains(e.target)
        ) {
            setDropDownBtn(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handlemMissingpopupRef);
        return () => {
            document.removeEventListener("mousedown", handlemMissingpopupRef);
        };
    }, [handlemMissingpopupRef]);

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleTiggerpopupRef);
    //     return () => {
    //         document.removeEventListener("mousedown", handleTiggerpopupRef);
    //     };
    // }, [handleTiggerpopupRef]);

    useEffect(() => {
        document.addEventListener("mousedown", handleToggleDropdownButton);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleToggleDropdownButton
            );
        };
    }, [handleToggleDropdownButton]);

    return (
        <DataContextConsumer>
            {(data) => {
                const {
                    updating,
                    updateItem,
                    isEdit,
                    handleChange,
                    items,
                    init,
                } = data;

                return (
                    <div className="flex w-full justify-between next-prev-wrapper">
                        {  cwmm.isAdmin || cwmm.isVendorCustomizer || cwmm.isVendorTriggers ? ( 
                        
                        <>
                          
                          <button
                            type="button"
                            disabled={"widgets" === tab}
                            className={`cursor-pointer rounded-[.375rem] h-[42px] bg-transparent border border-solid py-1 px-3 flex items-center ${
                                "widgets" !== tab
                                    ? "border-primary text-primary btn-hover"
                                    : "gray-tab-border text-gray-400 cursor-disabled"
                            } `}
                            onClick={(e) => {
                                document.querySelector(".cwmm-form-tabs");
                                // .scrollIntoView({ behavior: "smooth" });
                                handleTab(
                                    e,
                                    (cwmm.isAdmin || cwmm.isVendorCustomizer) && "triggers" == tab ? "customize" :  "widgets"
                                );
                            }}
                        >
                            {icons.backBtn}
                            <span className="ml-2 text-[1rem] leading-[0px]">Back</span>
                        </button>

                        <button
                            disabled={ ( !cwmm.isAdmin && !cwmm.isVendorTriggers && "customize" === tab) || "triggers" === tab}
                            className={`btn-next cursor-pointer rounded-[.375rem] bg-transparent border h-[42px] border-solid border-gray-600 py-1 px-3 flex items-center ${
                                ( !cwmm.isAdmin && !cwmm.isVendorTriggers && "customize" === tab) ||  "triggers" == tab
                                    ? "gray-tab-border text-gray-400 cursor-disabled"
                                    : " text-primary border-primary tab-border btn-hover"
                            }`}
                            onClick={(e) => {
                                document.querySelector(".cwmm-form-tabs");
                                // .scrollIntoView({ behavior: "smooth" });

                                handleTab(
                                    e,
                                    (cwmm.isAdmin || cwmm.isVendorCustomizer) && "widgets" == tab ? "customize" : "triggers"
                                );
                            }}
                        >
                            <span className={` mr-2`}>Next</span>
                            {icons.nextBtn}
                        </button>
                          
                          </>) : null

                        }
                        
                        <div
                            className={`dropdownButtons ${
                                dropDownBtn ? "active" : ""
                            }`}
                            ref={dropdownBtnRef}
                        >
                            <button
                                onClick={() => {
                                    if (
                                       (widgets.filter((widget) => widget.value != "" ).length )) {
                                        updateItem(0 < parseInt(itemId) ? parseInt(itemId) : null);
                                    } else {                                       
                                        setShowMissingModal(
                                            (prevState) => !prevState
                                        );
                                    }

                                    // else if( (widgets.filter(
                                    //     (widget) => widget.value != ""
                                    // ).length ) && !enableTigger){                                      
                                    //     setShowTigerModal(
                                    //         (prevState) => !prevState
                                    //     );
                                    // }
                                    
                                }}
                                className={`cursor-pointer border-0  p-3 save-change`}
                            >
                                {icons.save_icon2}
                                {/* {updating ? "Updating..." : "Save Changes"} */}
                                Save Widget
                            </button>

                            <button
                                className={`cursor-pointer  arrow-btn`}
                                onClick={() =>
                                    setDropDownBtn((prevState) => !prevState)
                                }
                            >
                                {icons.dropdown_arrow_icon}
                            </button>
                            <div className="dropdown_item">
                                <button
                                    className="cursor-pointer border-0 p-3 save-and-close"
                                    onClick={() => {
                                        if (
                                            widgets.filter(
                                                (widget) => widget.value != ""
                                            ).length
                                        ) {
                                            updateItem(0 < parseInt(itemId) ? parseInt(itemId) : null, "footer");
                                        } else {
                                            setShowMissingModal(
                                                (prevState) => !prevState
                                            );
                                        }

                                        
                                    }}
                                >
                                    Save & View Dashboard
                                </button>
                            </div>

                            {showMissingModal && (
                                <CustomModal
                                    handleClose={setShowMissingModal}
                                    ref={missingpopupRef}
                                >
                                    <div className="missing-media">
                                        {MissingPopupImage.missingInput}
                                    </div>
                                    <h2 className="font-[600] text-[18px]" >Fill out at least one channel details</h2>
                                    <p className="font-[600] text-[16px]">
                                        You need to fill out{" "}
                                        <strong>
                                            at least one channel details
                                        </strong>{" "}
                                        to show Chat Widgets on your website
                                    </p>

                                    <ul className="buttonGroups">
                                        {/* <li>
                                            <button
                                                onClick={() => {
                                                    updateItem(0 < parseInt(itemId) ? parseInt(itemId) : null);
                                                    setShowMissingModal(false);
                                                }}
                                                className="btn btn-outline"
                                            >
                                                Save Anyway
                                            </button>
                                        </li> */}
                                        <li>
                                            <button
                                                onClick={(e) => {
                                                    setShowMissingModal(false);
                                                    document.querySelector(".cwmm-form-tabs");

                                                        handleTab(
                                                            e, "widgets"
                                                        );
                                                    }}
                                                className="btn"
                                            >
                                               Fill channel details
                                            </button>
                                        </li>
                                    </ul>
                                </CustomModal>

                                
                            )}

                            { //showTigerModal && (
                                // <CustomModal
                                //     handleClose={setShowTigerModal}
                                //     ref={missingpopupRef}
                                // >
                                //     {/* <div className="missing-media">
                                //         {MissingPopupImage.missingInput}
                                //     </div> */}
                                //     <h2>No trigger was selected</h2>
                                //     <p>
                                //         You need to {" "}
                                //         <strong>
                                //         select a trigger
                                //         </strong>{" "}
                                //         before publishing your widget
                                //     </p>

                                //     <ul className="buttonGroups">
                                //         <li>
                                //             <button
                                //                 onClick={() => {
                                //                     updateItem(0 < parseInt(itemId) ? parseInt(itemId) : null);
                                //                     setShowTigerModal(false);
                                //                 }}
                                //                 className="btn btn-outline"
                                //             >
                                //                 Save Anyway
                                //             </button>
                                //         </li>

                                //         <li>
                                //             <button
                                //                 onClick={(e) =>{
                                //                     setShowTigerModal(false);
                                //                     document.querySelector(".cwmm-form-tabs");
                                //                     handleTab(
                                //                             e, "triggers"
                                //                         );
                                //                 }}
                                //                 className="btn"
                                //             >
                                //                Select Trigger
                                //             </button>
                                //         </li>
                                //     </ul>
                                // </CustomModal>    
                            //)
                            }


                        </div>
                    </div>
                );
            }}
        </DataContextConsumer>
    );
}
