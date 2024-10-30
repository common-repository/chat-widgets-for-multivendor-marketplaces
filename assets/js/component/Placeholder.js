import Icons from "./icons";
import StartPage from "./StartPage";

const { useState, useEffect } = wp.element;

export default function Placeholder(props) {
    const { handleChange, updateSettings,getSettings, item, isEdit } = props;
    const [modeSwitch, setModeSwitch] = useState(true);
    const [modeName, setModeName] = useState('');
    
      
    return (
        <>
            { cwmm.isAdmin && modeSwitch && !cwmm.settings.vendor_enable ? (
                <StartPage
                    modeSwitch={modeSwitch}
                    setModeSwitch={setModeSwitch}
                    updateSettings={updateSettings}
                    setModeName={setModeName}
                />
            ) : (
                <>

                <div className="flex- flex-col justify-center items-center box-border  py-[10.9rem] px-20 mx-auto   text-center no-wi-wrapper bg-white">
                    <div>
                        {/* 👇️ local image */}

                        <div className="startImg">{Icons.no_widgets}</div>
                        <h3 style={{ margin: 0 }}>
                            Your dashboard sure looks lonely. <br /> Time to
                            look for people to chat with!
                        </h3>
                        <div className="nowi-btn-wrapper">
                            <a className="wt-btn bg-white no-underline" href={`https://youtu.be/vQPN4PrWRjc`} target="_blank" >
                                <svg
                                    data-v-6cef5c6e=""
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
                                        data-v-6cef5c6e=""
                                        d="M4.167 2.5L15.833 10 4.167 17.5v-15z"
                                        stroke="currentColor"
                                        stroke-width="1.67"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <p>Watch Tutorial</p>
                            </a>
                            <button
                                type="button"
                                className="border-0  p-3 cw-btn bg-primary text-white"
                                onClick={() => {
                                    handleChange({ isEdit: true });
                                }}
                            >
                                Create Widget
                            </button>
                        </div>
                    </div>
                </div>
                </>

            )}
        </>
    );
}
