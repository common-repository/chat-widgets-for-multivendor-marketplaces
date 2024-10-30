import classNames from "classnames";
import WidgetsConfig from "../WidgetsConfig";

import "velocity-animate";
import "velocity-animate/velocity.ui.min";
import { VelocityTransitionGroup } from "velocity-react";

import "./style.scss";

const { useState, useEffect } = wp.element;

export default function VendorWidget({
    showAndHideCtaTooltip,
    item: { config, widgets },
    style = {},
}) {
    let {
        color,
        attentionEffect,
        ctaTextColor,
        ctaBgColor,
        fontFamily,
        closeHoverText,
        ctaShow,
        ctaText,
        icon,
        iconsView,
        openMode,
        position,
        sideSelection,
        bottomSpacing,
        sideSpacing,
        pageScroll,
        pageScrollOffset,
        pendingMessage,
        size,
        defaultMsg,
        customCss,
        timeDelay,
        timeDelayTime,
        exitIntent,
    } = config;

    //Loads font-family
    useEffect(() => {
        if (!fontFamily) return;

        if (
            [
                "System Stack",
                "Arial",
                "Tahoma",
                "Verdana",
                "Helvetica",
                "Times New Roman",
                "Trebuchet MS",
                "Georgia",
            ].includes(fontFamily)
        )
            return;

        const cssId = "cwmm-font"; // you could encode the css path itself to generate id..
        const element = document.getElementById(cssId);
        const url = `https://fonts.googleapis.com/css?family=${fontFamily}`;

        if (!element) {
            const head = document.getElementsByTagName("head")[0];
            const link = document.createElement("link");

            link.id = cssId;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            link.media = "all";

            head.appendChild(link);
        } else {
            element.setAttribute("href", url);
        }
    }, [fontFamily]);

    //const iconHtml = WidgetIcon(active ? "close" : icon, size, color);
    const ctaStyle = {
        "--cwmm-cta-color": ctaTextColor ? ctaTextColor : '#333333' ,
        "--cwmm-cta-bg-color": ctaBgColor ? ctaBgColor : '#FFFFFF',
        "--cwmm-font-family": fontFamily,
        "--cwmm-side-spacing": `${"custom" == position ? sideSpacing : 30}px`,
        "--cwmm-bottom-spacing": `${
            "custom" == position ? bottomSpacing : 30
        }px`,
    };

    //check if is mobile
    const isMobile = () => {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    const isPRO = !!cwmm.isPRO;


    return (
        <>
            { !!widgets.length && cwmm.isPRO && 'off' === cwmm.settings.disable_multivendor_widgets && (
                <div
                    className={classNames(
                        "cwmm-vendor-chat-box icons-view-horizontal",
                    )}
                    style={{ ...ctaStyle, ...style }}
                >
                    {isPRO && !!customCss && <style>{customCss}</style>}

                    <VelocityTransitionGroup>
                        { widgets.length ? (
                            <div>
                                <div className="widgets">
                                    {widgets.map(
                                        ({
                                            icon,
                                            name,
                                            color,
                                            mobile,
                                            desktop,
                                            hoverText,
                                            value,
                                        }) => {
                                            if (isMobile() && "on" !== mobile) {
                                                return;
                                            }

                                            if (
                                                !isMobile() &&
                                                "on" !== desktop
                                            ) {
                                                return;
                                            }

                                            if ("WhatsApp" === name) {
                                                value = value.replace("+", "");

                                                if (isMobile()) {
                                                    value = `https://wa.me/${value}`;
                                                } else {
                                                    value = `https://web.whatsapp.com/send?phone=${value}`;
                                                }
                                            } else if ("SMS" === name) {
                                                value = `sms:${value}`;
                                            } else if ("Instagram" === name) {
                                                value = `https://www.instagram.com/${value}`;
                                            } else if ("Telegram" === name) {
                                                value = `https://telegram.me/${value}`;
                                            } else if ("WeChat" === name) {
                                                value = `javascript:;`;
                                                hoverText = `WeChat:${value}`;
                                            } else if ("Phone" === name) {
                                                value = `tel:${value}`;
                                            } else if ("Email" === name) {
                                                value = `mailto:${value}`;
                                            } else if ("Email" === name) {
                                                value = `https://www.snapchat.com/add/${value}`;
                                            } else if ("Snapchat" === name) {
                                                value = `https://www.snapchat.com/add/${value}`;
                                            } else if ("Linkedin" === name) {
                                                value = `https://www.linkedin.com/in/${value}`;
                                            } else if ("Viber" === name) {
                                                value = `viber://chat?number=${value}`;
                                            } else if ("Vkontakte" === name) {
                                                value = `https://vk.me/${value}`;
                                            } else if ("Tiktok" === name) {
                                                value = `https://www.tiktok.com/@${value}`;
                                            }

                                            return (
                                                <a
                                                    href={value}
                                                    target="_blank"
                                                    className="widget-item"
                                                >
                                                    <span className="widget-tooltip">
                                                        {hoverText}
                                                    </span>

                                                    {isPRO &&
                                                    !!icon &&
                                                    "default" != icon ? (
                                                        <img
                                                            className="widget-icon"
                                                            src={icon}
                                                            style={{
                                                                background:
                                                                    color,
                                                                width: size,
                                                                height: size,
                                                            }}
                                                            alt={hoverText}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="widget-icon"
                                                            dangerouslySetInnerHTML={{
                                                                __html: WidgetsConfig(
                                                                    name,
                                                                    size,
                                                                    color
                                                                ).icon,
                                                            }}
                                                        ></span>
                                                    )}

                                                    {widgets.length === 1 &&
                                                        "on" ===
                                                            pendingMessage && (
                                                            <span className="pendingMessage">
                                                                1
                                                            </span>
                                                        )}
                                                </a>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : undefined}
                    </VelocityTransitionGroup>
                   
                </div>
            )}
        </>
    );
}
