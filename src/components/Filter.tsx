import React from 'react'
import FilterPanel from './FilterPanel'
import FilterItem from './FilterItem'
// import FilterPanelList from './FilterPanelList'
import FilterDropList from './FilterDropList'
import { withDefaultProps } from '../utils/withDefaultProps'
import '../style/index.scss'

type State = {
  filters: FilterArrayType
  currentFilter: null | FilterType
  value: Array<ResultOptionType>
}
const initialState: State = {
  filters: [],
  currentFilter: null,
  value: []
}

type Props = {
  radios: string[]
  filters: FilterArrayType
  defaultValue: { [name: string]: string[] }
  onChange(filters: State['value']): void
}

const defaultProps: Props = {
  radios: [],
  filters: [],
  defaultValue: {},
  onChange: () => {}
}

class Filter extends React.Component<Props, State> {
  readonly state: State = { ...initialState, filters: this.props.filters }

  componentDidMount() {
    if (this.state.filters.length) {
      this.createValues()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.filters.length && this.state.filters !== nextProps.filters) {
      this.setState(
        {
          filters: nextProps.filters
        },
        () => {
          this.createValues()
        }
      )
    }
  }

  onShow = (filter: FilterType) => {
    this.setState({
      currentFilter: filter
    })
  }

  onHide = () => {
    this.setState({
      currentFilter: null
    })
  }

  // 点击选择项
  onItemClick = (option: FilterOptionType) => {
    const { value, currentFilter } = this.state
    const index = value.findIndex((cv) => cv.code === currentFilter.code)
    const { values } = value[index]
    // 判断当前值是否存在
    const optIndex = values.findIndex((cv) => cv.value === option.value)
    if (optIndex !== -1) {
      values.splice(optIndex, 1)
    } else {
      // 这里判断该选项是单选还是多选
      if (this.isRadio(currentFilter)) {
        values.pop()
      }
      values.push(option)
    }
    value[index] = {
      ...value[index],
      values
    }
    this.setState(
      {
        value
      },
      () => {
        // state 已经修改
        this.props.onChange(this.state.value)
      }
    )
  }

  getCurrentCheckedValue = () => {
    const currentCheckedValues = this.state.value.find(
      (cv) => cv.code === this.state.currentFilter.code
    )
    return (currentCheckedValues && currentCheckedValues.values) || []
  }
  // 解析默认值
  resolveDefaultValue = (defaultValue: Props['defaultValue']) => {
    return Object.keys(defaultValue).map((key) => ({
      code: key,
      values: defaultValue[key]
    }))
  }

  // 是否是单选
  isRadio = (filter: FilterType) => {
    // 单选的字段数组
    const { radios } = this.props
    return radios.indexOf(filter.code) !== -1
  }

  // 初始化默认选择值
  createValues = () => {
    this.setState((prevState: State, props: Props) => ({
      value: prevState.filters.map((cv: FilterType) => {
        const defaultValue = this.resolveDefaultValue(props.defaultValue)
        const item = defaultValue.find((item) => item.code === cv.code)
        let itemValues: any[] = []
        const option: ResultOptionType = {
          code: cv.code,
          name: cv.name,
          values: []
        }
        // 查到当前存在默认值
        if (item && item.values.length) {
          // 给默认值填充数据
          itemValues = item.values.map((itv: string) => {
            return cv.options.find((option: FilterOptionType) => option.value === itv)
          })
          option.values = itemValues
        } else {
          option.values = itemValues
        }
        return option
      })
    }))
  }

  clearExactFilter = (filter: FilterType) => {
    const { value } = this.state
    const idx = value.findIndex((cv) => cv.code === filter.code)
    value[idx] = {
      ...value[idx],
      values: []
    }
    this.setState(
      {
        value
      },
      () => {
        this.props.onChange(this.state.value)
      }
    )
  }
  renderFilterPanel = () => {
    return (
      <FilterPanel bordered>
        {this.state.filters.map(
          (filter) =>
            filter.options && filter.options.length ? (
              <FilterItem
                key={filter.name}
                filter={filter}
                popup={!this.state.currentFilter ? <div /> : this.renderDropList()}
                onShow={this.onShow}
                onHide={this.onHide}
              />
            ) : null
        )}
      </FilterPanel>
    )
  }

  renderDropList = () => {
    return (
      <FilterDropList
        items={this.getCurrentCheckedValue()}
        options={this.state.currentFilter.options}
        onItemClick={this.onItemClick}
      />
    )
  }

  // renderPanelList = () => {
  //   return (
  //     <FilterPanelList
  //       items={this.getCurrentCheckedValue()}
  //       options={this.state.currentFilter.options}
  //       onItemClick={this.onItemClick}
  //     />
  //   )
  // }

  render() {
    return (
      <div className="filter">
        <div className="duoke-filter__wrapper">{this.renderFilterPanel()}</div>
      </div>
    )
  }
}

export default withDefaultProps(defaultProps, Filter)
