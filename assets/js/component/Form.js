import { DataContextConsumer } from "../DataContext";
import CwmmWidgetWrapper from "./CwmmWidgetWrapper";
import Footer from "./form/Footer";
import HeaderTop from "./HeaderTop";
import icons from "./icons";
import WidgetsConfig from "./WidgetsConfig";

export default class Form extends wp.element.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: "widgets",
            preview: true,
            editTitle: false,
            desktopMobileView: true,
            showAndHideCtaTooltip: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.handleMobileView = this.handleMobileView.bind(this);
        this.handleDesktopView = this.handleDesktopView.bind(this);
        this.handleHideShowTooltip = this.handleHideShowTooltip.bind(this);
    }

    // Get initialize widget value
    initWidget(key) {
        const widget = WidgetsConfig(key);

        const icon = "";
        const name = widget.name;
        const color = widget.color;
        const value = "";
        const mobile = "on";
        const desktop = "on";
        const hoverText = widget.name;

        return { icon, name, color, value, mobile, desktop, hoverText };
    }

    //checking if the CTA Input has a value or not
    handleHideShowTooltip(e) {
        if (e.target.value === "") {
            this.setState({ showAndHideCtaTooltip: false });
        } else {
            this.setState({ showAndHideCtaTooltip: true });
        }
    }

    //handle mobile view
    handleMobileView() {
        this.setState({
            ...this.state,
            desktopMobileView: false,
        });
    }

    //handle desktop view
    handleDesktopView() {
        this.setState({
            ...this.state,
            desktopMobileView: true,
        });
    }

    // Handle state changes
    handleChange(obj) {
        this.setState(obj);
    }

    // Handle tab changes
    handleTab(e, tab) {
        e.preventDefault();

        this.setState({ tab });
    }

    render() {
        const {
            tab,
            preview,
            editTitle,
            desktopMobileView,
            showAndHideCtaTooltip,
        } = this.state;
        const {
            handleChange,
            handleTab,
            handleMobileView,
            handleDesktopView,
            handleHideShowTooltip,
        } = this;

        let { item, isEdit, children, getItems } = this.props;
        const { id, title, status, widgets, config } = item;

        return (
            <DataContextConsumer>
                {(data) => {
                    const {
                        items,
                        handleChange: handleItems,
                        updateItem,
                        updating,
                        settings,
                    } = data;

                    const handleItem = (obj) => {
                        const key = Object.keys(obj)[0];
                        item[key] = obj[key];

                        const itemIndex = items.findIndex(
                            ({ id }) => id == item.id
                        );

                        items[itemIndex] = item;

                        handleItems({ isEdit: item.id, items });
                    };

                    // Handle widgets change
                    const handleWidgets = (key) => {
                        const { initWidget } = this;

                        const widgetIndex = widgets.findIndex(
                            (obj) => obj.name === key
                        );
                        const newWidgets =
                            widgetIndex !== -1
                                ? widgets.filter((obj) => obj.name !== key)
                                : [...widgets, initWidget(key)];

                        handleItem({ widgets: newWidgets });
                    };

                    const handleConfig = (obj) => {
                        const key = Object.keys(obj)[0];
                        config[key] = obj[key];
                        handleItem({ config });
                    };

                    // Widget header condition
                    if ("widgets" === tab) {
                        var wi_title = (
                            <h5>
                                <strong>Step 1:</strong> Choose your channels{" "}
                            </h5>
                        );
                    } else if ("customize" === tab) {
                        var wi_title = (
                            <h5>
                                <strong>Step 2:</strong> Customize your widget{" "}
                            </h5>
                        );
                    } else {
                        var wi_title = (
                            <h5>
                                <strong>Step 3:</strong> Triggers and targeting{" "}
                            </h5>
                        );
                    }

                    return (
                        <>
                            {cwmm.pro_active && cwmm.isAdmin && !cwmm.isPRO && (
                                <HeaderTop />
                            )}
                            <div
                                className={`header-area ${
                                    ("on" ==
                                        settings.disable_multivendor_widgets &&
                                        !cwmm.isAdmin) ||
                                    isEdit
                                        ? "flex"
                                        : ""
                                }  ${
                                    isEdit
                                        ? "bg-white header-stcky"
                                        : "header-widget"
                                } `}
                            >
                                {/* form tabs */}
                                {children}

                                {!!isEdit && (
                                    <>
                                        <div className="cwmm-form-tabs flex justify-center items-center">
                                            {
                                             ( !cwmm.isAdmin  && cwmm.isVendorCustomizer && !cwmm.isVendorTriggers) || ( !cwmm.isAdmin && !cwmm.isVendorCustomizer && cwmm.isVendorTriggers)  ? (
                                                <div className="progress-bar CustomizerTriggers">
                                                    <div
                                                        className="progress"
                                                        style={{
                                                            width: [
                                                                "customize",
                                                            ].includes(tab)
                                                                ? "100%"
                                                                : "50%",
                                                            background:
                                                                [
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(
                                                                    tab
                                                                ) &&
                                                                widgets.filter(
                                                                    (widget) =>
                                                                        widget.value !=
                                                                        ""
                                                                ).length
                                                                    ? "#b78deb"
                                                                    : [
                                                                          "customize",
                                                                          "triggers",
                                                                      ].includes(
                                                                          tab
                                                                      ) &&
                                                                      widgets.filter(
                                                                          (
                                                                              widget
                                                                          ) =>
                                                                              widget.value ===
                                                                              ""
                                                                      ).length
                                                                    ? "linear-gradient(90deg, rgb(255, 199, 0) 0%, rgb(183, 141, 235) 50%)"
                                                                    : "#b78deb",
                                                        }}
                                                    ></div>
                                                </div>
                                                
                                            ) : !cwmm.isAdmin && cwmm.isVendorCustomizer && cwmm.isVendorTriggers? (
                                                <div className="progress-bar default">
                                                    <div
                                                        className="progress"
                                                        style={{
                                                            width: [
                                                                "triggers",
                                                            ].includes(tab)
                                                                ? "100%"
                                                                : [
                                                                      "customize",
                                                                      "triggers",
                                                                  ].includes(
                                                                      tab
                                                                  )
                                                                ? "75%"
                                                                : "25%",
                                                            background:
                                                                [
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(
                                                                    tab
                                                                ) &&
                                                                widgets.filter(
                                                                    (widget) =>
                                                                        widget.value !=
                                                                        ""
                                                                ).length
                                                                    ? "#b78deb"
                                                                    : [
                                                                          "customize",
                                                                          "triggers",
                                                                      ].includes(
                                                                          tab
                                                                      ) &&
                                                                      widgets.filter(
                                                                          (
                                                                              widget
                                                                          ) =>
                                                                              widget.value ===
                                                                              ""
                                                                      ).length
                                                                    ? "linear-gradient(90deg, rgb(255, 199, 0) 0%, rgb(183, 141, 235) 50%)"
                                                                    : "#b78deb",
                                                        }}
                                                    ></div>
                                                </div>

                                            ) : (
                                                <div className="progress-bar default">
                                                    <div
                                                        className="progress"
                                                        style={{
                                                            width: [
                                                                "triggers",
                                                            ].includes(tab)
                                                                ? "100%"
                                                                : [
                                                                      "customize",
                                                                      "triggers",
                                                                  ].includes(
                                                                      tab
                                                                  )
                                                                ? "75%"
                                                                : "25%",
                                                            background:
                                                                [
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(
                                                                    tab
                                                                ) &&
                                                                widgets.filter(
                                                                    (widget) =>
                                                                        widget.value !=
                                                                        ""
                                                                ).length
                                                                    ? "#b78deb"
                                                                    : [
                                                                          "customize",
                                                                          "triggers",
                                                                      ].includes(
                                                                          tab
                                                                      ) &&
                                                                      widgets.filter(
                                                                          (
                                                                              widget
                                                                          ) =>
                                                                              widget.value ===
                                                                              ""
                                                                      ).length
                                                                    ? "linear-gradient(90deg, rgb(255, 199, 0) 0%, rgb(183, 141, 235) 50%)"
                                                                    : "#b78deb",
                                                        }}
                                                    ></div>
                                                </div>
                                            ) }

                                            {/* {cwmm.isAdmin ||
                                            cwmm.isVendorCustomizer ||
                                            cwmm.isVendorTriggers ? (
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress"
                                                        style={{
                                                            width: [
                                                                "triggers",
                                                            ].includes(tab)
                                                                ? "100%"
                                                                : [
                                                                      "customize",
                                                                      "triggers",
                                                                  ].includes(
                                                                      tab
                                                                  )
                                                                ? "75%"
                                                                : "25%",
                                                            background:
                                                                [
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(
                                                                    tab
                                                                ) &&
                                                                widgets.filter(
                                                                    (widget) =>
                                                                        widget.value !=
                                                                        ""
                                                                ).length
                                                                    ? "#b78deb"
                                                                    : [
                                                                          "customize",
                                                                          "triggers",
                                                                      ].includes(
                                                                          tab
                                                                      ) &&
                                                                      widgets.filter(
                                                                          (
                                                                              widget
                                                                          ) =>
                                                                              widget.value ===
                                                                              ""
                                                                      ).length
                                                                    ? "linear-gradient(90deg, rgb(255, 199, 0) 0%, rgb(183, 141, 235) 50%)"
                                                                    : "#b78deb",
                                                        }}
                                                    ></div>
                                                </div>
                                            ) : null} */}

                                            {(cwmm.isAdmin ||
                                                cwmm.isVendorCustomizer ||
                                                cwmm.isVendorTriggers) && (
                                                <>
                                                    <div
                                                        className={`tab-item cursor-pointer flex flex-col items-center relative ${ (cwmm.isVendorCustomizer && cwmm.isVendorTriggers) ? 'custom-min-height' : null
                                                         }`}
                                                        onClick={(e) =>
                                                            handleTab(
                                                                e,
                                                                "widgets"
                                                            )
                                                        }
                                                    >
                                                        <button
                                                            type={"button"}
                                                            className={`cursor-pointer flex items-center justify-center leading-none rounded-full ${
                                                                [
                                                                    "widgets",
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(tab)
                                                                    ? "bg-white"
                                                                    : "bg-gray-300"
                                                            }`}
                                                        >
                                                            <span className="leading-0 text-xl text-gray-800"></span>
                                                            {[
                                                                "customize",
                                                                "triggers",
                                                            ].includes(tab) &&
                                                            widgets.filter(
                                                                (widget) =>
                                                                    widget.value !=
                                                                    ""
                                                            ).length
                                                                ? icons.solidCircle
                                                                : [
                                                                      "customize",
                                                                      "triggers",
                                                                  ].includes(
                                                                      tab
                                                                  ) &&
                                                                  widgets.filter(
                                                                      (
                                                                          widget
                                                                      ) =>
                                                                          widget.value ===
                                                                          ""
                                                                  ).length
                                                                ? icons.worning
                                                                : icons.solidCircle}
                                                        </button>
                                                        <span
                                                            className={`tab-title mt-2 ${
                                                                [
                                                                    "widgets",
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(tab)
                                                                    ? "text-primary"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            1: Choose Channels
                                                        </span>
                                                    </div>
                                                </>
                                            )}

                                            {(cwmm.isAdmin ||
                                                cwmm.isVendorCustomizer) && (
                                                <>
                                                    <div
                                                        className={`tab-item cursor-pointer flex flex-col items-center relative ${ (cwmm.isVendorCustomizer && cwmm.isVendorTriggers) ? 'custom-min-height' : null
                                                    }`}
                                                        onClick={(e) =>
                                                            handleTab(
                                                                e,
                                                                "customize"
                                                            )
                                                        }
                                                    >
                                                        <button
                                                            type={"button"}
                                                            className={`cursor-pointer flex items-center justify-center  leading-none rounded-full
                                                    ${
                                                        [
                                                            "customize",
                                                            "triggers",
                                                        ].includes(tab)
                                                            ? "bg-primary"
                                                            : "bg-gray-300"
                                                    }`}
                                                        >
                                                            <span className="leading-0 text-xl"></span>
                                                        </button>

                                                        <span
                                                            className={`tab-title mt-2 ${
                                                                [
                                                                    "customize",
                                                                    "triggers",
                                                                ].includes(tab)
                                                                    ? "text-primary"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            2: Customization
                                                        </span>
                                                    </div>
                                                </>
                                            )}

                                            {(cwmm.isAdmin ||
                                                cwmm.isVendorTriggers) && (
                                                <>
                                                    <div
                                                        className={`tab-item cursor-pointer flex flex-col items-center relative ${ (cwmm.isVendorCustomizer && cwmm.isVendorTriggers) ? 'custom-min-height' : null
                                                    }`}
                                                        onClick={(e) =>
                                                            handleTab(
                                                                e,
                                                                "triggers"
                                                            )
                                                        }
                                                    >
                                                        <button
                                                            type={"button"}
                                                            className={`cursor-pointer flex items-center justify-center leading-none rounded-full 
                                                ${
                                                    ["triggers"].includes(tab)
                                                        ? "bg-primary"
                                                        : "bg-gray-300"
                                                }`}
                                                        >
                                                            <span className="leading-0 text-xl"></span>
                                                        </button>

                                                        <span
                                                            className={`tab-title mt-2 ${
                                                                [
                                                                    "triggers",
                                                                ].includes(tab)
                                                                    ? "text-primary"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            3: Triggers
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="next-prev-btn-area">
                                            <Footer
                                                tab={tab}
                                                handleTab={handleTab}
                                                widgets={widgets}
                                                getItems={getItems}
                                                itemId={id}
                                                config={config}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {!!isEdit && (
                                <CwmmWidgetWrapper
                                    item={item}
                                    wi_title={wi_title}
                                    tab={tab}
                                    editTitle={editTitle}
                                    title={title}
                                    config={config}
                                    handleTab={handleTab}
                                    handleItem={handleItem}
                                    handleChange={handleChange}
                                    handleWidgets={handleWidgets}
                                    handleConfig={handleConfig}
                                    handleItems={handleItems}
                                    handleMobileView={handleMobileView}
                                    handleDesktopView={handleDesktopView}
                                    desktopMobileView={desktopMobileView}
                                    showAndHideCtaTooltip={
                                        showAndHideCtaTooltip
                                    }
                                    handleHideShowTooltip={
                                        handleHideShowTooltip
                                    }
                                />
                            )}
                        </>
                    );
                }}
            </DataContextConsumer>
        );
    }
}
