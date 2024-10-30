import Tooltip from "./Tooltip";

export default function Uploader({ media, onChange, handleItems, tab }) {
    const isPRO = !!cwmm.isPRO;

    const openUploader = (e) => {
        e.preventDefault();

        if (!isPRO) {
            WPPOOL.Popup("chat_widgets_for_multivendor_marketplaces").show(); 
                                                
            return;
        }

        // Create the media frame.
        const file_frame = (wp.media.frames.file_frame = wp.media({
            title: "Insert image",
            library: {
                type: "image",
            },
            button: {
                text: "Use this image",
            },
            multiple: false,
        }));

        file_frame.on("select", () => {
            const attachment = file_frame
                .state()
                .get("selection")
                .first()
                .toJSON();

            onChange(attachment.url);
        });

        // Finally, open the modal
        file_frame.open();
    };

    const deleteMedia = (e) => {
        e.preventDefault();

        onChange("");
    };

    return (
        <>
            {!media ? (
                <div className="uploadIcon_section">
                    <div className="uploadIcon_and_deleteBtn">
                        <button
                            type={"button"}
                            className={`cursor-pointer ${
                                "customize" === tab
                                    ? "widget-iconselect-item cwmm-uploader-btn bg-[rgba(183,141,235,.2)]"
                                    : "border-0 rounded-[6px] py-[4.2px] px-2 text-white add_img flex items-center bg-[#B78DEB] hover:bg-[#8f59d3]"
                            }`}
                            onClick={openUploader}
                        >
                            {"customize" === tab && (
                                <Tooltip
                                    description={`Please make sure you upload an image file of the following types: PNG/JPEG/JPG/GIF/SVG.`}
                                />
                            )}

                            <svg
                                width={`${"customize" === tab ? "24" : "15"}`}
                                height={`${"customize" === tab ? "24" : "15"}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                svg-inline=""
                                role="presentation"
                                focusable="false"
                                tabindex="-1"
                            >
                                <path
                                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                                    stroke={`${"customize" === tab ? "#B78DEB" : "#fff"}`}
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>

                            {"customize" != tab && (
                                <span className="ml-2 text-[13px]">
                                    Custom icon
                                </span>
                            )}
                        </button>

                        {"customize" === tab && (
                            <div className="widget-icon-radio-wrapper uploader-radio upload-radio">
                                <input
                                    type="radio"
                                    value="widget-icon"
                                    onClick={openUploader}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="custom-icon-after-upload">
                    <div
                        className={`uploaded-media current`}
                        onClick={openUploader}
                    >
                        <img src={media} className="media-preview" />
                    </div>

                    <div className="widget-icon-radio-wrapper">
                        <input
                            type="radio"
                            value="widget-icon"
                            checked="checked"
                            onClick={openUploader}
                        />
                    </div>
                    {isPRO && media && (
                        <button
                            type={"button"}
                            className="media-delete-button"
                            onClick={deleteMedia}
                        >
                            Remove Image
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
