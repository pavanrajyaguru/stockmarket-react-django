import React, { useEffect } from 'react';

const TradingViewTickerTape = () => {
  useEffect(() => {
    // Prepare the widget script configuration
    const widgetConfig = {
      symbols: [
        { description: "", proName: "BINANCE:BTCUSDT" },
        { description: "", proName: "BSE:IPO" },
        { description: "", proName: "BSE:ALLCAP" },
        { description: "", proName: "BSE:SENSEX" },
        { description: "", proName: "OANDA:XAUUSD" },
        { description: "", proName: "NASDAQ:TSLA" },
        { description: "", proName: "NASDAQ:AAPL" },
      ],
      showSymbolLogo: false,
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    };

    // Create a script element for the TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify(widgetConfig);

    // Append the script to the widget container
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
      if (widgetContainer) {
        widgetContainer.innerHTML = ''; // Clears the widget script
      }
    };
  }, []); // The empty array ensures the effect is only run on mount and unmount

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewTickerTape;
