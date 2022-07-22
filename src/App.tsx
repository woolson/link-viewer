import React from 'react';
import { Tabs } from 'antd';
import { Decoder } from './components/Decoder';
import { History } from './components/History';
import './App.less';

function App() {
  const [link, setLink] = React.useState('')
  const [activeKey, setActiveKey] = React.useState('parser')

  React.useEffect(() => {
    chrome.tabs?.query({active: true, currentWindow: true}, ([currentTab]) => {
      if (currentTab?.url) setLink(currentTab.url)
    });
  }, [])

  return (
    <div className="container box-border p-4">
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tabs.TabPane tab="解析" key="parser">
          <Decoder link={link} setLink={setLink} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="解析历史" key="history">
          <History setLink={(link: string) => {
            setLink(link)
            setActiveKey('parser')
          }} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
