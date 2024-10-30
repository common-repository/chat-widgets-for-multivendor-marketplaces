import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import WidgetsConfig from "../WidgetsConfig";
import ColorPicker from "./ColorPicker";
import Tooltip from "./Tooltip";
import Uploader from "./Uploader";

const { __ } = wp.i18n;

const { TextControl, FormToggle } = wp.components;

export default class WidgetControl extends wp.element.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSettings: false,
            showColorPicker: false,
        };
    }

    render() {
        const { showSettings, showColorPicker } = this.state;

        const {
            widget,
            widgets,
            handleChange,
            handleWidgets,
            handleConfig,
            handleItems,
            config,
        } = this.props;

        const { icon, value, color, mobile, desktop, hoverText, name } = widget;
        const { whatsappWeb } = config;

        const { placeholder, description, type } = WidgetsConfig(name);

        const handleWidget = (obj) => {
            const key = Object.keys(obj)[0];
            const value = obj[key];

            const widgetIndex = widgets.findIndex((obj) => obj.name === name);

            widgets[widgetIndex][key] = value;

            handleChange({ widgets });
        };

        const isPRO = !!cwmm.isPRO;

        return (
          <div
            className={`flex flex-col relative cwmm-rounded widget-bg widget-border p-3 pp-3 justify-center mx-6 my-3 individual_widgets`}
          >
            <button
              className="widget-cls-btn bg-transparent cursor-pointer"
              onClick={() => handleWidgets(name)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                svg-inline=""
                role="presentation"
                focusable="false"
                tabindex="-1"
              >
                <path
                  d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.334 1.334 0 01-1.334 1.334H4.667a1.334 1.334 0 01-1.334-1.334V4h9.334z"
                  stroke="#49687E"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>

            <div className="flex items-center">
              {isPRO && !!icon && icon != "default" ? (
                <div class="iconBox_wrapper">
                  <img className="icon-box" src={icon} alt={hoverText} />
                </div>
              ) : (
                <div
                  className="icons"
                  dangerouslySetInnerHTML={{
                    __html: WidgetsConfig(name, "35", color).icon,
                  }}
                ></div>
              )}

              <Tooltip description={description} />
              {"countryInput" === type ? (
                <PhoneInput
                  country={"us"}
                  className="mx-3 cwmm-text-field"
                  placeholder={placeholder}
                  value={value}
                  onChange={(value) => {
                    handleWidget({ value });
                  }}
                  type={type}
                />
              ) : (
                <TextControl
                  className="mx-3 cwmm-text-field"
                  placeholder={placeholder}
                  value={value}
                  onChange={(value) => {
                    handleWidget({ value });
                  }}
                  type={type}
                />
              )}
            </div>

            <div className="flex items-center item-padding">
              <div className="device-text flex items-center mr-4">Show on</div>
              <div class="flex items-center mr-4 devices-label">
                {/* desktop settings */}
                <div
                  className={`device-checkbox ${
                    "on" === desktop ? "device-toggle-is-checked" : ""
                  } `}
                  onClick={() =>
                    handleWidget({
                      desktop: "on" === desktop ? "off" : "on",
                    })
                  }
                >
                  <input
                    type="checkbox"
                    name="desktopInstagram"
                    className="sr-only"
                    checked={"on" === desktop}
                  />
                  <label for="desktopInstagram">
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
                        fill="#83A1B7"
                      ></path>
                    </svg>
                  </label>
                </div>

                {/* mobile settings */}
                <div
                  className={`device-checkbox mobile ${
                    "on" === mobile ? "device-toggle-is-checked" : ""
                  } `}
                  onClick={() =>
                    handleWidget({
                      mobile: "on" === mobile ? "off" : "on",
                    })
                  }
                >
                  <input
                    type="checkbox"
                    name="mobileInstagram"
                    value="mobile"
                    checked={"on" === mobile}
                    className="sr-only"
                  />
                  <label for="mobileInstagram">
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
                        fill="#83A1B7"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              {/* show widget settings */}
              <div
                className={`cursor-pointer border widget-btn-settings border-solid flex items-center p-1 rounded-[6px] ${
                  showSettings ? "border-primary text-primary" : ""
                }`}
                onClick={() => this.setState({ showSettings: !showSettings })}
              >
                <span className="dashicons dashicons-admin-generic"></span>
                <span className="ml-2">{__("Settings", "cwmm")}</span>
              </div>
            </div>

            {showSettings && (
              <div className="flex flex-col items-start setting-content border-b-0 border-r-0 border-l-0 border-t border-solid border-gray-200 mt-6 p-4 ">
                <div className="flex items-center">
                  <span className="mr-2 font-medium setting-content-title w-[11rem]">
                    Icon background
                  </span>

                  <ColorPicker
                    name="color"
                    color={color}
                    handleChange={handleWidget}
                    widgetName={name}
                  />

                  <Uploader
                    media={icon}
                    onChange={(icon) => handleWidget({ icon })}
                    handleItems={handleItems}
                  />
                </div>

                <div className="mt-3 flex items-center">
                  <span className="mr-2 font-medium setting-content-title w-[11rem]">
                    On hover text
                  </span>

                  <input
                    type="text"
                    value={hoverText}
                    onChange={(e) => {
                      handleWidget({ hoverText: e.target.value });
                    }}
                  />
                </div>
                {"WhatsApp" === name && (
                  <div className="cwmm-switcher mt-3 flex items-center mb-[5px]">
                     <div className='relative whatsapp-tooltip w-[11.5rem]'>
                        <span className="mr-2 font-medium setting-content-title ">
                        WhatsApp Web
                        </span>
                        <Tooltip description="This feature allows WhatsApp Web to open directly from the laptop or desktop." />
                     </div>                

                    <FormToggle
                    checked={"on" === whatsappWeb }
                    onChange={() =>
                        handleConfig({
                            whatsappWeb: "on" === whatsappWeb ? "off" : "on",
                        })
                    }
                    />
                    <div className='flex items-baseline'>                     
                       <p className="w-full  text-[#49687] ml-[10px]">
                            Use WhatsApp Web directly on desktop
                        </p>
                      <span className={"cwmm-badge new ml-[1rem]"}>NEW</span>
                    </div>
                    
                  </div>
                )}
              </div>
            )}
          </div>
        );
    }
}
