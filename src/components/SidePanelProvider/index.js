import React from 'react';
import { useDisclosure, useBreakpointValue } from '@chakra-ui/react';

const TABS = {
  authors: 'AUTHORS',
  bookmarks: 'BOOKMARKS',
  notes: 'NOTES',
  more: 'MORE',
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
  activeTab: TABS.authors,
};
// Export Provider.
export function SidePanelProvider({ nav = initialNavState, children }) {
  const [state, setState] = React.useState({ nav });
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <SidePanelContext.Provider
      value={{ ...state, isOpen, onClose, onOpen, onToggle, variants }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}

// Export useContext Hook.
export function useSidePanel() {
  return React.useContext(SidePanelContext);
}
