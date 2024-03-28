import React, { useEffect } from 'react';

const TradingViewForexCrossRates = () => {
  useEffect(() => {
    const widgetConfig = JSON.stringify({
      "width": "1100",
      "height": "560",
      "currencies": [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY",
        "INR"
      ],
      "isTransparent": false,
      "colorTheme": "light",
      "locale": "en",
      "backgroundColor": "#ffffff"
    });

    // Create script element and append configuration
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = widgetConfig;

    // Append the script to the widget container
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    // Cleanup to remove script when the component unmounts
    return () => {
      document.querySelector('.tradingview-widget-container__widget').innerHTML = '';
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="tradingview-widget-container" style={{marginTop : '100px'}}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewForexCrossRates;
