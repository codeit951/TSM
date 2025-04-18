let widget = null;

export function updateTradingView(containerId, symbol) {
    if (widget) {
        widget.remove();
    }

    try {
        widget = new TradingView.widget({
            width: "100%",
            height: 550,
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "Dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#0b0e11",
            enable_publishing: false,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            container_id: containerId
        });
    } catch (e) {

    }
}

export function disposeTradingView(containerId) {
    if (widget) {
        widget.remove();
        widget = null;
    }
}