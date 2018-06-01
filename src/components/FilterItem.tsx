import React, { MouseEvent, DOMElement, ReactNode } from 'react'
import ReactDom from 'react-dom'
// import 'rc-trigger/assets/index.css'
// import { Icon } from 'antd'
import Trigger from 'rc-trigger'
import { withDefaultProps } from '../utils/withDefaultProps'
import { withDefaultPropsIcon as Icon } from './Icon'

const defaultProps = {
  trigger: TriggerEnum.click,
  popupPlacement: popupEnum.bottomLeft
}
const initialState = {
  iconType: 'down',
  show: false,
  offset: [0, 0],
  popupTransitionName: 'rc-trigger-popup-zoom'
}
type State = typeof initialState

type Props = {
  filter?: FilterType
  trigger: TriggerEnum
  onShow(filter: FilterType): void
  onHide(): void
  popupPlacement: popupEnum
  popup: ReactNode
}

const builtinPlacements = {
  left: {
    points: ['cr', 'cl']
  },
  right: {
    points: ['cl', 'cr']
  },
  top: {
    points: ['bc', 'tc']
  },
  bottom: {
    points: ['tc', 'bc']
  },
  topLeft: {
    points: ['bl', 'tl']
  },
  topRight: {
    points: ['br', 'tr']
  },
  bottomRight: {
    points: ['tr', 'br']
  },
  bottomLeft: {
    points: ['tl', 'bl']
  }
}

class FilterItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      iconType: 'down',
      show: false,
      offset: [0, 0],
      popupTransitionName: 'rc-trigger-popup-zoom'
    }
    // if (props.filter.options.length >= 10) {
    //   this.state.popupTransitionName = {
    //     enter: 'rc-trigger-popup-swipe-enter',
    //     enterActive: 'rc-trigger-popup-swipe-enter-active',
    //     leave: 'rc-trigger-popup-swipe-leave',
    //     leaveActive: 'rc-trigger-popup-swipe-leave-active',
    //     appear: 'rc-trigger-popup-swipe-appear',
    //     appearActive: 'rc-trigger-popup-swipe-appear-active'
    //   }
    // }
  }

  onClick = (e: MouseEvent<HTMLElement>) => {
    if (this.props.trigger !== TriggerEnum.click) {
      return e.preventDefault()
    }
    this.toggleIconType()
  }

  onPopupVisibleChange = () => {
    this.toggleIconType()
  }

  getPopupClassNameFromAlign = () => {
    const { popupPlacement } = this.props
    if (this.isPanelListRender()) {
      return `${popupPlacement}RcPopup`
    }
    return ''
  }

  getPopupContainer = (trigger: Text | HTMLElement) => {
    // if (this.isPanelListRender()) {
    //   // 如果是面包渲染的话
    //   const { parentNode } = trigger
    //   this.setState({
    //     offset: [-trigger.offsetLeft, parentNode.offsetTop]
    //   })
    //   return parentNode.parentNode
    // }
    return document.body
  }
  toggleIconType = () => {
    if (this.state.iconType === 'down') {
      this.setState({
        iconType: 'up',
        show: true
      })
      this.props.onShow && this.props.onShow(this.props.filter)
    } else {
      this.setState({
        iconType: 'down',
        show: false
      })
      this.props.onHide && this.props.onHide()
    }
  }

  isPanelListRender = () => {
    return this.props.filter.options.length >= 10
  }

  preventDefault = (e: MouseEvent<HTMLElement>) => {
    return e.preventDefault()
  }
  render() {
    const { iconType, show } = this.state
    const { filter } = this.props
    return (
      <Trigger
        popupPlacement={this.props.popupPlacement}
        builtinPlacements={builtinPlacements}
        action={[this.props.trigger]}
        popupAlign={{
          offset: this.state.offset
        }}
        getPopupContainer={this.getPopupContainer}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupTransitionName={this.state.popupTransitionName}
        getPopupClassNameFromAlign={this.getPopupClassNameFromAlign}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0.3}
        onClick={this.onClick}
        popup={this.props.popup}
      >
        <div className="filter-item">
          <a onClick={this.preventDefault}>
            <div
              className="filter-item__title"
              style={{ backgroundColor: show ? '#F2F2F2' : '#fff' }}
            >
              {filter.name}
              <Icon style={{ fontSize: 12 }} type={iconType} />
            </div>
          </a>
        </div>
      </Trigger>
    )
  }
}

// FilterItem.propTypes = {
//   filter: propTypes.shape({
//     name: propTypes.string.isRequired,
//     options: propTypes.arrayOf(
//       propTypes.shape({
//         name: propTypes.string.isRequired,
//         value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
//       })
//     )
//   }).isRequired,
//   trigger: propTypes.oneOf(['hover', 'click']),
//   onShow: propTypes.func,
//   onHide: propTypes.func,
//   popupPlacement: propTypes.oneOf([
//     'left',
//     'right',
//     'top',
//     'bottom',
//     'topLeft',
//     'topRight',
//     'bottomLeft',
//     'bottomRight'
//   ])
// }

// FilterItem.defaultProps = {
//   trigger: 'click',
//   onShow: (filter) => filter,
//   onHide: () => {},
//   popupPlacement: 'bottomLeft'
// }

export default withDefaultProps(defaultProps, FilterItem)
