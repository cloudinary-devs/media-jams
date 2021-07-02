import React from 'react';
import { useDisclosure, useBreakpointValue } from '@chakra-ui/react';

export const TABS = {
  AUTHORS: { value: 'AUTHORS', name: 'Authors' },
  MORE: { value: 'MORE', name: 'Authors' },
  BOOKMARKS: { value: 'BOOKMARKS', name: 'Authors' },
  NOTES: { value: 'NOTES', name: 'Authors' },
};

// Create Context object.
const SidePanelContext = React.createContext();

const smVariant = {
  style: 'drawer',
  navigationButton: true,
  defaultOpen: false,
};
const mdVariant = {
  style: 'sidebar',
  navigationButton: false,
  defaultOpen: true,
};

const initialNavState = {
  tabs: TABS,
  activeTab: TABS.AUTHORS.value,
};
// Export Provider.
export function SidePanelProvider({ nav = initialNavState, children }) {
  const [state, setState] = React.useState({ ...nav });
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const setActiveTab = (tabValue) => {
    console.log(tabValue);
    setState((prevState) => ({
      ...prevState,
      activeTab: TABS[tabValue].value,
    }));
  };

  return (
    <SidePanelContext.Provider
      value={{
        ...state,
        isOpen,
        onClose,
        onOpen,
        onToggle,
        variants,
        setActiveTab,
        activeTab: state.activeTab,
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}

// Export useContext Hook.
export function useSidePanel() {
  return React.useContext(SidePanelContext);
}
