import DatePicker from "react-datepicker";
import Select from "react-select";
import timeZones from "./time-zones.json";
import Tooltip from "./Tooltip";

const { TextControl, FormToggle, SelectControl } = wp.components;
const { useState, useEffect } = wp.element;

export default function Custommize({ config, handleConfig, handleItems }) {
    const {
        timeDelay,
        timeDelayTime,
        pageScroll,
        pageScrollOffset,
        exitIntent,
        excludePages,
        excludeAllPages,
        excludePagesExcept,
        dateScheduling,
        productPage,
        daysHours,
        daysHoursTimezone,
    } = config;

    const pages = cwmm.pages;

    const dayOptions = [
        { value: "all", label: "Everyday of week" },
        { value: 0, label: "Sunday" },
        { value: 1, label: "Monday" },
        { value: 2, label: "Tuesday" },
        { value: 3, label: "Wednesday" },
        { value: 4, label: "Thursday" },
        { value: 5, label: "Friday" },
        { value: 6, label: "Saturday" },
        { value: "st", label: "Sunday to Thursday" },
        { value: "mf", label: "Monday to Friday" },
    ];

    const [ triggersWorks, setTriggersWorks] = useState(false);

    return (
      <div className="w-full flex flex-col">
        <h5 className="cwmm-separator-title">Triggers</h5>
        <div className="trigger-wrapper w-[96.3%]">
          <div className="trigger-top p-5">
            {/* Time Delay */}
            <div className="flex flex-col mb-4 border-none p-4 cwmm-switcher">
              <div className="tigger-switcher flex items-center">
                <FormToggle
                  checked={"on" === timeDelay}
                  onChange={() =>
                    handleConfig({
                      timeDelay: "on" === timeDelay ? "off" : "on",
                    })
                  }
                />
                <div className="flex label-tooltip-wrapper ml-[15px]">
                  <span className="font-medium text-base text-gray-500 mr-[15px]">
                    Time Delay
                  </span>
                  <Tooltip
                    description={` Enabling this feature allows the chat widget to appear on the website after X amount of time.`}
                  />
                </div>               
                
              </div>

              {"on" === timeDelay && (
                <div className="flex items-center justify-start mt-3 ml-[5px]">
                  <span className={"mr-3"}>Display after </span>

                  <input
                    value={timeDelayTime}
                    onChange={(e) =>
                      handleConfig({ timeDelayTime: e.target.value })
                    }
                    type="number"
                    min="0"
                    max="60"
                  />

                  <span className={"ml-3"}>seconds on the page</span>
                </div>
              )}
            </div>

            {/* Page Scroll */}
            <div className="flex flex-col mb-4 border-none p-4 cwmm-switcher">
              <div className="tigger-switcher flex items-center">

               <FormToggle
                  checked={"on" === pageScroll}
                  onChange={() =>
                    handleConfig({
                      pageScroll: "on" === pageScroll ? "off" : "on",
                    })
                  }
                />

                <div className="flex label-tooltip-wrapper ml-[15px]">
                  <span className="font-medium text-base text-gray-500 mr-[15px]">
                    Page Scroll
                  </span>
                  <Tooltip
                    description={`Enabling this feature allows the chat widget to appear on the website after scrolling X% of the page.`}
                  />
                </div>

              </div>

              {"on" === pageScroll && (
                <div className="flex items-center justify-start mt-3 ml-[5px]">
                  <span className={"mr-3"}>Display after </span>
                  <input
                    value={pageScrollOffset}
                    onChange={(e) =>
                      handleConfig({
                        pageScrollOffset: e.target.value,
                      })
                    }
                    type="number"
                    min="0"
                    max="60"
                    disabled={"off" === pageScroll}
                  />

                  <span className={"ml-3"}>% scrolling on the page</span>
                </div>
              )}
            </div>

            {/* Exit Intent */}
            <div className="border-none p-4 cwmm-switcher">
              <div className="flex items-center">
                 <FormToggle
                    checked={"on" === exitIntent}
                    onChange={() =>
                      handleConfig({
                        exitIntent: "on" === exitIntent ? "off" : "on",
                      })
                    }
                  />
                <div className="flex label-tooltip-wrapper ml-[15px]">
                    <span className="font-medium text-base text-gray-500 mr-[15px]">
                      Exit Intent
                    </span>
                    <Tooltip
                      description={`Enabling this feature allows the chat widget to appear when the visitor is about to leave your website.`}
                    />
                </div>
          
              </div>
          
              <p className="w-full mt-3 text-gray-500 mb-0 ml-[5px]">
                Display when visitor is about to leave.
              </p>
            </div>
          </div>
          <div className="trigger-bottom border border-l-0 border-r-0 border-b-0 border-solid border-[#eaeff2] py-3.5 px-5">
            <span className="inline-block">
              <span
                className="flex items-center cursor-pointer inline-block text-[#B78DEB]"
                onClick={() => {
                  setTriggersWorks((prevState) => !prevState);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={` ${
                    triggersWorks ? "rotate-90" : "rotate-0"
                  } transition-[0.3s]`}
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    stroke-width="1.33"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="text-[1rem] leading-[1.5rem] ml-[10px]">
                  How triggers work?
                </span>
              </span>
            </span>
            {triggersWorks && (
              <p className="text-[.875rem] leading-[1.25rem] text-[#49687E] transition-[0.3s]">
                Your chat widget will first appear to the user according to the
                selected trigger. After the widget appeared for the first time,
                it'll always be visible on-load. Because, once the user is aware
                of the widget, the user expects it to always appear.
              </p>
            )}
          </div>
        </div>

        <h5 className="cwmm-separator-title mt-[3rem]">Targeting</h5>
        {/* Exclude Pages */}
        {cwmm.isAdmin && (
          <div className="flex flex-col justify-between flex-wrap mb-4 border-none p-4 customizer-select">
            <div
              className={`flex items-center ${
                "on" === excludeAllPages ? "disabled-select" : ""
              }`}
            >
              <span className="font-medium mr-3 text-base text-gray-500">
                Exclude Pages :{" "}
              </span>

              <Select
                isDisabled={"on" === excludeAllPages}
                isMulti
                className={`cwmm-select`}
                value={
                  excludePages &&
                  excludePages.map((key) => ({
                    label: pages[key],
                    value: key,
                  }))
                }
                onChange={(selected) => {
                  if (!cwmm.isPRO) {
                    cwmm.isAdmin
                      ? WPPOOL.Popup(
                          "chat_widgets_for_multivendor_marketplaces"
                        ).show()
                      : handleItems({
                          showProModal: true,
                          // modalText:"Upgrade to PRO to exclude pages",
                        });
                    return;
                  }

                  handleConfig({
                    excludePages: selected.map((obj) => obj.value),
                  });
                }}
                options={Object.keys(pages).map((key) => ({
                  label: pages[key],
                  value: key,
                }))}
              />

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

            <div className="flex items-center mt-12 cwmm-switcher exclude-all">
              
              <FormToggle
                  // disabled={!cwmm.isPRO}
                  checked={"on" === excludeAllPages}
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
                      excludeAllPages: "on" === excludeAllPages ? "off" : "on",
                    });
                  }}
              />
              
              <span className={"font-medium  ml-3 text-base text-gray-500"}>
                Exclude All :{" "}
              </span>


              <span className={"font-medium ml-6 mr-3"}>Except</span>

              <div
                className={`except-wrapper ${
                  cwmm.isPRO || "off" === excludeAllPages
                    ? "disabled-select"
                    : ""
                }`}
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
                <Select
                  isDisabled={!cwmm.isPRO || "off" === excludeAllPages}
                  isMulti
                  className={`cwmm-select`}
                  value={
                    excludePagesExcept &&
                    excludePagesExcept.map((key) => ({
                      label: pages[key],
                      value: key,
                    }))
                  }
                  onChange={(selected) => {
                    if (!cwmm.isPRO) {
                      cwmm.isAdmin
                        ? WPPOOL.Popup(
                            "chat_widgets_for_multivendor_marketplaces"
                          ).show()
                        : handleChange({
                            showProModal: true,
                          });
                      return;
                    }

                    handleConfig({
                      excludePagesExcept: selected.map((obj) => obj.value),
                    });
                  }}
                  options={Object.keys(pages).map((key) => ({
                    label: pages[key],
                    value: key,
                  }))}
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

            <p className="w-full mt-3 mb-0 text-gray-500">
              Excludes pages to display the chat widgets.
            </p>
          </div>
        )}

        {/* Product Page */}
        {!cwmm.isAdmin && (
          <div className="flex flex-col flex-wrap mb-4 border-none p-4 cwmm-switcher">
            <div className="flex justify-between">
              <span className="font-medium">
                Product Page
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
              </span>

              <FormToggle
                checked={!cwmm.isPRO ? false : "on" === productPage}
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
                  } else {
                    handleConfig({
                      productPage: "on" === productPage ? "off" : "on",
                    });
                  }
                }}
              />
            </div>

            <p className="description">
              Display chat widgets in the single product page vendor info area.
            </p>
          </div>
        )}

        {/* dateScheduling */}
        <div
          className={` ${!!dateScheduling ? "trigger-wrapper w-[96.3%]" : ""} `}
        >
          <div
            className={`flex flex-col justify-between flex-wrap mb-4 border-none ${
              !!dateScheduling ? "p-5" : "p-4"
            }`}
          >
            <div>
              <div className="flex label-tooltip-wrapper">
                <span className="font-medium mb-3 text-base text-gray-500 mr-3">
                  Date Scheduling
                </span>
                <Tooltip
                  description={`Schedule the specific time and date when your Chaty widget appears.`}
                />
              </div>
              <p className="w-full mt-0 mb-3 text-gray-500">
                Schedule the specific time and date when your chat widget
                appears.
              </p>
            </div>

            {!!dateScheduling && (
              <div className={`flex flex-wrap mt-[10px]`}>
                <div className="flex flex-col ">
                  <span className="font-medium mb-2">Timezone: </span>
                  <Select
                    className={"w-48"}
                    value={{
                      label: !!dateScheduling.timeZone
                        ? timeZones[dateScheduling.timeZone]
                        : "Select Timezone",
                      value: dateScheduling.timeZone,
                    }}
                    onChange={(selected) => {
                      handleConfig({
                        dateScheduling: {
                          ...dateScheduling,
                          timeZone: selected.value,
                        },
                      });
                    }}
                    options={Object.keys(timeZones).map((key) => ({
                      label: timeZones[key],
                      value: key,
                    }))}
                  />
                </div>

                <div className="flex flex-col mx-2 ">
                  <span className={"font-medium mb-2"}>
                    Start Date & Time:{" "}
                  </span>

                  <DatePicker
                    className={`!py-1.5 !border-gray-400`}
                    selected={
                      !!dateScheduling.from &&
                      new Date(moment(dateScheduling.from))
                    }
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={(from) => {
                      handleConfig({
                        dateScheduling: {
                          ...dateScheduling,
                          from: moment(from).format(),
                        },
                      });
                    }}
                  />
                </div>

                <div className="flex flex-col ">
                  <span className={"font-medium mb-2"}>End Date & Time: </span>

                  <DatePicker
                    className={`!py-1.5 !border-gray-400`}
                    selected={
                      !!dateScheduling.to && new Date(moment(dateScheduling.to))
                    }
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={(to) => {
                      handleConfig({
                        dateScheduling: {
                          ...dateScheduling,
                          to: moment(to).format(),
                        },
                      });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center">
              <button
                type={"button"}
                className={`mt-3 inline-flex w-max rounded-[8px] py-2 px-3  cursor-pointer items-center  ${
                  !!dateScheduling
                    ? "bg-transparent remove-rules-btn"
                    : "bg-transparent add-rules-btn"
                }`}
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

                  if (!!dateScheduling) {
                    handleConfig({ dateScheduling: null });
                  } else {
                    handleConfig({ dateScheduling: {} });
                  }
                }}
              >
                {!!dateScheduling ? (
                  <>
                    {/* <span className="dashicons dashicons-trash"></span> */}
                    <span>Remove Rules</span>
                  </>
                ) : (
                  <>
                    <span className="dashicons dashicons-plus-alt"></span>
                    <span className="ml-[3px]">Add Rule</span>
                  </>
                )}
              </button>

              {!!cwmm.isPRO || (
                <span
                  className={"cwmm-badge mt-3"}
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
          </div>
        </div>

        {/* daysHours */}
        <div
          className={` ${
            !!daysHours && !!daysHours.length ? "trigger-wrapper w-[96.3%]" : ""
          } `}
        >
          <div
            className={`flex flex-col justify-between flex-wrap mb-4 border-none p-4 ${
              !!daysHours && !!daysHours.length ? "p-5" : "p-4"
            }`}
          >
            <div>
              <div className="flex label-tooltip-wrapper">
                <span className="font-medium mb-3 text-base text-gray-500 mr-3">
                  Day and hours
                </span>
                <Tooltip
                  description={`Display the widget on specific days and hours based on your opening days and hours.`}
                />
              </div>

              <p className="mt-0 text-gray-500">
                Display the widget on specific days and hours based on your
                opening days and hours
              </p>
            </div>

            <div
              className={`day-hours-wrap flex  mt-[10px] ${
                !cwmm.isPRO ? "items-center flex-row" : "items-start flex-col"
              } `}
            >
              {!!daysHours && !!daysHours.length && (
                <div className="flex items-center">
                  <span className={`mr-3 font-medium`}>Timezone: </span>

                  <Select
                    className={"cwmm-select"}
                    value={{
                      label: timeZones[daysHoursTimezone],
                      value: daysHoursTimezone,
                    }}
                    onChange={(selected) => {
                      handleConfig({
                        daysHoursTimezone: selected.value,
                      });
                    }}
                    options={Object.keys(timeZones).map((key) => ({
                      label: timeZones[key],
                      value: key,
                    }))}
                  />
                </div>
              )}

              {!!daysHours &&
                !!daysHours.length &&
                daysHours.map((rule, index) => (
                  <div className="day-from-to-delete flex mt-5">
                    <div class="day-from">
                      <div className="flex flex-col mr-3 day-input">
                        <span className={`mb-2 font-medium`}>Day</span>
                        <Select
                          className={"w-48"}
                          value={{
                            value: rule.day.value,
                            label: dayOptions.find(
                              (it) => it.value === rule.day.value
                            )?.label,
                          }}
                          options={dayOptions}
                          onChange={(day) => {
                            daysHours[index]["day"] = day;
                            handleConfig({
                              daysHours: [...daysHours],
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-medium mb-2`}>From</span>
                        <DatePicker
                          className={`!py-1.5 !border-gray-400`}
                          selected={
                            !!rule.from && new Date(moment(rule.from).format())
                          }
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          onChange={(from) => {
                            daysHours[index]["from"] = moment(from).format();
                            handleConfig({
                              daysHours: [...daysHours],
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="to-delete">
                      <div className="flex flex-col">
                        <span className={`mb-2 font-medium`}>To</span>
                        <DatePicker
                          className={`!py-1.5 !border-gray-400`}
                          selected={
                            !!rule.to && new Date(moment(rule.to).format())
                          }
                          dateFormat="h:mm aa"
                          showTimeSelect
                          showTimeSelectOnly
                          onChange={(to) => {
                            daysHours[index]["to"] = moment(to).format();
                            handleConfig({
                              daysHours: [...daysHours],
                            });
                          }}
                        />
                      </div>
                      {/*remove rule*/}
                      <button
                        type={"button"}
                        className={`cursor-pointer mb-1 ml-2 inline-flex w-max rounded-[8px] py-2 px-3 bg-transparent remove-rules-btn`}
                        onClick={() => {
                          handleConfig({
                            daysHours: daysHours.filter(
                              (rule, key) => key !== index
                            ),
                          });
                        }}
                      >
                        <span>Remove Rules</span>
                      </button>
                    </div>
                  </div>
                ))}

              {/* add rule */}
              <button
                type={"button"}
                className={`cursor-pointer mt-3 inline-flex w-max rounded-[8px] py-2 px-3  bg-transparent add-rules-btn items-center`}
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

                  const initDayHoursConfig = {
                    day: "",
                    from: "",
                    to: "",
                  };

                  handleConfig({
                    daysHours: [...daysHours, initDayHoursConfig],
                  });
                }}
              >
                <span className="dashicons dashicons-plus-alt"></span>
                <span className="ml-[3px]">Add Rule</span>
              </button>
              {!!cwmm.isPRO || (
                <span
                  className={"cwmm-badge mt-3"}
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
          </div>
        </div>
      </div>
    );
}
