const {ColorPicker: Picker} = wp.components;
const {useState, useEffect} = wp.element;

export default function ColorPicker({name, color, handleChange, widgetName}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (!event.target.matches('.color-picker-wrap, .color-picker-wrap *')) {
                setActive(false);
            }
        });
    });

    var defaultColor = '';
    
    switch (widgetName) {
      case "WhatsApp":
        defaultColor = '#49e670';
        break;
      case "Messenger":
        defaultColor = '#1e88e5';
        break;
      case "Telegram":
        defaultColor = '#3E99D8';
        break;
      case "Phone":
        defaultColor = '#03E78B';
        break;
      case "SMS":
        defaultColor = '#ff549c';
        break;
      case "Instagram":
        defaultColor = 'url(#linear-gradient)';
        break;
      case "WeChat":
        defaultColor = '#45DC00';
        break;
      case "Twitter":
        defaultColor = '#1ab2e8';
        break;
      case "Google Map":
        defaultColor = '#37AA66';
        break;
      case "Slack":
        defaultColor = '#3f0e40';
        break;
      case "Email":
        defaultColor = '#FF485F';
        break;
      case "Skype":
        defaultColor = '#03A9F4';
        break;
      case "Snapchat":
        defaultColor = '#FFE81D';
        break;
      case "LinkedIn":
        defaultColor = '#0077b5';
        break;
      case "Viber":
        defaultColor = '#665CAC';
        break;
      case "Vkontakte":
        defaultColor = '#5076AA';
        break;
      case "Tiktok":
        defaultColor = '#000100';
        break;
      case "Waze":
        defaultColor = '#6ECCEF';
        break;
      case 'Custom LinK':
        defaultColor = '#1E88E5';
        break;
      default:
        defaultColor = '';
    }


    return (
        <div className="flex items-center color-picker-wrap relative">
    
            {active &&
            <div
                className="top-full overflow-hidden color-picker-holder absolute border border-solid border-gray-400 rounded bg-white z-50 mt-[5px] ">
                     
                <Picker
                    color={color? color : '#B78DEB'}
                    onChangeComplete={(value) => {
                        const {r, g, b, a} = value.rgb;
                        handleChange({[name]: `rgba(${r},${g},${b},${a})`});
                    }
                    }
                />
            </div>
            }

            <div className="border-3 border-solid border-primary w-8 h-8 rounded-full mr-3 cursor-pointer"
                 style={{background: color? color : defaultColor}}
                 onClick={() => {
                     setActive(!active)
                 }}
            ></div>

            <button type="button"
                    className="text-white bg-red-400 border-0 rounded-[6px] cursor-pointer p-1 px-2 mr-3 hover:bg-[#ee3737d9]"
                    onClick={() => handleChange({[name]: ''})}
            >
                <span>Reset</span>
            </button>
        </div>
    )

}