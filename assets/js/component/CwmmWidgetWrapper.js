import Customize from "./form/Customize";
import Preview from "./form/Preview";
import Triggers from "./form/Triggers";
import Widgets from "./form/Widgets";

export default class Form extends wp.element.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleInput: React.createRef(null),
        };
    }

    render() {
        let {
            wi_title,
            tab,
            editTitle,
            handleTab,
            handleItem,
            handleChange,
            handleWidgets,
            handleConfig,
            handleItems,
            item,
            handleMobileView,
            handleDesktopView,
            desktopMobileView,
            showAndHideCtaTooltip,
            handleHideShowTooltip,
        } = this.props;
        const { id, title, status, widgets, config } = item;
        const { titleInput } = this.state;
     
        return (
            <div className="cwmm-widget-wrapper">
                <div className="widget-header">{wi_title}</div>
                <div className="flex cwmm-widget-padding">
                    <div className="controls-content box-border widget-left widget-left-width border-r-2 border-0">
                        <div className="border-right pt-8 pb-8">
                            {/* form header */}
                            {"widgets" === tab ? (
                                <div className="flex w-full justify-between cwmm-title-area">
                                    <div>
                                    <span className="mr-2 font-medium widget-title block mb-[15px]"> Widget Name </span>
                                    
                                        <input
                                            ref={titleInput}
                                            type="text"
                                            name={`title`}
                                            value={title}
                                            placeholder="Widget Name"
                                            onChange={(e) =>
                                                handleItem({
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {"widgets" === tab && (
                                <Widgets
                                    widgets={widgets}
                                    config={config}
                                    handleWidgets={handleWidgets}
                                    handleConfig={handleConfig}
                                    handleChange={handleChange}
                                    handleItems={handleItems}
                                    editTitle={editTitle}
                                />
                            )}

                            {"customize" === tab && (
                                <Customize
                                    config={config}
                                    widgets={widgets}
                                    handleConfig={handleConfig}
                                    handleItems={handleItems}
                                    tab={tab}
                                    handleHideShowTooltip={
                                        handleHideShowTooltip
                                    }
                                />
                            )}

                            {"triggers" === tab && (
                                <Triggers
                                    config={config}
                                    handleConfig={handleConfig}
                                    handleItems={handleItems}
                                />
                            )}
                        </div>
                    </div>
                    {
                        <Preview
                            item={item}
                            tab={tab}
                            handleTab={handleTab}
                            handleWidgets={handleWidgets}
                            handleMobileView={handleMobileView}
                            handleDesktopView={handleDesktopView}
                            desktopMobileView={desktopMobileView}
                            showAndHideCtaTooltip={showAndHideCtaTooltip}
                        />
                    }
                </div>
            </div>
        );
    }
}
