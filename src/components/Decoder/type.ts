
export interface TreeNodeType {
  title: string
  nodeType: NodeTypeEnum
  value?: string
  key: string
  children?: TreeNodeType[]
}


/** 节点类型 */
export enum NodeTypeEnum {
  Root = 'root',
  Origin = 'origin',
  Link = 'link',
  Param = 'param',
  ParamKey = 'param-key',
  Hash = 'hash',
}

export const NodeTextMap = {
  [NodeTypeEnum.Root]: '根',
  [NodeTypeEnum.Origin]: '原始',
  [NodeTypeEnum.Link]: '链接',
  [NodeTypeEnum.Param]: '参数',
  [NodeTypeEnum.ParamKey]: '字段',
  [NodeTypeEnum.Hash]: '哈希',
}