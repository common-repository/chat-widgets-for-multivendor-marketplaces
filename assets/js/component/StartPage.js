//Styles
import StartPageImage from "../../images/imageObject/StartPageImage";
import "../../scss/components/_startPage.scss";

const { useState } = wp.element;


export default function StartPage({ modeSwitch, setModeSwitch, updateSettings, setModeName }) {

   const [modeType,setModeType] = useState( cwmm.multivendor_active ? 'multivendor' : 'normal');

    return (
      <div className="modeSwitcher">
        <h1 className="heading">How would you like to use the plugin?</h1>
        <div
          className={`modeSwitcher__wrapper flex justify-center ${
            !cwmm.multivendor_active ? "flex-row-reverse" : ""
          }`}
        >
          <label htmlFor="multivendor" className={`${
                cwmm.multivendor_active ? "mr-[30px]" : "cursor-not-allowed disabled-multivendor"} `}>
            <div
              className={`left_content  border border-solid  ${
                modeType === 'multivendor'
                  ? "border-[#D7C0F3] box-shadow"
                  : "border-[#EDEDED]"
              } `}
            >
              <input
                type="radio"
                id="multivendor"
                className="float-right multivendor"
                name="radio-group"
                value="multivendor" 
                checked={ modeType === 'multivendor'}
                onClick={() => setModeType('multivendor')}

                disabled = { !cwmm.multivendor_active ? 'disabled' : '' }
              />
              <div className="media text-center">
                {StartPageImage.multivendorBanner}
              </div>
              <div className="title">
                <h1>Multivendor Mode</h1>
                {cwmm.multivendor_active && <span>Recommended</span>}
              </div>
              <div className="info">
                <p>
                  Use this mode for your Multivendor website. Vendors can add,
                  manage, show and customize chat widgets on their stores
                </p>
              </div>
            </div>
          </label>

          <label htmlFor="normal" className={`${
                !cwmm.multivendor_active ? "mr-[30px]" : ""
              }`}>
            <div
              className={`right_content border border-solid  ${
                modeType === 'normal'
                  ? "border-[#D7C0F3] box-shadow"
                  : "border-[#EDEDED]"
              } `}
            >
              <input
                type="radio"
                id="normal"
                className="float-right normal"
                name="radio-group"
                value="normal" 
                checked={ modeType === 'normal'}
                onClick={() => setModeType('normal')}
              />
              <div className="media text-center">
                {StartPageImage.normalBanner}
              </div>
              <div className="title">
                <h1>Normal Mode</h1>
                {!cwmm.multivendor_active && <span>Recommended</span>}
              </div>
              <div className="info">
                <p>
                  Use this mode to show chat widgets on your website and stay
                  connected with your visitors
                </p>
              </div>
            </div>
          </label>
        </div>
        <div className="continue-btn">
          <button
            className={`vendorMode`}
            onClick={() => {
              setModeSwitch(false);
              updateSettings( modeType );
            }}
          >
            Continue
          </button>
        </div>
      </div>    
    );
}
