import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Input, Tree, Switch, Typography, Result, Button, message, Popover } from 'antd';
import copy from 'copy-to-clipboard';
import QrCode from 'qrcode';
import { encodeTreeToLink, decodeLinkToTree } from './tree-helper';
import { NodeTextMap, NodeTypeEnum, TreeNodeType } from './type';
import { randomInRange } from '../../helpers';
import { HistoryItem } from '../History/types';
import './style.less'

const NODE_CAN_EDIT = `${NodeTypeEnum.Link},${NodeTypeEnum.ParamKey}`

export const Decoder: React.FC<{link: string, setLink: any}> = (props) => {
  const [showOrigin, setShowOrigin] = React.useState(true)
  const [qrcode, setQrCode] = React.useState('')

  const linkObj = props.link
    ? decodeLinkToTree(props.link, '0', { showOrigin })
    : []

  React.useEffect(() => {
    async function onLinkChange() {
      // 正确的数据保存到历史记录
      const today = dayjs().format('YYYY-MM-DD')
      if (props.link) {
        // 生成二维码
        QrCode.toDataURL(props.link).then(setQrCode)
        // 存储历史
        chrome.storage?.sync.get(today, history => {
          const todayHistory: HistoryItem[] = history[today] || []
          if (todayHistory[0]?.link !== props.link) {
            // 更新今日历史
            chrome.storage?.sync.set({
              [today]: [
                { timestamp: Date.now(), link: props.link },
                ...todayHistory,
              ]
            })
          }
        })
      }
    }
    onLinkChange()
  }, [props.link])

  /** 修改节点数据 */
  const onNodeChange = (value: string, nodeData: TreeNodeType) => {
    props.setLink(encodeTreeToLink(linkObj[0], (node: TreeNodeType) => {
      if (nodeData.key === node.key) {
        return value
      }
    }))
  }

  // 自定义渲染节点
  const nodeRender = (nodeData: TreeNodeType) => {
    let prefix: React.ReactNode
    switch (nodeData.nodeType) {
      case NodeTypeEnum.Param:
        prefix = <span className="key flex shrink-0 mr-1.5 break-all">参数</span>
        break

      case NodeTypeEnum.ParamKey:
        prefix = <span className="key flex shrink-0 mr-1.5 break-all">字段(
          <Typography.Paragraph copyable className="!mb-0">
            <span className="font-bold">{decodeURIComponent(nodeData.title)}</span>
          </Typography.Paragraph>
        )</span>
        break

      case NodeTypeEnum.Link:
        prefix = <span className="key shrink-0 mr-1.5 break-all text-yellow-400">链接</span>
        break

      default:
        prefix = <span className={classNames("key shrink-0 mr-1.5 break-all", {
          'text-sky-500': nodeData.nodeType === NodeTypeEnum.Hash,
          'text-gray-500': nodeData.nodeType === NodeTypeEnum.Origin,
        })}>
          {NodeTextMap[nodeData.nodeType]}
        </span>
        break
    }

    return <span className={classNames('flex', 'node__' + nodeData.nodeType)}>
      { prefix }:&nbsp;
      {
        !nodeData.children
          ? <span className={classNames("value shrink-0 mr-1.5 break-all flex-1 w-px", {
              underline: [NodeTypeEnum.Link, NodeTypeEnum.Origin].includes(nodeData.nodeType)
            })}>
              <Typography.Paragraph
                className="!mb-0"
                copyable
                editable={NODE_CAN_EDIT.includes(nodeData.nodeType) ? {
                  onChange: value => onNodeChange(value, nodeData)
                } : false}
                ellipsis={{
                  rows: 1,
                  tooltip: true,
                  expandable: true,
                }}>
                {decodeURIComponent(nodeData.value || '')}
              </Typography.Paragraph>
            </span>
          : null
      }
    </span>
  }

  return <div className="decoder px-0.5">
    <h3 className="relative mt-4 text-center">
      <span className="relative text-base z-10">链接地址</span>
    </h3>
    <div className="">
      <Input.TextArea
        value={props.link}
        rows={6}
        onChange={(e) => props.setLink(e.target.value)}/>
      <div className="flex justify-end mt-2">
        <Button onClick={() => {
          copy(props.link)
          message.success('复制成功')
        }}>复制</Button>
        <Popover
          trigger="click"
          placement="left"
          content={<div className="qrcode"><img src={qrcode} alt="" /></div>}>
          <Button className="ml-2" onClick={() => {
          }}>生成二维码</Button>
        </Popover>
      </div>
    </div>

    <h3 className="relative mt-4 text-center">
      <span className="relative text-base z-10">解析结果</span>
    </h3>
    <div className="mb-4">
      显示原始链接：<Switch checked={!!showOrigin} onChange={setShowOrigin} />
    </div>
    <div className="pl-1.5 py-3 pr-3 bg-gray-50 rounded-lg">
      {
        props.link
          ? typeof linkObj !== 'string' && linkObj.length
            ? <Tree
                key={randomInRange(100)}
                showLine={{showLeafIcon: false}}
                defaultExpandAll
                autoExpandParent
                treeData={linkObj}
                titleRender={nodeRender} />
            : <Result status="error" title="链接解析错误" />
          : <Result status="info" title="请输入链接" />
      }
    </div>
  </div>
}