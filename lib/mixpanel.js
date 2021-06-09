import React, { createContext, useContext } from 'react';
import mixpanel from 'mixpanel-browser';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

mixpanel.init(publicRuntimeConfig.mixPanelToken);
export const MixPanelContext = createContext();
export const MixPanelProvider = ({ children }) => (
  <MixPanelContext.Provider value={mixpanel}>
    {children}
  </MixPanelContext.Provider>
);

const MixPanel = mixpanel;
export const pageView = (pathname, query) =>
  MixPanel.track('Page View', { pathname, query });

export const useMixPanel = () => {
  const mixPanelContext = useContext(MixPanelContext);
  return {
    searchBy: (value) =>
      mixPanelContext.track('Search', { searchInput: value }),
    link: (element, props) =>
      mixPanelContext.track_links(element, 'Clicked Link', { ...props }),
    interaction: (type, element, props) =>
      mixPanelContext.track(type, { element, ...props }),
  };
};

export default MixPanel;
