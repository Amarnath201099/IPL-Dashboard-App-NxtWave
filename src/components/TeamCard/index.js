// Write your code here
import './index.css'

import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachTeamDetails} = props
  const {teamImageUrl, name, id} = eachTeamDetails

  return (
    <Link to={`/team-matches/${id}`} className="teamcard-link">
      <li className="teamcard-container">
        <img src={teamImageUrl} alt={name} className="teamcard-img" />
        <p className="teamcard-teamname">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
