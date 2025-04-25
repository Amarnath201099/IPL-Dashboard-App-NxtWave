// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {iplTeamsData: [], isLoading: true}

  componentDidMount() {
    this.getIPLTeamsData()
  }

  getIPLTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedFormatData = data.teams.map(eachTeamData => ({
      name: eachTeamData.name,
      id: eachTeamData.id,
      teamImageUrl: eachTeamData.team_image_url,
    }))

    this.setState({iplTeamsData: updatedFormatData, isLoading: false})
  }

  render() {
    const {iplTeamsData, isLoading} = this.state

    return (
      <div className="home-bg-container">
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="home-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="heading">IPL Dashboard</h1>
            </div>
            <ul className="home-iplTeamsData-container">
              {iplTeamsData.map(eachTeam => (
                <TeamCard eachTeamDetails={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
