import './index.css'

const SkillItem = props => {
  const {eachItem} = props
  return (
    <li className="skill-item-container">
      <img src={`${process.env.PUBLIC_URL}/Assets/${eachItem}.png`} alt={eachItem} className="skill-image" />
      <p className="skill-name">{eachItem}</p>
    </li>
  )
}
export default SkillItem
