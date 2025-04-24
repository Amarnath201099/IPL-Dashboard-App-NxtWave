// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachMatchDetails} = props
  const updatedFormatMatchDetails = {
    umpires: eachMatchDetails.umpires,
    result: eachMatchDetails.result,
    manOfTheMatch: eachMatchDetails.man_of_the_match,
    id: eachMatchDetails.id,
    date: eachMatchDetails.date,
    venue: eachMatchDetails.venue,
    competingTeam: eachMatchDetails.competing_team,
    competingTeamLogo: eachMatchDetails.competing_team_logo,
    firstInnings: eachMatchDetails.first_innings,
    secondInnings: eachMatchDetails.second_innings,
    matchStatus: eachMatchDetails.match_status,
  }

  const {competingTeamLogo, competingTeam, result, matchStatus} =
    updatedFormatMatchDetails

  const matchStatusColor = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-card-recent-match-container">
      <img
        className="match-card-img"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="match-card-competing-team">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-card-status ${matchStatusColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
