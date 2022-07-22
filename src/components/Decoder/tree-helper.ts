import { hasEncode, safeDecode, strIsLink } from "../../helpers"
import { PlainObject } from "../../types"
import { NodeTypeEnum, TreeNodeType } from "./type"

export interface ResolveLinkOptions {
  /** 显示原始链接 */
  showOrigin?: boolean
}

export function decodeLinkToTree (link: string, level = '0', options: ResolveLinkOptions = {}) {
  let url: PlainObject

  try {
    if (!strIsLink(link) && !strIsLink(safeDecode(link))) return []

    if (!strIsLink(link)) {
      link = safeDecode(link)
    }
  } catch {
    return [{
      nodeType: NodeTypeEnum.Origin,
      title: link,
      key: level + '_0'
    }]
  }

  try {
    url = new URL(link)
  } catch (err) {
    url = {} as URL
    const [origin, search] = link.split('?')
    url.origin = origin
    url.pathname = ''
    if (search) {
      const [searchStr, hash] = search.split('#')
      url.searchParams = new URLSearchParams(searchStr)
      if (hash) {
        url.hash = hash
      }
    }
  }

  const urlParamsObj = url.searchParams
    ? Object.fromEntries(url.searchParams)
    : {}

  const baseLink: string = (url.origin !== 'null' ? url.origin : `${url.protocol}`) + url.pathname
  const result: TreeNodeType[] = [
    {
      nodeType: NodeTypeEnum.Origin,
      title: link,
      value: link,
      key: level + '_0'
    },
    {
      nodeType: NodeTypeEnum.Link,
      title: '',
      value: link.includes(baseLink) ? baseLink : baseLink.substring(0, baseLink.length - 1),
      key: level + '_1',
    }
  ]

  if (!options.showOrigin) {
    result.shift()
  }

  if (Object.keys(urlParamsObj).length) {
    let params: TreeNodeType[] = []

    Object.entries(urlParamsObj).forEach(([key, value], index) => {
      if (hasEncode(value) || (value.includes('?') && value.includes('='))) {
        params.push({
          nodeType: NodeTypeEnum.ParamKey,
          title: key,
          key: level + '_2_' + index,
          children: decodeLinkToTree(value, `${level}_0`, options)
        })
      } else {
        params.push({
          nodeType: NodeTypeEnum.ParamKey,
          title: key,
          value: value,
          key: level + '_2_' + index,
        })
      }
    })

    result.push({
      nodeType: NodeTypeEnum.Param,
      title: '',
      key: level + '_2',
      children: params
    })
  }

  if (url.hash) {
    result.push({
      nodeType: NodeTypeEnum.Hash,
      title: '',
      value: decodeURIComponent(url.hash),
      key: level + '_3',
    })
  }

  return level === '0'
    ? [{title: 'root', nodeType: NodeTypeEnum.Root, key: level, children: result}]
    : result
}

export function encodeTreeToLink(data: TreeNodeType, modifier?: (node: TreeNodeType) => string | undefined) {
  const link = data.children?.find(o => o.nodeType === NodeTypeEnum.Link)
  const param = data.children?.find(o => o.nodeType === NodeTypeEnum.Param)
  const hash = data.children?.find(o => o.nodeType === NodeTypeEnum.Hash)

  let linkString = link?.value ?? ''
  if (link && modifier) {
      const newValue = modifier(link)
      linkString = newValue === undefined ? linkString : newValue
  }

  let paramString = ''
  if (param?.children) {
    paramString = param.children.map(o => {
      let paramValue = o.children?.length ? encodeTreeToLink(o, modifier) : (o.value ?? '')
      if (modifier) {
        const newValue = modifier(o)
        paramValue = newValue === undefined ? paramValue : newValue
      }
      return `${o.title}=${encodeURIComponent(paramValue)}`
    }).join('&')
  }

  return linkString + `?` + paramString + (hash ? hash : '')
}
