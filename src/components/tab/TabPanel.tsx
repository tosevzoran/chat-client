import React, { createContext, useState } from 'react';
import BaseButton from 'components/button/Base';

type TabIdType = number | string | undefined;
type TabContextProps = {
  changeTab: (tabId: TabIdType) => void;
  activeTabId: TabIdType;
};
type TabPanelType<P = TabPanelProps> = React.FC<P> & {
  TabContent: React.FC<TabProps>;
  TabHeader: React.FC<TabProps>;
};
interface TabProps {
  tabId: TabIdType;
  className?: string;
}
interface TabPanelProps {
  defaultTabId?: TabIdType;
}

const context = createContext<TabContextProps>({
  changeTab: (tabId: TabIdType) => {},
  activeTabId: undefined,
});

const { Provider, Consumer } = context;

const TabHeader: React.FC<TabProps> = ({ tabId, children, className }) => (
  <Consumer>
    {({ changeTab, activeTabId }) => {
      let classes = className;

      if (activeTabId === tabId) {
        classes += ' active';
      }

      return (
        <BaseButton
          type="button"
          className={classes}
          onClick={() => changeTab(tabId)}
        >
          {children}
        </BaseButton>
      );
    }}
  </Consumer>
);

const TabContent: React.FC<TabProps> = ({ tabId, children }) => (
  <Consumer>
    {({ activeTabId }) => (activeTabId === tabId ? children : null)}
  </Consumer>
);

const TabPanel: TabPanelType = ({ children, defaultTabId }) => {
  const [activeTabId, setActiveTabId] = useState<TabIdType>(defaultTabId);

  const changeTab = (tabId: TabIdType) => {
    setActiveTabId(tabId);
  };

  return <Provider value={{ activeTabId, changeTab }}>{children}</Provider>;
};

TabPanel.TabHeader = TabHeader;
TabPanel.TabContent = TabContent;

export default TabPanel;
