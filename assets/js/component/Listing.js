import CustomModalImages from "../../images/imageObject/CustomModalImages";
import CustomModal from "./CustomModal";

const { FormToggle, ToggleControl } = wp.components;
const { useState, useEffect, useRef } = wp.element;

export default function Listing(props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPermanentlyDeleteModal, setShowPermanentlyDeleteModal] =
        useState(false);
    const [showActiveWidgetModal, setShowActiveWidgetModal] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [changeStatus, setChangeStatus] = useState("");
    var statusOnlength = 0;

    const { items, handleChange, deleteItem, updateStatus, settings } = props;

    const deletePopupRef = useRef(null);
    const deletePermanentlyPopupRef = useRef(null);
    const activeStatusPopupRef = useRef(null);

    const handleActiveStatusPopupRef = (e) => {
        if (
            activeStatusPopupRef.current &&
            !activeStatusPopupRef.current.contains(e.target)
        ) {
            setShowActiveWidgetModal(false);
        }
    };

    const handleDeletePopupRef = (e) => {
        if (
            deletePopupRef.current &&
            !deletePopupRef.current.contains(e.target)
        ) {
            setShowDeleteModal(false);
        }
    };

    const handleDeletePermanentlyPopupRef = (e) => {
        if (
            deletePermanentlyPopupRef.current &&
            !deletePermanentlyPopupRef.current.contains(e.target)
        ) {
            setShowPermanentlyDeleteModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDeletePermanentlyPopupRef);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleDeletePermanentlyPopupRef
            );
        };
    }, [handleDeletePermanentlyPopupRef]);

    useEffect(() => {
        document.addEventListener("mousedown", handleDeletePopupRef);
        return () => {
            document.removeEventListener("mousedown", handleDeletePopupRef);
        };
    }, [handleDeletePopupRef]);

    useEffect(() => {
        document.addEventListener("mousedown", handleActiveStatusPopupRef);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleActiveStatusPopupRef
            );
        };
    }, [handleActiveStatusPopupRef]);



    function updateWidgetStatus(id, status, fromToggle = false) {   
            updateStatus(id, "on" === status ? "off" : "on", fromToggle );  
    }

    return (
        <table
            className="mt-3 border-collapse table table-auto border-separate w-full divide-y divide-gray-500 cwmm-table"
            style={{ borderSpacing: "0 0" }}
        >
            <thead>
                <tr className="header">
                    <th className="p-4 border rounded-tl-lg border-slate-300 border-r-0  border-b-0 border-solid">
                        Status
                    </th>
                    <th className="p-4 border border-slate-300 border-l-0 border-b-0 border-r-0 border-solid">
                    Widget Name
                    </th>
                    <th className="p-4 border border-slate-300 border-l-0 border-r-0 border-b-0 border-solid">
                        Created At
                    </th>
                    <th className="p-4 border border-y border-slate-300 border-l-0 border-solid border-b-0 rounded-tr-lg">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                {items.map(({ id, title, status, created_at }) => {

                    if ("on" === status) {
                        statusOnlength++;
                    }

                    return (
                        <>
                            <tr
                                className={`widget-list bg-white${
                                    !cwmm.isAdmin && "on" ===
                                        settings.disable_multivendor_widgets
                                        ? " diabled-vendor-widgets"
                                        : ""
                                }`}
                            >
                                <td className=" p-2 border border-slate-300 border-r border-solid text-center rounded-bl-lg cwmm-switcher">
                                    <div
                                        className={`components-form-toggle ${
                                            "on" === status ? "is-checked" : ""
                                        } ${ !cwmm.isAdmin && "on" ===
                                        settings.disable_multivendor_widgets? 'diabled-switcher' : '' } `}

                                        onClick = { ()=>{
                                            if (!cwmm.isAdmin && "on" ===
                                            settings.disable_multivendor_widgets ){
                                                handleChange({
                                                    showNoticeAnimation: true,
                                                })
                                            }

                                             return;

                                        } }
                                    >
                                        <FormToggle
                                        disabled = { !cwmm.isAdmin && "on" ===
                                        settings.disable_multivendor_widgets ? 'disabled' : '' }
                                            checked={"on" === status}
                                            onChange={() => {
                                                if ("on" === status) {
                                                    updateWidgetStatus(
                                                        id,
                                                        status,
                                                        true
                                                    );
                                                } else if (
                                                    statusOnlength > 0 &&
                                                    "off" === status
                                                ) {
                                                    setChangeStatus(status);
                                                    setUpdateId(id);
                                                    setShowActiveWidgetModal(
                                                        (prevState) =>
                                                            !prevState
                                                    );
                                                } else if (
                                                    statusOnlength == 0 &&
                                                    "off" === status
                                                ) {
                                                    updateWidgetStatus(
                                                        id,
                                                        status,
                                                        true
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </td>
                                <th className={`p-2 border border-slate-300 border-l-0 border-r border-solid text-center ${!cwmm.isAdmin && "on" ===
                                        settings.disable_multivendor_widgets
                                        ? 'dis-color' : ''}`}>
                                    {title && title === "Ex: Widget Name"
                                        ? "Widget Name"
                                        : title}
                                </th>
                                <td className={ `p-2 border border-slate-300 border-l-0 border-r border-solid text-center font-medium ${!cwmm.isAdmin && "on" ===
                                        settings.disable_multivendor_widgets
                                        ? 'dis-color' : ''}`}>
                                    {moment(created_at).format("MMMM Do YYYY")}
                                </td>
                                <td className="p-2 border border-slate-300 border-l-0 border-solid text-center rounded-br-lg">
                                    <button
                                        className="cursor-pointer border-0 mr-3  w-[38px] h-[38px] px-[11px] py-[10px] bg-[#F7F1FF] rounded"
                                        onClick={() =>
                                            handleChange({ isEdit: id })
                                        }
                                    >
                                        {/* <span className="text-primary dashicons dashicons-edit-large mr-2"></span> */}
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M17.3299 3.7059L14.2474 0.61223C13.8451 0.232969 13.3179 0.0153549 12.7661 0.000782175C12.2143 -0.0137906 11.6765 0.175695 11.2549 0.533195L1.12974 10.6949C0.766098 11.0629 0.539677 11.5453 0.488484 12.061L0.00472837 16.7693C-0.0104267 16.9347 0.0109546 17.1014 0.0673479 17.2575C0.123741 17.4136 0.213758 17.5553 0.330982 17.6726C0.436103 17.7772 0.560773 17.86 0.697841 17.9162C0.83491 17.9724 0.981682 18.0008 1.12974 18H1.23099L5.92229 17.5709C6.4362 17.5196 6.91684 17.2923 7.28356 16.9274L17.4087 6.76569C17.8017 6.34902 18.014 5.793 17.9993 5.21946C17.9845 4.64592 17.7438 4.10164 17.3299 3.7059ZM5.71979 15.3128L2.34475 15.6289L2.64851 12.2417L9.00483 5.94146L12.0424 8.98997L5.71979 15.3128ZM13.5049 7.47701L10.4898 4.45108L12.6836 2.19293L15.7549 5.27531L13.5049 7.47701Z"
                                                fill="#A871EC"
                                            />
                                        </svg>
                                    </button>

                                    {status === "on" ? (
                                        <button
                                            className="cursor-pointer w-[38px] px-[11px] py-[10px] h-[38px] bg-[#FFF1F5] border-0 rounded"
                                            onClick={() => {
                                                setShowDeleteModal(
                                                    (prevState) => !prevState
                                                );
                                            }}
                                        >
                                            {/* <span className="text-red-500 dashicons dashicons-trash mr-2"></span> */}
                                            <svg
                                                width="14"
                                                height="18"
                                                viewBox="0 0 14 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                                                    fill="#FC779F"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            className="cursor-pointer w-[38px] px-[11px] py-[10px] h-[38px] bg-[#FFF1F5] border-0 rounded"
                                            onClick={() => {
                                                setShowPermanentlyDeleteModal(
                                                    (prevState) => !prevState
                                                );
                                            }}
                                        >
                                            {/* <span className="text-red-500 dashicons dashicons-trash mr-2"></span> */}
                                            <svg
                                                width="14"
                                                height="18"
                                                viewBox="0 0 14 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                                                    fill="#FC779F"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </td>
                            </tr>

                            {"off" === status && showPermanentlyDeleteModal && (
                                <CustomModal
                                    handleClose={setShowPermanentlyDeleteModal}
                                    ref={deletePermanentlyPopupRef}
                                >
                                    <div className="media">
                                        {CustomModalImages.deleteModalIcon}
                                    </div>

                                    <h4>Delete Permanently?</h4>
                                    <p>
                                        The widget will be deleted permanently
                                        and you will not be able to recover it
                                    </p>

                                    <ul className="buttonGroups">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setShowPermanentlyDeleteModal(
                                                        false
                                                    );
                                                }}
                                                className="btn btn-outline"
                                            >
                                               Cancel
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    deleteItem(id);
                                                    setShowPermanentlyDeleteModal(
                                                        false
                                                    );
                                                }}
                                                className="btn delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </CustomModal>
                            )}

                            {"on" === status && showDeleteModal && (
                                <CustomModal
                                    handleClose={setShowDeleteModal}
                                    ref={deletePopupRef}
                                >
                                    <div className="media">
                                        {CustomModalImages.deleteModalIcon}
                                    </div>

                                    <h4>This widget is currently in use!</h4>
                                    <p>
                                        The widget is currently in use and
                                        deleting it will remove the widget
                                        permanently from your site
                                    </p>

                                    <ul className="buttonGroups">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setShowDeleteModal(false);
                                                }}
                                                className="btn btn-outline"
                                            >
                                               Cancel
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    deleteItem(id);
                                                    setShowDeleteModal(false);
                                                }}
                                                className="btn delete-btn"
                                            >
                                                Delete Active Widget
                                            </button>
                                        </li>
                                    </ul>
                                </CustomModal>
                            )}

                            {"off" === changeStatus && showActiveWidgetModal && (
                                <CustomModal
                                    handleClose={setShowActiveWidgetModal}
                                    ref={activeStatusPopupRef}
                                >
                                    <div className="media">
                                        {CustomModalImages.deleteModalIcon}
                                    </div>

                                    <h4>
                                        Only one widget can be activated at a
                                        time
                                    </h4>
                                    <p>
                                        You can’t activate multiple widgets.
                                        Activating this widget will deactivate
                                        other widget
                                    </p>

                                    <ul className="buttonGroups">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setShowActiveWidgetModal(
                                                        false
                                                    );
                                                }}
                                                className="btn btn-outline"
                                            >
                                               Cancel
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    updateWidgetStatus(
                                                        updateId,
                                                        changeStatus,
                                                        true
                                                    );

                                                    setShowActiveWidgetModal(
                                                        false
                                                    );

                                                    setChangeStatus("");
                                                    setUpdateId("");
                                                }}
                                                className="btn"
                                            >
                                                Activate this widget
                                            </button>
                                        </li>
                                    </ul>
                                </CustomModal>
                            )}
                        </>
                    );
                })}
            </tbody>
        </table>
    );
}
