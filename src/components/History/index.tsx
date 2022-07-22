import React from 'react';
import dayjs from 'dayjs';
import { List, Button, message, Typography } from 'antd';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import { HistoryItem } from './types';
import './style.less';
import { date } from '../../helpers';

    // 初始化读取历史数据，当天的
const TODAY = dayjs().format('YYYY-MM-DD')

function getParseHistory(): Promise<HistoryItem[]> {
  const daies = date.nearlySomeDay()
  return new Promise(resolve => {
    // 读取当天历史记录
    chrome.storage?.sync.get(daies, res => {
      resolve(
        Object.values(res)
          .reduce((prev, next) => prev.concat(Array.isArray(next) ? next : []), [])
          .sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp)
      )
    })
  })
}

export const History: React.FC<{setLink: any}> = (props) => {
  const [history, setHistory] = React.useState<HistoryItem[]>(process.env.NODE_ENV === 'development' ? [
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
    {
      link: 'https://yuque.antfin.com/docs/share/738dc133-198a-4ddf-8650-fc6b6a7fcc18#HSuvd',
      timestamp: Date.now(),
    },
    {
      link: 'evetoken%3A%2F%2Fexternalhandle%3Furl%3Deve%253A%252F%252Fshortminiapp%253Furl%253Dhttps%25253A%25252F%25252Fppe-alsc-kpi-report-h5.faas.ele.me%25252F%26targetUrl%3Dhttps%253A%252F%252Fppe-xy.ele.me%252Fxy-pc',
      timestamp: Date.now(),
    },
  ] : [])

  React.useEffect(() => {
    getParseHistory().then(setHistory)
    // 添加了历史就更新列表
    const onStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange
    }) => getParseHistory().then(setHistory)
    chrome.storage?.onChanged.addListener(onStorageChange)

    return () => chrome.storage?.onChanged.removeListener(onStorageChange)
  }, [])

  return <div className="history">
    <List
      itemLayout="horizontal"
      dataSource={history}
      size="small"
      pagination={{pageSize: 5}}
      renderItem={item => {
        const [date, time] = dayjs(item.timestamp)
          .format('YYYY-MM-DD HH:mm:ss')
          .split(' ')
        return (
          <List.Item
            extra={<>
              <Button
                className='ml-3'
                onClick={() => {
                  copy(item.link)
                  message.success('复制成功')
                }}>复制
              </Button>
              <Button
                className='ml-1.5'
                onClick={() => props.setLink(item.link)}>解析
              </Button></>
            }>
            <List.Item.Meta
              className={classNames({'is-today': date.includes(TODAY)})}
              title={
                <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
                  { item.link }
                </Typography.Paragraph>
              }
              description={<>
                <span className="date mr-2">{date}</span>
                <span className="time">{time}</span>
              </>}
            />
          </List.Item>
        )
      }}
    />
  </div>
}