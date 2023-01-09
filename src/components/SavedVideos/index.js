import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import NxtWatchContext from '../../context/index'
import SelectionMenu from '../SelectionMenu'
import {
  ListItemContainer,
  ItemContainer,
  FailContainer,
  MainCont,
  ImgFail,
  Head,
  Thumbnail,
  DetailsContainer,
  ViewContainer,
  BannerContainer,
  MainContainer,
  ListContainer,
  HomeContainer,
} from './styledComponent'

class SavedVideos extends Component {
  renderVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos, darkMode} = value
        if (savedVideos.length > 0) {
          return (
            <ListContainer>
              {savedVideos.map(each => {
                const {title, thumbnailUrl, id, viewCount} = each
                return (
                  <ListItemContainer key={id} darkMode={darkMode}>
                    <Link style={{textDecoration: 'none'}} to={`/videos/${id}`}>
                      <ItemContainer darkMode={darkMode}>
                        <div>
                          <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
                        </div>
                        <DetailsContainer>
                          <div>
                            <h4>{title}</h4>
                            <ViewContainer>
                              <p>{viewCount} Watching Worldwide</p>
                            </ViewContainer>
                          </div>
                        </DetailsContainer>
                      </ItemContainer>
                    </Link>
                  </ListItemContainer>
                )
              })}
            </ListContainer>
          )
        }
        return (
          <FailContainer darkMode={darkMode}>
            <ImgFail
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no videos"
            />
            <Head>No saved videos found</Head>
            <p>You can save your videos while watching them</p>
          </FailContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

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
            <MainCont darkMode={darkMode} data-testid="savedVideos">
              <Header />
              <MainContainer darkMode={darkMode}>
                <SelectionMenu />
                <HomeContainer darkMode={darkMode}>
                  <BannerContainer data-testid="banner" darkMode={darkMode}>
                    <BiListPlus />
                    <h1>Saved Videos</h1>
                  </BannerContainer>
                  {this.renderVideos()}
                </HomeContainer>
              </MainContainer>
            </MainCont>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default SavedVideos
