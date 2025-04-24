// Write your code here

import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const updatedFormatLatestMatch = {
    umpires: latestMatchDetails.umpires,
    result: latestMatchDetails.result,
    manOfTheMatch: latestMatchDetails.man_of_the_match,
    id: latestMatchDetails.id,
    date: latestMatchDetails.date,
    venue: latestMatchDetails.venue,
    competingTeam: latestMatchDetails.competing_team,
    competingTeamLogo: latestMatchDetails.competing_team_logo,
    firstInnings: latestMatchDetails.first_innings,
    secondInnings: latestMatchDetails.second_innings,
    matchStatus: latestMatchDetails.match_status,
  }

  const {
    umpires,
    result,
    manOfTheMatch,
    id,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    matchStatus,
  } = updatedFormatLatestMatch

  return (
    <div className="latest-match-container">
      <div className="latest-match-top-container">
        <div className="latest-match-top-text-container">
          <p className="latest-match-competing-team">{competingTeam}</p>
          <p className="latest-match-date">{date}</p>
          <p className="latest-match-details">{venue}</p>
          <p className="latest-match-details">{result}</p>
        </div>
        <img
          className="competing-team-logo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <hr />
      <div className="latest-match-bottom-container">
        <p className="latest-match-headings">First Innings</p>
        <p className="latest-match-answers">{firstInnings}</p>
        <p className="latest-match-headings">Second Innings</p>
        <p className="latest-match-answers">{secondInnings}</p>
        <p className="latest-match-headings">Man Of The Match</p>
        <p className="latest-match-answers">{manOfTheMatch}</p>
        <p className="latest-match-headings">Umpiers</p>
        <p className="latest-match-answers">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
