import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    // Prepare the widget script configuration
    const widgetConfig = {
      width: '80%',
      height: 550,
      symbolsGroups: [
        {
          name: "Indices",
          originalName: "Indices",
          symbols: [
            { name: "BSE:SENSEX" },
            { name: "BSE:BANK" },
            { name: "BSE:ALLCAP" },
            { name: "BSE:IPO" },
          ],
        },
        // Additional symbol groups...
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
    };

    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify(widgetConfig);

    // Append the script to the widget container
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    // Optional: Cleanup function to remove the script when the component unmounts
    return () => {
      const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
      if (widgetContainer) {
        widgetContainer.innerHTML = ''; // Clears the inner HTML removing the script
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{marginLeft : '200px',justifyContent : 'center', justifyItems : 'center' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
