import Widget from "../Widget/Widget";
// import Footer from "./Footer";

const { useEffect } = wp.element;

export default function Preview({
    item,
    tab,
    handleTab,
    handleMobileView,
    handleDesktopView,
    desktopMobileView,
    showAndHideCtaTooltip,
}) {


    return (
        <div className="flex-1 ml-8  flex flex-col mx-auto my-4 sticky top-0">
            {/* <Footer tab={tab} handleTab={handleTab} /> */}
            <h3 className="mt-0 text-xl text-gray-500 mb-4 text-center">
                Preview
            </h3>

            <div
                className={`flex-w-full rounded-lg overflow-hidden cwmm-preview-box ${
                    desktopMobileView ? "" : "mobile-view"
                }`}
            >
                <div className="box-border w-full h-11  flex justify-start items-center space-x-1.5 px-3 cwmm-preview-header">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>

                <div className="relative  border-t-0 w-full preview-height cwmm-preview-icons">
                    <Widget
                        item={item}
                        showAndHideCtaTooltip={showAndHideCtaTooltip}
                        style={{ position: "absolute" }}
                        widgetShowIn = 'preview'
                    />
                </div>
            </div>
            <div className="flex items-center justify-center mt-3">
                <div class="flex items-center devices-label">
                    {/* desktop settings */}
                    <div
                        className={`device-checkbox`}
                        onClick={handleDesktopView}
                    >
                        <input
                            type="checkbox"
                            name="desktopInstagram"
                            className="sr-only"
                        />
                        <label
                            for="desktopInstagram"
                            style={{
                                background: desktopMobileView
                                    ? "#ffffff"
                                    : !desktopMobileView
                                    ? "#eaeff2"
                                    : "#eaeff2",
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                svg-inline=""
                                role="presentation"
                                focusable="false"
                                tabindex="-1"
                            >
                                <path
                                    d="M16.667 15c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667H3.333c-.916 0-1.666.75-1.666 1.667v8.333c0 .917.75 1.667 1.666 1.667h-2.5a.836.836 0 00-.833.833c0 .459.375.834.833.834h18.334a.836.836 0 00.833-.834.836.836 0 00-.833-.833h-2.5zM4.167 5h11.666c.459 0 .834.375.834.833V12.5a.836.836 0 01-.834.833H4.167a.836.836 0 01-.834-.833V5.833c0-.458.375-.833.834-.833z"
                                    fill={
                                        desktopMobileView
                                            ? "#9d3fff99"
                                            : !desktopMobileView
                                            ? "#83A1B7"
                                            : "#83A1B7"
                                    }
                                ></path>
                            </svg>
                        </label>
                    </div>

                    {/* mobile settings */}
                    <div
                        className={`device-checkbox mobile`}
                        onClick={handleMobileView}
                    >
                        <input
                            type="checkbox"
                            name="mobileInstagram"
                            value="mobile"
                            className="sr-only"
                        />
                        <label
                            for="mobileInstagram"
                            style={{
                                background: !desktopMobileView
                                    ? "#ffffff"
                                    : desktopMobileView
                                    ? "#eaeff2"
                                    : "#eaeff2",
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                svg-inline=""
                                role="presentation"
                                focusable="false"
                                tabindex="-1"
                            >
                                <path
                                    d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
                                    fill={
                                        !desktopMobileView
                                            ? "#9d3fff99"
                                            : desktopMobileView
                                            ? "#83A1B7"
                                            : "#83A1B7"
                                    }
                                ></path>
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
