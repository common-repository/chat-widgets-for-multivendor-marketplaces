export default function WidgetClose({ size }) {
    return (
        <span className="widget-close-btn">
            <svg
                height={size}
                width={size}
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse
                    cx="26"
                    cy="26"
                    rx="26"
                    ry="26"
                    fill="#b78deb"
                ></ellipse>

                <rect
                    width="27.1433"
                    height="3.89857"
                    rx="1.94928"
                    transform="translate(18.35 15.6599) scale(0.998038 1.00196) rotate(45)"
                    fill="white"
                ></rect>
                <rect
                    width="27.1433"
                    height="3.89857"
                    rx="1.94928"
                    transform="translate(37.5056 18.422) scale(0.998038 1.00196) rotate(135)"
                    fill="white"
                ></rect>
            </svg>
        </span>
    );
}
