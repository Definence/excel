import React, { Fragment } from 'react'

const style = {
  border: {
    border: '1px solid black',
    padding: '1rem'
  }
}

class Excel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      sortBy: null,
      descending: false,
      edit: {
        row: null,
        cell: null
      }
    }
  }

  _onSort = (e) => {
    const { data, sortBy } = this.state
    const column = e.target.cellIndex
    const descending = sortBy === column && !this.state.descending
    const sortedData = data.slice().sort((a, b) => {
      return (
        descending
          ? a[column] < b[column] ? 1 : -1
          : a[column] > b[column] ? 1 : -1
      )
    })

    this.setState(() => ({
      data: sortedData,
      sortBy: column,
      descending
    }))
  }

  _onEdit = (e) => {
    const { target } = e
    this.setState(() => ({
      edit: {
        cell: target.cellIndex,
        row: parseInt(target.getAttribute('rowindex'))
      }
    }))
  }

  buildHeaders = () => {
    const { descending, sortBy } = this.state
    return this.props.headers.map((header, index) => {
      if (index === sortBy) header += descending ? '\u2191' : '\u2193'
      return (
        <th onClick={this._onSort} key={index} style={style.border}>
          { header }
        </th>
      )
    })
  }

  buildContent = () => {
    const { data } = this.state
    return data.map((row, rowIndex) => (
      <tr key={rowIndex} style={style.border}>
        { row.map((cell, cellIndex) => (
          <td rowindex={rowIndex} key={cellIndex} style={style.border}>
            { cell }
          </td>
        )) }
      </tr>
    ))
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <h1>Excel</h1>

        <table style={style.border}>
          <thead>
            <tr>
              { this.buildHeaders() }
            </tr>
          </thead>

          <tbody onDoubleClick={this._onEdit}>
            { this.buildContent() }
          </tbody>
        </table>
      </Fragment>
    )
  }
}

Excel.defaultProps = {
  headers: ['Book', 'Author', 'Language', 'Published', 'Sales'],
  data: [
    ['The Lord of the Rings', 'Tolkien', 'English', '1954-1955', '150kk'],
    ['Le Pitit Prince', 'Antoine de Saint-Exupery', 'French', '1943', '140kk'],
    ['Harry Potter', 'Rowling', 'English', '1997', '107kk'],
    ['And There Then Were None', 'Agatha Christie', 'English', '1939', '100kk'],
    ['Dream of the Red Chamber', 'Cao Hueqin', 'Chinese', '1754-1791', '100kk'],
    ['The Hobbit', 'Tolkien', 'Tolkien', '1937', '100kk'],
    ['She: A History of Adventure', 'Haggard', 'English', '1939', '100kk']
  ]
}

export default Excel
