import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {
  MainContainer,
  ListContainer,
  BannerContainer,
  HomeContainer,
  Img,
} from './styledComponent'
import VideoItem from '../VideoItem'

class Home extends Component {
  state = {
    searchInput: '',
    videosList: [],
    isLoading: false,
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
      isLoading: true,
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
    const response = await fetch(apiUrl, options)
    if (response.ok) {
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
        isLoading: false,
      })
    }
  }

  renderVideos = () => {
    const {videosList} = this.state
    return (
      <ListContainer>
        {videosList.map(each => (
          <VideoItem key={each.id} videoData={each} />
        ))}
      </ListContainer>
    )
  }

  render() {
    const {isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          console.log(darkMode)
          return (
            <>
              <Header />
              <MainContainer>
                <SelectionMenu />
                <HomeContainer>
                  <BannerContainer>
                    <div>
                      {darkMode ? (
                        <Img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                          alt="website logo"
                        />
                      ) : (
                        <Img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="website logo"
                        />
                      )}
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                  </BannerContainer>
                  <div>
                    <input type="search" onChange={this.onSearchChange} />
                    <button onClick={this.submitSearch} type="button">
                      <BsSearch />
                    </button>
                  </div>
                  {isLoading ? (
                    <div>
                      <Loader
                        type="ThreeDots"
                        color="lightblue"
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : (
                    this.renderVideos()
                  )}
                </HomeContainer>
              </MainContainer>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Home

/* <div>
              <div>
                <h1>Clothes That Get YOU Noticed</h1>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                  alt="dresses to be noticed"
                />
                <p>
                  Fashion is part of the daily air and it does not quite help
                  that it changes all the time. Clothes have always been a
                  marker of the era and we are in a revolution. Your fashion
                  makes you been seen and heard that way you are. So, celebrate
                  the seasons new and exciting fashion in your own way.
                </p>
                <Link to="/videos">
                  <button type="button">Shop Now</button>
                </Link>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="dresses to be noticed"
              />
            </div> */
