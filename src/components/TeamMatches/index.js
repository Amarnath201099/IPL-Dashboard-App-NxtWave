// Write your code here

import {Component} from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'

import './index.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const COLORS = ['#4CAF50', '#F44336', '#FFC107']

class TeamMatches extends Component {
  state = {
    teamMatchedData: {
      teamBannerUrl: '',
      latestMatchDetails: '',
      recentMatches: [],
    },
    teamStatistics: {won: 0, lost: 0, drawn: 0},
    isLoading: true,
    teamMatchesBgContainer: '',
  }

  componentDidMount() {
    this.getSelectedTeamData()
  }

  backToHome = () => {
    const {history} = this.props
    history.replace('/')
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

    console.log(data)

    const teamMatchesBgColor = id.toLowerCase()

    const stats = {won: 0, lost: 0, drawn: 0}

    updatedFormat.recentMatches.forEach(eachMatch => {
      if (eachMatch.match_status === 'Won') {
        stats.won += 1
      } else if (eachMatch.match_status === 'Lost') {
        stats.lost += 1
      } else if (eachMatch.match_status === 'Drawn') {
        stats.lost += 1
      }
    })

    if (updatedFormat.latestMatchDetails.match_status === 'Won') {
      stats.won += 1
    } else if (updatedFormat.latestMatchDetails.match_status === 'Lost') {
      stats.lost += 1
    } else if (updatedFormat.latestMatchDetails.match_status === 'Drawn') {
      stats.lost += 1
    }

    this.setState({
      teamMatchedData: updatedFormat,
      isLoading: false,
      teamMatchesBgContainer: teamMatchesBgColor,
      teamStatistics: {won: stats.won, lost: stats.lost, drawn: stats.drawn},
    })
  }

  render() {
    const {teamMatchedData, isLoading, teamMatchesBgContainer, teamStatistics} =
      this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchedData
    const {won, lost, drawn} = teamStatistics

    const data = [
      {name: 'Won', value: won, id: 'WON'},
      {name: 'Lost', value: lost, id: 'LOST'},
      {name: 'Drawn', value: drawn, id: 'DRAWN'},
    ]

    return (
      <div className={`team-match-bg ${teamMatchesBgContainer}`}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner-img"
            />
            <div className="heading-back-btn-container">
              <p className="team-matches-text">Latest Matches</p>
              <button
                type="button"
                className="back-btn"
                onClick={this.backToHome}
              >
                Back
              </button>
            </div>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <div className="chart-container">
              <p className="team-matches-text">Team Statistics</p>
              <PieChart width={250} height={300} className="pie-chart">
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  fill="#8884d8"
                  stroke="none"
                  strokeWidth={0}
                  label
                >
                  {data.map((each, index) => (
                    <Cell
                      key={`cell-${each.id}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
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
