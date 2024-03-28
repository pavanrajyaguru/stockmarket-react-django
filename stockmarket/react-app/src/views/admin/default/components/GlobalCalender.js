import React, { useEffect } from 'react';

const TradingViewEventsWidget = () => {
  useEffect(() => {
    // Define the widget's configuration as a JSON string
    const widgetConfig = JSON.stringify({
      "colorTheme": "light",
      "isTransparent": true,
      "width": "1100",
      "height": "530",
      "locale": "en",
      "importanceFilter": "-1,0,1",
      "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
    });

    // Create the script element for the TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = widgetConfig;

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
    <div className="tradingview-widget-container" style={{marginTop : '100px'}}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewEventsWidget;
