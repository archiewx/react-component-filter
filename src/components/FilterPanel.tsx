import * as React from 'react'
import { withDefaultProps } from '../utils/withDefaultProps'

type Props = {
  label: string
  bordered: boolean
  labelExtra: string | React.ReactNode | null
}
const defaultProps: Props = {
  label: '筛选',
  bordered: false,
  labelExtra: null
}

class FilterPanel extends React.Component<Props, object> {
  render() {
    const { label, children, bordered, labelExtra } = this.props
    return (
      <div
        className="filter-panel"
        style={{ borderBottom: bordered ? '1px dashed #efefef' : 'none' }}
      >
        <div className="filter-panel__label">{labelExtra || `${label}:`}</div>
        <div className="filter-panel__wrapper">{children}</div>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, FilterPanel)
