import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {
  ListItemContainer,
  Thumbnail,
  DetailsContainer,
  ViewContainer,
  BannerContainer,
  MainContainer,
  ListContainer,
  HomeContainer,
  FailContainer,
  ImgFail,
} from './styledComponent'

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: 'loading',
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
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
        viewCount: video.view_count,
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
                alt="website logo"
              />
              <h1>Oops! Something Went Wrong</h1>
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
              alt="website logo"
            />
            <h1>Oops! Something Went Wrong</h1>
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

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos = () => {
    const {videosList} = this.state
    return (
      <ListContainer>
        {videosList.map(
          each => {
            const {title, thumbnailUrl, id, viewCount} = each
            return (
              <NxtWatchContext.Consumer key={id}>
                {value => {
                  const {darkMode} = value
                  return (
                    <ListItemContainer darkMode={darkMode}>
                      <Link
                        style={{textDecoration: 'none'}}
                        to={`/videos/${id}`}
                      >
                        <div>
                          <div>
                            <Thumbnail src={thumbnailUrl} alt="thumbnail" />
                          </div>
                          <DetailsContainer>
                            <div>
                              <h4>{title}</h4>
                              <ViewContainer>
                                <p>{viewCount} Watching Worldwide</p>
                              </ViewContainer>
                            </div>
                          </DetailsContainer>
                        </div>
                      </Link>
                    </ListItemContainer>
                  )
                }}
              </NxtWatchContext.Consumer>
            )
          },
          //   <VideoItem key={each.id} videoData={each} />
        )}
      </ListContainer>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <>
              <Header />
              <MainContainer darkMode={darkMode}>
                <SelectionMenu />
                <HomeContainer darkMode={darkMode}>
                  <BannerContainer darkMode={darkMode}>
                    <SiYoutubegaming />
                    <h1>Gaming</h1>
                  </BannerContainer>
                  {this.renderData()}
                </HomeContainer>
              </MainContainer>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Gaming
