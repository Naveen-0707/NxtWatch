import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {
  ListItemContainer,
  ItemContainer,
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

class Trending extends Component {
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
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
      console.log(updatedData)
      this.setState({
        videosList: updatedData,
        apiStatus: 'success',
      })
    } catch (error) {
      console.log(error)
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
    if (videosList.length > 0) {
      return (
        <ListContainer>
          {videosList.map(each => {
            const {
              title,
              thumbnailUrl,
              channel,
              viewCount,
              id,
              publishedAt,
            } = each
            const modified = {
              name: channel.name,
              profileImageUrl: channel.profile_image_url,
            }
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
                        <ItemContainer>
                          <div>
                            <Thumbnail src={thumbnailUrl} alt="thumbnail" />
                          </div>
                          <DetailsContainer>
                            <div>
                              <p>{title}</p>
                              <p>{modified.name}</p>
                              <ViewContainer>
                                <p>{viewCount} views</p>
                                <p>
                                  {formatDistanceToNow(new Date(publishedAt))}
                                </p>
                              </ViewContainer>
                            </div>
                          </DetailsContainer>
                        </ItemContainer>
                      </Link>
                    </ListItemContainer>
                  )
                }}
              </NxtWatchContext.Consumer>
            )
          })}
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
              <h1>No Search results found</h1>
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
                    <AiFillFire />
                    <h1>Trending</h1>
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

export default Trending
