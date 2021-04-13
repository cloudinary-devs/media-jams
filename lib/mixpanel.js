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

export const useMixPanel = () => {
  const mixPanelContext = useContext(MixPanelContext);
  return {
    searchBy: (value) =>
      mixPanelContext.track('Search', { searchInput: value }),
    pageView: () => mixPanelContext.track('Page View'),
    link: (element) => mixPanelContext.track_links(element, 'Clicked Link', {}),
  };
};

export default MixPanel;
