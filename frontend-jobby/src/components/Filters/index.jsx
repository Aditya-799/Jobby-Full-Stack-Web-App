import {Component} from 'react'
import './index.css'

const totalLabel = [
  {
    label: 'Full Time',
    isLabelPresent: false,
    employmentTypeId: 'Full-time',
  },
  {
    label: 'Part Time',
    isLabelPresent: false,
    employmentTypeId: 'Part-time',
  },
  {
    label: 'Freelance',
    isLabelPresent: false,
    employmentTypeId: 'Freelance',
  },
  {
    label: 'Internship',
    isLabelPresent: false,
    employmentTypeId: 'Internship',
  },
]

class Filters extends Component {
  state = {initial: totalLabel,salaryRange: ''}

  filterlabel = label => {
    const {initial} = this.state
    const {sendList} = this.props
    const updatedList = initial.map(eachItem => ({
      ...eachItem,
      isLabelPresent:
        eachItem.employmentTypeId === label
          ? !eachItem.isLabelPresent
          : eachItem.isLabelPresent,
    }))
    const selectedIds = updatedList
      .filter(item => item.isLabelPresent)
      .map(item => item.employmentTypeId)
    sendList(selectedIds.join(','))
    this.setState({initial: updatedList})
  }

  handleFilters=()=>{
    const {sendList,salaryChange} = this.props
    this.setState({initial: totalLabel,salaryRange: ''})
    sendList('')
    salaryChange('')
  }

  changedsalaryRange = salary => {
    const {salaryChange} = this.props
    this.setState({salaryRange: salary})
    salaryChange(salary)
  }

  render() {
    const { salaryRangesList} = this.props
    const {initial,salaryRange} = this.state
    return (
      <div className="filter-container">
        <hr className="line" />
        <h1 className="f-heading">Type of Employment</h1>
        <ul>
          {initial.map(eachItem => (
            <li className="check-box-container" key={eachItem.employmentTypeId}>
              <button
                className="new-button"
                type="button"
              >
                <input type="checkbox" className="checkbox"
                 value={eachItem.employmentTypeId}
                 checked={eachItem.isLabelPresent}
                 onChange={() => this.filterlabel(eachItem.employmentTypeId)}
                />
              </button>
              <p className="job-type">{eachItem.label}</p>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <h1 className="f-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => (
            <li className="check-box-container" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                className="checkbox"
                name="salaryRangeButton"
                value={eachItem.salaryRangeId}
                checked={eachItem.salaryRangeId===salaryRange}
                onChange={() => this.changedsalaryRange(eachItem.salaryRangeId)}
              />
              <p className="job-type">{eachItem.label}</p>
            </li>
          ))}
        </ul>
        <button type="reset" className='clearFiltersButton' onClick={this.handleFilters}>Clear Filters</button>
      </div>
    )
}
}

export default Filters
