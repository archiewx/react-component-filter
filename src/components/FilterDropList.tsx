import React, { MouseEvent } from 'react'
import { withDefaultProps } from '../utils/withDefaultProps'
import { withDefaultPropsIcon as Icon } from './Icon'

const initialState = {}

type State = typeof initialState
type Props = {
  onItemClick(option: FilterOptionType): void
  options: Array<FilterOptionType>
  items: FilterOptionType[]
}
const defaultProps: Props = {
  items: [],
  onItemClick: () => {},
  options: []
}

class FilterDropList extends React.Component<Props, State> {
  onItemClick = (option: FilterOptionType) => {
    return (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()
      this.props.onItemClick(option)
    }
  }

  checkSelect = (option: FilterOptionType) => {
    const { items } = this.props
    return items.findIndex((cv) => cv.value === option.value) !== -1 ? 'visible' : 'hidden'
  }

  render() {
    const { options } = this.props
    return (
      <div className="drop-list">
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={this.onItemClick(option)}>
              <a>
                <span title={option.name}>{option.name} </span>
                <Icon
                  type="check"
                  style={{ visibility: this.checkSelect(option) }}
                  className="item-icon"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, FilterDropList)
