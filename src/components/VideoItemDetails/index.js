import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/lazy'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/index'
import Header from '../Header'
import SelectionMenu from '../SelectionMenu'

import {
  MainContainer,
  CustomBtnSave,
  ImgFail,
  Img,
  DetailsContainer,
  Para,
  FailContainer,
  Head,
  HomeContainer,
  ViewContainer,
  CustomBtnLike,
  CustomBtnDislike,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class videoItemDetails extends Component {
  state = {
    likeActive: false,
    disLikeActive: false,
    videoData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getvideoData()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    channel: data.channel,
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
  })

  getvideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.video_details)
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="videos-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getvideoData()
  }

  likeClicked = () => {
    const {likeActive} = this.state
    if (likeActive) {
      this.setState({likeActive: false})
    } else {
      this.setState({likeActive: true, disLikeActive: false})
    }
  }

  disLikeClicked = () => {
    const {disLikeActive} = this.state
    if (disLikeActive) {
      this.setState({disLikeActive: false})
    } else {
      this.setState({disLikeActive: true, likeActive: false})
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
              alt="website logo"
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

  rendervideoDetailsView = () => {
    const {videoData, likeActive, disLikeActive} = this.state
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
      id,
    } = videoData
    const modified = {
      name: channel.name,
      profileImageUrl: channel.profile_image_url,
      subscriberCount: channel.subscriber_count,
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {onSave, savedVideos} = value
          const list = savedVideos.filter(each => each.id === id)
          let saved = true
          if (list.length === 0) {
            saved = false
          }
          const saveClicked = () => {
            onSave(videoData)
          }
          return (
            <div>
              <ReactPlayer url={videoUrl} />
              <div>
                <h3>{title}</h3>
                <div>
                  <ViewContainer>
                    <Para>{viewCount} views</Para>
                    <Para>{formatDistanceToNow(new Date(publishedAt))}</Para>
                  </ViewContainer>
                  <div>
                    <CustomBtnLike
                      likeActive={likeActive}
                      type="button"
                      onClick={this.likeClicked}
                    >
                      <AiOutlineLike />
                      <p>Like</p>
                    </CustomBtnLike>
                    <CustomBtnDislike
                      disLikeActive={disLikeActive}
                      type="button"
                      onClick={this.disLikeClicked}
                    >
                      <AiOutlineDislike />
                      <p>Dislike</p>
                    </CustomBtnDislike>
                    <CustomBtnSave
                      isSaved={saved}
                      type="button"
                      onClick={saveClicked}
                    >
                      <BiListPlus />
                      <p>Save</p>
                    </CustomBtnSave>
                  </div>
                </div>
              </div>
              <hr />
              <DetailsContainer>
                <div>
                  <Img src={modified.profileImageUrl} alt="profile" />
                </div>
                <div>
                  <Para>{modified.name}</Para>
                  <Para>{modified.subscriberCount} subscribers</Para>
                  <Para>{description}</Para>
                </div>
              </DetailsContainer>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  rendervideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.rendervideoDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NxtWatchContext.Consumer>
          {value => {
            const {darkMode} = value
            return (
              <>
                <Header />
                <MainContainer darkMode={darkMode}>
                  <SelectionMenu />
                  <HomeContainer darkMode={darkMode}>
                    {this.rendervideoDetails()}
                  </HomeContainer>
                </MainContainer>
              </>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }
}
export default videoItemDetails
