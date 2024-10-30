import classNames from "classnames";
import { DataContextConsumer } from "../DataContext";
import Tooltip from "./form/Tooltip";

import Loader from "./Loader";
const { useState, useEffect } = wp.element;

// const { Spinner } = wp.components;

export default function Header({ getItems, settings,showNoticeAnimation }) {
    return (
        <DataContextConsumer>
            {(data) => {
                const {
                    updating,
                    isEdit,
                    handleChange,
                    updateItem,
                    items,
                    init,
                } = data;

                return (
                    <>
                    {  'on' == settings.disable_multivendor_widgets && !cwmm.isAdmin && !isEdit && items.length ? (
                    <div className={`disabled-widget-notice flex items-center rounded bg-[#fceaea] ${ showNoticeAnimation? 'disabled-animation' : ''}`}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.00100615 8.99831C0.00138887 7.01698 0.655612 5.09115 1.86219 3.51957C3.06876 1.94799 4.76025 0.81852 6.67424 0.306359C8.58823 -0.205802 10.6177 -0.0720197 12.4479 0.686953C14.2782 1.44593 15.8067 2.78766 16.7966 4.50402C17.7864 6.22039 18.1822 8.21543 17.9225 10.1797C17.6628 12.1439 16.7621 13.9675 15.3602 15.3677C13.9583 16.7678 12.1336 17.6662 10.169 17.9234C8.20445 18.1807 6.20991 17.7824 4.49478 16.7904L0.987958 17.9604C0.858397 18.0036 0.719484 18.0107 0.586209 17.9808C0.452934 17.9509 0.330359 17.8851 0.231713 17.7906C0.133068 17.6962 0.0620973 17.5765 0.0264616 17.4447C-0.00917421 17.3128 -0.00812194 17.1737 0.0295048 17.0424L1.09745 13.3061C0.376012 11.985 -0.00106847 10.5035 0.00100615 8.99831ZM10.1255 13.1231C10.1255 12.8248 10.007 12.5386 9.79602 12.3277C9.58505 12.1167 9.29892 11.9982 9.00056 11.9982C8.70221 11.9982 8.41608 12.1167 8.20511 12.3277C7.99414 12.5386 7.87562 12.8248 7.87562 13.1231C7.87562 13.4215 7.99414 13.7076 8.20511 13.9186C8.41608 14.1295 8.70221 14.2481 9.00056 14.2481C9.29892 14.2481 9.58505 14.1295 9.79602 13.9186C10.007 13.7076 10.1255 13.4215 10.1255 13.1231ZM9.73853 4.36354C9.70514 4.17913 9.60391 4.0139 9.45479 3.90039C9.30566 3.78688 9.11944 3.73332 8.9328 3.75026C8.74616 3.76719 8.57262 3.85339 8.44635 3.99188C8.32009 4.13037 8.25026 4.31112 8.2506 4.49853V9.74827L8.2626 9.88327C8.29599 10.0677 8.39721 10.2329 8.54634 10.3464C8.69546 10.4599 8.88168 10.5135 9.06833 10.4966C9.25497 10.4796 9.42851 10.3934 9.55477 10.2549C9.68104 10.1164 9.75087 9.93568 9.75053 9.74827V4.49853L9.73853 4.36354Z" fill="#FF2E53"/>
                        </svg>

                        <h1 className="ml-[10px] font-semibold text-[16px] text-[#FF2E53]">Chat widgets are currently disabled by admin</h1>
                    </div>) : ''
                     }

                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center"
                            onClick={() => {
                                handleChange({ isEdit: false, init: true });
                                getItems();
                            }}
                        >
                            {isEdit && (
                                <button
                                    onClick={() => {
                                        handleChange({
                                            isEdit: false,
                                            init: true,
                                        });
                                        getItems();
                                    }}
                                    className={`cursor-pointer bg-transparent border border-solid border-primary rounded-[.375rem] p-3  text-primary  h-[42px] font-medium back-to-dashboard hover:bg-primary  hover:text-white`}
                                >
                                    <span className="ml-2">
                                        Back to Dashboard
                                    </span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center cwmm-spinner">
                            {/* {updating && <Spinner />} */}
                            {updating && <Loader />}

                            {items.length
                                ? !!isEdit || (
                                      <>
                                      {  'on' == settings.disable_multivendor_widgets &&  cwmm.isAdmin  && (
                                        <Tooltip
                                              description={`All multivendor widgets are disabled. To enable them please ${ cwmm.isAdmin ? 'go to settings page.' : 'ask admin.'} `}
                                              disable_widgets={
                                                  settings.disable_multivendor_widgets
                                              }
                                          />
                                      ) } 
                                                                           
                                          <button
                                              type="button"
                                              className={classNames(
                                                  "border-0 rounded-[.375rem] p-3 bg-primary text-white dashboard-cn-btn",
                                                  {
                                                      disabled:
                                                          !cwmm.isPRO &&
                                                          items.length,
                                                  }
                                              )}
                                              onClick={() => {
                                                  if (
                                                      !cwmm.isPRO &&
                                                      items.length
                                                  ) {
                                    
                                                    cwmm.isAdmin ? (
                                                        WPPOOL.Popup("chat_widgets_for_multivendor_marketplaces").show()
                                                    ) : (
                                                          handleChange({
                                                          showProModal: true,
                                                      })
                                                    )
                                                      return;
                                                  }

                                                  handleChange({
                                                      isEdit: true,
                                                  });
                                              }}
                                          >
                                        <span className="dashicons dashicons-plus-alt mr-2"></span>
                                          Create new widget
                                              
                                          </button>

                                          {!cwmm.isPRO && items.length && cwmm.isAdmin && (<button
                                              type="button"
                                              className={classNames(
                                                  "border border-solid border-[#FC779F] rounded-[.375rem] py-[0.70rem] px-[1.8rem] ml-[16px]  text-[#FC779F] cursor-pointer  bg-transparent upgradeBtn flex"
                                              )}
                                              onClick={() => {
                                                
                                                WPPOOL.Popup("chat_widgets_for_multivendor_marketplaces").show(); 
                                                
                                                return;

                                              }}
                                          >
                                          <span className="mr-2">
                                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.5 9V16H3.5C2.86528 16.0001 2.25429 15.7588 1.79095 15.325C1.32762 14.8912 1.04664 14.2974 1.005 13.664L1 13.5V9H6.5ZM13 9V13.5C13.0001 14.1347 12.7588 14.7457 12.325 15.209C11.8912 15.6724 11.2974 15.9534 10.664 15.995L10.5 16H7.5V9H13ZM9 3.63974e-06C9.46445 -0.000135784 9.91976 0.129109 10.3149 0.373245C10.71 0.617381 11.0293 0.966756 11.2369 1.38219C11.4446 1.79763 11.5324 2.2627 11.4906 2.72526C11.4487 3.18783 11.2789 3.62958 11 4.001L13 4C13.2652 4 13.5196 4.10536 13.7071 4.2929C13.8946 4.48043 14 4.73479 14 5V7C14 7.26522 13.8946 7.51957 13.7071 7.70711C13.5196 7.89465 13.2652 8 13 8H7.5V4H6.5V8H1C0.734784 8 0.48043 7.89465 0.292893 7.70711C0.105357 7.51957 0 7.26522 0 7V5C0 4.73479 0.105357 4.48043 0.292893 4.2929C0.48043 4.10536 0.734784 4 1 4L3 4.001C2.80302 3.73836 2.65969 3.43949 2.57822 3.12146C2.49674 2.80342 2.4787 2.47246 2.52513 2.14745C2.57156 1.82245 2.68154 1.50977 2.84881 1.22727C3.01608 0.944772 3.23736 0.697986 3.5 0.501004C3.76264 0.304021 4.06151 0.160698 4.37955 0.0792194C4.69758 -0.00225957 5.02855 -0.0202995 5.35355 0.0261298C5.67856 0.0725591 5.99124 0.182548 6.27373 0.349818C6.55623 0.517087 6.80302 0.73836 7 1.001C7.23222 0.689752 7.53402 0.437129 7.88129 0.263322C8.22856 0.0895141 8.61167 -0.000660284 9 3.63974e-06ZM9 1C8.60218 1 8.22064 1.15804 7.93934 1.43934C7.65804 1.72065 7.5 2.10218 7.5 2.5V4H9C9.39782 4 9.77936 3.84197 10.0607 3.56066C10.342 3.27936 10.5 2.89783 10.5 2.5C10.5 2.10218 10.342 1.72065 10.0607 1.43934C9.77936 1.15804 9.39782 1 9 1ZM5 1C4.61478 1.00019 4.24441 1.14858 3.96561 1.41441C3.68682 1.68025 3.52099 2.04315 3.50248 2.42792C3.48396 2.81269 3.61419 3.18984 3.86618 3.48121C4.11816 3.77257 4.47258 3.95583 4.856 3.993L5 4H6.5V2.5L6.493 2.356C6.4572 1.98484 6.28445 1.64032 6.00842 1.38962C5.73239 1.13892 5.37288 1.00002 5 1Z" fill="#FC779F"/>
                                            </svg>
                                          </span>
                                            Upgrade Now
                                              
                                          </button>)
                                      }  
                                      </>
                                  )
                                : ""}
                        </div>
                    </div>
                    </>
                );
            }}
        </DataContextConsumer>
    );
}
