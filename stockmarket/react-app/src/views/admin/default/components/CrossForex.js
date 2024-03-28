import React, { useEffect } from 'react';

const TradingViewForexCrossRates = () => {
  useEffect(() => {
    // Define the widget's configuration
    const widgetConfig = {
      width: 550,
      height: 400,
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY"
      ],
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
      backgroundColor: "#ffffff"
    };

    // Create a script element for the TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify(widgetConfig);

    // Append the script to the widget container
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    // Optional: Cleanup function to remove the script when the component unmounts
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

export default TradingViewForexCrossRates;
