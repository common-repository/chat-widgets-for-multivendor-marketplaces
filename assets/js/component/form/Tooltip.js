export default function Tooltip({ description, disable_widgets }) {
  return (
    <div
      className={`tooltip-wrapper  ${
        disable_widgets && disable_widgets === "on"
          ? "mt-[-2.5rem]  right-[11.8rem]"
          : "mt-[-3.5rem] left-[50px]"
      }`}
    >
      <div className={`cwmm-tooltip ${ !cwmm.isPRO ? 'upgrade' : ''}`}>
        {disable_widgets && disable_widgets === "on" ? (
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.125 17.0611C34.125 7.63892 26.4873 0 17.0634 0C7.6424 0 0.00175465 7.63892 0.00175465 17.0611C0.00175465 19.9541 0.724277 22.7432 2.07882 25.2252L0.0581323 32.2291C-0.0153838 32.484 -0.0192422 32.7538 0.0469586 33.0107C0.113159 33.2675 0.246999 33.5019 0.434542 33.6894C0.622085 33.8769 0.856475 34.0108 1.11331 34.077C1.37014 34.1432 1.64002 34.1393 1.89485 34.0658L8.90347 32.0481C11.7955 33.6266 15.0842 34.3302 18.369 34.0732C16.4934 31.9506 15.4979 29.1927 15.5855 26.3616C15.6731 23.5304 16.8372 20.8393 18.8404 18.8367C20.8436 16.8341 23.5352 15.6709 26.3664 15.5841C29.1976 15.4973 31.9554 16.4935 34.0775 18.3696C34.1087 17.9379 34.125 17.5017 34.125 17.0611Z"
              fill="#FFD7E5"
            />
            <circle cx="26.25" cy="26.25" r="8.75" fill="#FC4486" />
            <path
              d="M27.9967 21.5454L27.5322 27.8242C27.4975 28.294 27.0912 28.6464 26.6248 28.6114C26.2009 28.5796 25.8734 28.2386 25.8432 27.8242L25.3787 21.5454C25.3248 20.8172 25.8672 20.1829 26.5901 20.1287C27.3131 20.0745 27.9428 20.6208 27.9967 21.3489C28.0014 21.4127 28.0008 21.4833 27.9967 21.5454ZM26.6877 29.9507C26.023 29.9507 25.4842 30.4934 25.4842 31.1629C25.4842 31.8323 26.023 32.375 26.6877 32.375C27.3523 32.375 27.8911 31.8323 27.8911 31.1629C27.8911 30.4934 27.3523 29.9507 26.6877 29.9507Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            className="tooltip-icon"
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
              d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666zM10 13.333V10M10 6.667h.008"
              stroke="currentColor"
              stroke-width="2.08"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        )}

        <span
          className={`cwmm-tooltiptext  ${
            disable_widgets && disable_widgets === "on"
              ? "min-w-[230px] top-[50px] px-[10px] py-[12px] disable-tooltip"
              : "min-w-[292px] bottom-[136%] px-[5px] py-[10px] normal-tooltip"
          }`}
        >
          {description}
        </span>
      </div>
    </div>
  );
}
