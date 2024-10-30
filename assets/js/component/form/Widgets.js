import WidgetsConfig from "../WidgetsConfig";
import WidgetClose from "./WidgetClose";
import WidgetControl from "./WidgetControl";

const { useEffect } = wp.element;
export default function Widgets(props) {
    const {
        config,
        widgets,
        handleConfig,
        handleWidgets,
        handleChange,
        handleItems,
    } = props;

    return (
        <div className="w-full flex flex-col">
            <h3 className="mt-0 text-xl text-gray-500">Choose Channels</h3>

            <div className="flex flex-wrap">
                {/* Display all widget icons */}
                {Object.keys(WidgetsConfig()).map((key) => {
                    let active = widgets.find((obj) => obj.name === key);
                    return (
                        <div
                            className={`cursor-pointer group m-2 flex justify-center relative cwmm-single-widget ${
                                active ? "active" : ""
                            }`}
                            onClick={() => {
                                if (
                                    !cwmm.isPRO &&
                                    widgets.length >= 2 &&
                                    !active
                                ) {
                                    WPPOOL.Popup("chat_widgets_for_multivendor_marketplaces").show(); 
                                    return;
                                }

                                handleWidgets(key);
                            }}
                        >
                            {/*tooltip*/}
                            <div className="hidden group-hover:flex -top-8 justify-center absolute py-1 px-3 bg-gray-800 rounded">
                                <span className="whitespace-nowrap text-white">
                                    {key}
                                </span>
                                <span className="arrow-down text-gray-800"></span>
                            </div>

                            <div
                                className="icon-box"
                                dangerouslySetInnerHTML={{
                                    __html: WidgetsConfig(key, 50).icon,
                                }}
                            ></div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col mt-8 cwmm-widget-ml">
                {/* render widgets control for the selected widgets */}
                {widgets.map((widget) => (
                    <WidgetControl
                        handleItems={handleItems}
                        widgets={widgets}
                        handleWidgets={handleWidgets}
                        handleChange={handleChange}
                        handleConfig={handleConfig}
                        widget={widget}
                        config={config}
                    />
                ))}

                {widgets.length > 1 && (
                    <div
                        className={`flex relative cwmm-rounded widget-border p-3 items-center ppp-3 mx-6 my-3`}
                    >
                        <WidgetClose size={40} />

                        <div className="close-input-block ml-2 flex items-baseline flex-col justify-start">
                            <input
                                className="cwmm-hide-input"
                                type="text"
                                value={config.closeHoverText}
                                onChange={(e) => {
                                    handleConfig({
                                        closeHoverText: e.target.value,
                                    });
                                }}
                            />

                            <p className="description">
                                On hover hide button text
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
