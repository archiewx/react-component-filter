import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Filter } from './index'

import { Hello } from './components/Hello'

const filters: FilterArrayType = [
  {
    code: 'option1',
    name: '选项1',
    options: [
      {
        name: '1-1',
        value: '11'
      }
    ]
  },
  {
    code: 'option2',
    name: '选项2',
    options: [
      {
        name: '2-1',
        value: '21'
      }
    ]
  },
  {
    code: 'option3',
    name: '选项3',
    options: [
      {
        name: '3-1',
        value: '31'
      }
    ]
  }
]

const onChange = function onChange(values: Array<ResultOptionType>) {
  console.log(values)
}

const App = () => <Filter filters={filters} onChange={onChange} />

ReactDom.render(<App />, document.querySelector('#root'))
// ReactDom.render(<Hello compiler="typescript" framework="react"/>, document.querySelector('#root'))
