import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import WidgetIcon from "../WidgetIcon";
import ColorPicker from "./ColorPicker";
import fonts from "./fonts.json";
import Tooltip from "./Tooltip";
import Uploader from "./Uploader";
const { __ } = wp.i18n;

const {
    ButtonGroup,
    Button,
    TextControl,
    TextareaControl,
    SelectControl,
    FormToggle,
    RangeControl,
    RadioControl,
} = wp.components;

const { useEffect } = wp.element;

const Customize = ({
    config,
    handleConfig,
    widgets,
    handleItems,
    tab,
    handleHideShowTooltip,
}) => {
    const {
        icon,
        iconsView,
        openMode,
        actionBehavior,
        color,
        position,
        sideSelection,
        bottomSpacing,
        sideSpacing,
        ctaText,
        ctaTextColor,
        ctaBgColor,
        ctaShow,
        attentionEffect,
        pendingMessage,
        whatsappOpen,
        fontFamily,
        size,
        customCss,
    } = config;

    return (
      <div className="w-full flex flex-col">
        {widgets.length > 1 && (
          <>
            <h5 className="cwmm-separator-title">Widget Design and Behavior</h5>
            <div className="flex flex-col mb-4 border-none p-4">
              <span className={`font-medium mb-4 text-base text-gray-500`}>
                Widget Icon
              </span>

              <div className="flex customIconSection">
                {["icon1", "icon2", "icon3", "icon4"].map((key) => {
                  const iconHtml = WidgetIcon(key, 50, "#B78DEB");

                  return (
                    <div className="customize-widget-icon">
                      <span
                        className={`widget-iconselect-item item-display${
                          key === icon ? " current" : ""
                        }`}
                        onClick={() =>
                          handleConfig({
                            icon: key,
                          })
                        }
                        dangerouslySetInnerHTML={{
                          __html: iconHtml,
                        }}
                      ></span>

                      <div className="widget-icon-radio-wrapper">
                        <input
                          type="radio"
                          value="widget-icon"
                          name={icon}
                          checked={key === icon}
                          onClick={() =>
                            handleConfig({
                              icon: key,
                            })
                          }
                        />
                      </div>
                    </div>
                  );
                })}

                <Uploader
                  media={
                    ["icon1", "icon2", "icon3", "icon4"].includes(icon)
                      ? ""
                      : icon
                  }
                  onChange={(icon) => handleConfig({ icon })}
                  handleItems={handleItems}
                  tab={tab}
                />
              </div>
            </div>

            {/*Icon Color*/}
            <div className="flex items-center mb-4 border-none p-4">
              <span className="font-medium text-base mr-3 text-gray-500">
                Icon Color
              </span>
              <ColorPicker
                name="color"
                color={color ? color : "#B78DEB"}
                handleChange={handleConfig}
              />
            </div>

            {/* iconsView */}
            <div className="flex flex-col mb-4 border-none p-4 customizer-switcher icon-view-switcher">
              <span className="text-base font-medium mb-4 text-gray-500">
                Icons View
              </span>

              <ButtonGroup>
                <Button
                  className={"!rounded"}
                  isSecondary={"vertical" !== iconsView}
                  isPrimary={"vertical" === iconsView}
                  onClick={() => handleConfig({ iconsView: "vertical" })}
                >
                  Vertical
                </Button>

                <Button
                  className={"!rounded"}
                  isSecondary={"horizontal" !== iconsView}
                  isPrimary={"horizontal" === iconsView}
                  onClick={() =>
                    handleConfig({
                      iconsView: "horizontal",
                    })
                  }
                >
                  Horizontal
                </Button>
              </ButtonGroup>
            </div>

            {/* openMode */}
            <div className="flex flex-col mb-4 border-none  customize-radio open-mode  p-4">
              <span className="text-base font-medium mb-4 text-gray-500">
                Open Mode
              </span>

              <RadioControl
                selected={openMode}
                options={[
                  {
                    label: "Click to open",
                    value: "click",
                  },
                  {
                    label: "Hover to open",
                    value: "hover",
                  },
                  {
                    label: "Opened by default",
                    value: "default",
                  },
                ]}
                onChange={(openMode) => {
                  handleConfig({ openMode });
                }}
              />
            </div>
          </>
        )}

        {/* position */}
        <div className="flex flex-col mb-4 border-none p-4 customizer-switcher customizer-switcher-position">
          <span className="font-medium mb-4 text-base text-gray-500">
            Position
          </span>

          <ButtonGroup>
            <Button
              className={"!rounded"}
              isSecondary={"left" !== position}
              isPrimary={"left" === position}
              onClick={() => handleConfig({ position: "left" })}
            >
              Left
            </Button>

            <Button
              className={"!rounded"}
              isSecondary={"right" !== position}
              isPrimary={"right" === position}
              onClick={() => handleConfig({ position: "right" })}
            >
              Right
            </Button>

            <Button
              className={"!rounded"}
              isSecondary={"custom" !== position}
              isPrimary={"custom" === position}
              onClick={() => {
                if (!cwmm.isPRO) {
                  cwmm.isAdmin
                    ? WPPOOL.Popup(
                        "chat_widgets_for_multivendor_marketplaces"
                      ).show()
                    : handleItems({
                        showProModal: true,
                      });

                  return;
                }
                handleConfig({ position: "custom" });
              }}
            >
              Custom
            </Button>
          </ButtonGroup>

          {"custom" === position && (
            <div className="flex mt-4 flex-col">
              <div className="flex mb-3 items-center">
                <span className="font-medium mr-3 font-medium">
                  Side selection
                </span>

                <ButtonGroup>
                  <Button
                    className={"!rounded-tl !rounded-bl"}
                    isSecondary={"left" !== sideSelection}
                    isPrimary={"left" === sideSelection}
                    onClick={() =>
                      handleConfig({
                        sideSelection: "left",
                      })
                    }
                  >
                    Left
                  </Button>

                  <Button
                    className={"!rounded-tr !rounded-br"}
                    isSecondary={"right" !== sideSelection}
                    isPrimary={"right" === sideSelection}
                    onClick={() =>
                      handleConfig({
                        sideSelection: "right",
                      })
                    }
                  >
                    Right
                  </Button>
                </ButtonGroup>
              </div>

              <div className="custom-side-selection">
                <div className="flex mb-3">
                  <span className="font-medium mr-3">Bottom Spacing</span>

                  <RangeControl
                    className={`cwmm-range-control`}
                    allowReset
                    resetFallbackValue={30}
                    step={5}
                    value={bottomSpacing}
                    onChange={(bottomSpacing) =>
                      handleConfig({ bottomSpacing })
                    }
                    min={0}
                    max={500}
                  />
                </div>

                <div className="flex mb-3">
                  <span className="font-medium mr-3 ">Side Spacing</span>

                  <RangeControl
                    className={`cwmm-range-control`}
                    allowReset
                    resetFallbackValue={30}
                    step={5}
                    value={sideSpacing}
                    onChange={(sideSpacing) => handleConfig({ sideSpacing })}
                    min={0}
                    max={500}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* animation effects */}
        <div className="flex items-center mb-4 border-none p-4 customizer-select effect-select">
          <div className="flex label-tooltip-wrapper">
            <span className={"mr-3 text-base font-medium text-gray-500"}>
              Attention Effect
            </span>
            <Tooltip
              description={`The attention effect will appear on your site until your website visitors engage with the widget for the first time. After the first engagement, the attention effect will not appear again.`}
            />
          </div>

          <Select
            className={"cwmm-select"}
            value={{
              value: attentionEffect,
              label: !!attentionEffect ? attentionEffect : "Select Effect",
            }}
            onChange={(selected) =>
              handleConfig({ attentionEffect: selected.value })
            }
            options={[
              { value: "bounce", label: "Bounce" },
              { value: "waggle", label: "Waggle" },
              { value: "sheen", label: "Sheen" },
              { value: "spin", label: "Spin" },
              { value: "fade", label: "Fade" },
              { value: "blink", label: "Blink" },
              { value: "pulse", label: "Pulse" },
            ]}
          />
        </div>

        {/* pending message */}
        <div className="flex items-center mb-4 border-none p-4 cwmm-switcher">

          <FormToggle
              checked={"on" === pendingMessage}
              onChange={() => {
                if (!cwmm.isPRO) {
                  cwmm.isAdmin
                    ? WPPOOL.Popup(
                        "chat_widgets_for_multivendor_marketplaces"
                      ).show()
                    : handleItems({
                        showProModal: true,
                      });
                  return;
                }
                handleConfig({
                  pendingMessage: "on" === pendingMessage ? "off" : "on",
                });
              }}
            />

          <div className="flex label-tooltip-wrapper pending-sms-tooltip">
            <span className={"ml-3 text-base font-medium text-gray-500"}>
              Pending Message
            </span>
            <Tooltip
              description={`Increase your click-rate by displting a pending messages icon near your Chaty widget to let your visitors know that you're waiting for them to contact you.`}
            />
          </div>

          
          {!!cwmm.isPRO || (
            <span
              className={"cwmm-badge"}
              onClick={() => {
                if (!cwmm.isPRO) {
                  cwmm.isAdmin
                    ? WPPOOL.Popup(
                        "chat_widgets_for_multivendor_marketplaces"
                      ).show()
                    : handleItems({
                        showProModal: true,
                      });
                  return;
                }
              }}
            >
              PRO
            </span>
          )}
        </div>

        {/* widget-size */}
        <div className="flex items-center mb-4 border-none p-4 customize-widget-size">
          <span className={"mr-3 text-base font-medium text-gray-500"}>
            Widget Size
          </span>

          <RangeControl
            className={`cwmm-range-control`}
            allowReset
            resetFallbackValue={50}
            step={5}
            value={size}
            onChange={(size) => handleConfig({ size })}
            min={0}
            max={100}
          />
        </div>

        <h5 className="cwmm-separator-title">
          Popup Message Design and Behavior
        </h5>

        {/* call to action text */}
        <div className="flex items-center mb-4 border-none p-4 call-to-action">
          <span className="mr-3  text-base font-medium text-gray-500">
            Call to Action Text
          </span>

          <input
            type={"text"}
            value={ctaText}
            onChange={(e) => {
              handleConfig({ ctaText: e.target.value });
              handleHideShowTooltip(e);
            }}
          />
        </div>

        {/* call to action color */}
        <div className="flex flex-col mb-4 border-none p-4">
          <span className={"mb-4 text-base font-medium text-gray-500"}>
            Call To Action Color
          </span>

          <div className="flex">
            <div className="flex items-center mr-6">
              <span className={"mr-3 font-medium mr-2 text-gray-500"}>
                Text Color
              </span>
              <ColorPicker
                name="ctaTextColor"
                color={ctaTextColor ? ctaTextColor : "#333333"}
                handleChange={handleConfig}
              />
            </div>
            <div className="flex items-center">
              <span className={"mr-3 font-medium mr-2 text-gray-500"}>
                Background Color
              </span>
              <ColorPicker
                name="ctaBgColor"
                color={ctaBgColor ? ctaBgColor : "#ffff"}
                handleChange={handleConfig}
              />
            </div>
          </div>
        </div>

        {/* Action Behavior */}
        <div className="flex flex-col mb-4 border-none  customize-radio action-behavior  p-4">
          <div className="flex behavior-tp label-tooltip-wrapper">
            <span className="text-base font-medium mb-4 text-gray-500 relative">
              Call to Action Behavior
            </span>
            <Tooltip
              description={`Choose how the CTA button would appear. "Hide after first click" hides the CTA button after the first visit. If you select the second option, the CTA stays visible all the time.`}
            />

            <span className={"cwmm-badge new"}>NEW</span>
          </div>

          <RadioControl
            selected={"default" == openMode ? "first_click" : ctaShow}
            options={[
              {
                label: "Hide after first click",
                value: "first_click",
              },
              {
                label: "Show all the time",
                value: "always",
              },
              {
                label: "Never show",
                value: "never_show",
              },
            ]}
            onChange={(ctaShow) => {
              handleConfig({ ctaShow });
            }}
          />
        </div>

        {/* font-family */}
        <div className="flex items-center mb-4 border-none p-4 customizer-select">
          <span className={"mr-3 text-base font-medium text-gray-500"}>
            Font Family
          </span>

          <Select
            className={"cwmm-select"}
            value={{
              value: fontFamily,
              label: !!fontFamily ? fontFamily : "Select Font",
            }}
            onChange={(selected) =>
              handleConfig({ fontFamily: selected.value })
            }
            options={[
              {
                label: "Default",
                options: fonts.Default.map((key) => ({
                  label: key,
                  value: key,
                })),
              },
              {
                label: "Google Fonts",
                options: fonts.GoogleFonts.map((key) => ({
                  label: key,
                  value: key,
                })),
              },
            ]}
          />
        </div>
        <h5 className="cwmm-separator-title">Advance</h5>
        {/* custom-css */}
        <div className="flex flex-col mb-4 border-none p-4">
          <div>
            <span className={"text-base font-medium  text-gray-500"}>
              Custom CSS
            </span>
            {!!cwmm.isPRO || (
              <span
                className={"cwmm-badge"}
                onClick={() => {
                  if (!cwmm.isPRO) {
                    cwmm.isAdmin
                      ? WPPOOL.Popup(
                          "chat_widgets_for_multivendor_marketplaces"
                        ).show()
                      : handleItems({
                          showProModal: true,
                        });
                    return;
                  }
                }}
              >
                PRO
              </span>
            )}
            <div>
              <p className="text-gray-500 mt-[10px]">
                You can use custom CSS to customize the widgets
              </p>
            </div>
            <div
              className="flex mt-[20px]"
              onClick={() => {
                if (!cwmm.isPRO) {
                  cwmm.isAdmin
                    ? WPPOOL.Popup(
                        "chat_widgets_for_multivendor_marketplaces"
                      ).show()
                    : handleItems({
                        showProModal: true,
                      });
                  return;
                }
              }}
            >
              <textarea
                className={`flex-1 rounded border border-gray-400 border-solid`}
                disabled={!cwmm.isPRO}
                rows={7}
                value={customCss}
                onChange={(e) => {
                  handleConfig({ customCss: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
};
export default Customize;
