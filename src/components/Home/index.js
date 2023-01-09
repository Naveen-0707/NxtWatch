import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {GrFormClose} from 'react-icons/gr'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {
  MainContainer,
  ListContainer,
  Head,
  BannerContainer,
  HomeContainer,
  FailContainer,
  Img,
  ImgFail,
} from './styledComponent'
import VideoItem from '../VideoItem'

class Home extends Component {
  state = {
    searchInput: '',
    banner: true,
    videosList: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getVideos()
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  submitSearch = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: 'loading',
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()

      const updatedData = fetchedData.videos.map(video => ({
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: video.channel,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        id: video.id,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: 'success',
      })
    } catch (error) {
      this.setState({apiStatus: 'failure'})
    }
  }

  onRetry = () => {
    this.getVideos()
  }

  renderData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderVideos()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        if (darkMode) {
          return (
            <FailContainer darkMode={darkMode}>
              <ImgFail
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                alt="failure view"
              />
              <Head>Oops! Something Went Wrong</Head>
              <p>
                We are having some trouble to complete your request. Please try
                again.
              </p>
              <button type="button" onClick={this.onRetry}>
                Retry
              </button>
            </FailContainer>
          )
        }
        return (
          <FailContainer darkMode={darkMode}>
            <ImgFail
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
            <Head>Oops! Something Went Wrong</Head>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={this.onRetry}>
              Retry
            </button>
          </FailContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  bannerClose = () => {
    this.setState({
      banner: false,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos = () => {
    const {videosList} = this.state
    if (videosList.length > 0) {
      return (
        <ListContainer>
          {videosList.map(each => (
            <VideoItem key={each.id} videoData={each} />
          ))}
        </ListContainer>
      )
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <FailContainer darkMode={darkMode}>
              <ImgFail
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
              />
              <Head>No Search results found</Head>
              <p>Try different key words or remove search filter</p>
              <button type="button" onClick={this.onRetry}>
                Retry
              </button>
            </FailContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  render() {
    const {banner, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <div data-testid="home">
              <Header />
              <MainContainer darkMode={darkMode}>
                <SelectionMenu />
                <HomeContainer darkMode={darkMode}>
                  {banner && (
                    <BannerContainer data-testid="banner" darkMode={darkMode}>
                      <div>
                        {darkMode ? (
                          <Img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                            alt="nxt watch logo"
                          />
                        ) : (
                          <Img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                          />
                        )}
                        <button
                          type="button"
                          onClick={this.bannerClose}
                          data-testid="close"
                        >
                          <GrFormClose />
                        </button>

                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT NOW</button>
                      </div>
                    </BannerContainer>
                  )}

                  <div>
                    <input
                      value={searchInput}
                      type="search"
                      onChange={this.onSearchChange}
                      placeholder="Search"
                    />
                    <button
                      data-testid="searchButton"
                      onClick={this.submitSearch}
                      type="button"
                    >
                      <BsSearch />
                    </button>
                  </div>
                  {this.renderData()}
                </HomeContainer>
              </MainContainer>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Home
