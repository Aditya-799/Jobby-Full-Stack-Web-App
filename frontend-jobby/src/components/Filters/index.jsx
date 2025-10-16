import {useState} from 'react'
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

const Filters = (props) => {
  const [initial, setInitial] = useState(totalLabel)
  const [salaryRange, setSalaryRange] = useState('')
  const {sendList,salaryChange} = props

  const filterlabel = label => {
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
    setInitial(updatedList)
  }

  const handleFilters=()=>{
    
    salaryChange('')
    setInitial(totalLabel)
    setSalaryRange('')
    sendList('')
    
  }

  const changedsalaryRange = salary => {
    setSalaryRange(salary)
    salaryChange(salary)
  }

  
    const { salaryRangesList} = props
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
                 onChange={() => filterlabel(eachItem.employmentTypeId)}
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
                onChange={() => changedsalaryRange(eachItem.salaryRangeId)}
              />
              <p className="job-type">{eachItem.label}</p>
            </li>
          ))}
        </ul>
        <button type="reset" className='clearFiltersButton' onClick={handleFilters}>Clear Filters</button>
      </div>
    )
}


export default Filters
