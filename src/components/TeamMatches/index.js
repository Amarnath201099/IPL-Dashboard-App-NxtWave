// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamMatchedData: {
      teamBannerUrl: '',
      latestMatchDetails: '',
      recentMatches: [],
    },
    isLoading: true,
    teamMatchesBgContainer: '',
  }

  componentDidMount() {
    this.getSelectedTeamData()
  }

  getSelectedTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedFormat = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    console.log(id)

    const teamMatchesBgColor = id.toLowerCase()

    this.setState({
      teamMatchedData: updatedFormat,
      isLoading: false,
      teamMatchesBgContainer: teamMatchesBgColor,
    })
  }

  render() {
    const {teamMatchedData, isLoading, teamMatchesBgContainer} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchedData

    return (
      <div className={`team-match-bg ${teamMatchesBgContainer}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner-img"
            />
            <p className="team-matches-text">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="team-matches-recent-matches-container">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} eachMatchDetails={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
