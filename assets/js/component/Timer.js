import { useTimer } from "react-timer-hook";

export default function Timer({ time }) {
    function getTime() {
        return new Date(time);
    }

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: getTime(),
        onExpire: () => localStorage.removeItem("cwmm_promo_time"),
        autoStart: true,
    });

    return (
        <div className="cwmm-timer-wrap">
            <span className="promotionLabel">Deal Ends In</span>
            <div className="timeElements">
                <div className="time">
                    <span>{days}</span>
                    <span>Days</span>
                </div>
                <div className="time">
                    <span>{hours}</span>
                    <span>Hours</span>
                </div>
                <div className="time">
                    <span>{minutes}</span>
                    <span>Minutes</span>
                </div>
                <div className="time">
                    <span>{seconds}</span>
                    <span>Seconds</span>
                </div>
            </div>
        </div>
    );
}
