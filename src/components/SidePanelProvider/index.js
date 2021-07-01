import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

const TABS = {
  authors: 'AUTHORS',
  bookmarks: 'BOOKMARKS',
  notes: 'NOTES',
  more: 'MORE',
};

// Create Context object.
const SidePanelContext = React.createContext();

const initialNavState = {
  activeTab: TABS.authors,
};

// Export Provider.
export function SidePanelProvider({ nav = initialNavState, children }) {
  const [state, setState] = React.useState({ nav });
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  React.useEffect(() => {
    if (!state.nav) {
    }
  }, [state.nav]);

  return (
    <SidePanelContext.Provider
      value={{ ...state, isOpen, onClose, onOpen, onToggle }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}

// Export useContext Hook.
export function useSidePanel() {
  return React.useContext(SidePanelContext);
}
