import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, covidVaccination: []}

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const apiURL = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiURL, options)
    const data = await response.json()
    const updatedData = {
      last7DaysVaccination: data.last_7_days_vaccination,
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        covidVaccination: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCartDetails = () => {
    const {covidVaccination} = this.state
    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} =
      covidVaccination

    const updatedLast7Days = last7DaysVaccination.map(eachList => ({
      vaccineDate: eachList.vaccine_date,
      dose1: eachList.dose_1,
      dose2: eachList.dose_2,
    }))

    return (
      <div>
        <VaccinationCoverage updatedLast7Days={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-contianer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-content">Something went wrong</h1>
    </div>
  )

  renderAllCartDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderCartDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="covid-container">
          <div className="logo-contianer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h3 className="logo-name">Co-Win</h3>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderAllCartDetails()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
