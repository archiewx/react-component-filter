import React, { SFC, CSSProperties } from 'react'
import { withDefaultProps } from '../utils/withDefaultProps'

const defaultProps = {
  className: ''
}

type Props = {
  type: string
  className?: string
  style?: CSSProperties
}

const Icon: SFC<Props> = ({ type, style, className }) => (
  <i className={`iconfont icon-${type} ${className}`} style={style ? style : {}} />
)

export const withDefaultPropsIcon = withDefaultProps(defaultProps, Icon)
