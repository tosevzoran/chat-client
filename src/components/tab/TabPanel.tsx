import React, { createContext, useState } from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  line-height: normal;
`;

const TabHeaderWrapper = styled.span``;

const TabHeader: React.FC<TabProps> = ({ tabId, children, className }) => (
  <TabHeaderWrapper>
    <Consumer>
      {({ changeTab, activeTabId }) => {
        let classes = className;

        if (activeTabId === tabId) {
          classes += ' active';
        }

        return (
          <Button
            type="button"
            className={classes}
            onClick={() => changeTab(tabId)}
          >
            {children}
          </Button>
        );
      }}
    </Consumer>
  </TabHeaderWrapper>
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
