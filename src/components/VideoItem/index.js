import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/index'
import {
  DetailsContainer,
  ListItemContainer,
  Img,
  ViewContainer,
  ItemContainer,
  Para,
  Thumbnail,
} from './styledComponent'
import './index.css'

const videoCard = props => {
  const {videoData} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt, id} = videoData
  const modified = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <ListItemContainer darkMode={darkMode}>
            <Link style={{textDecoration: 'none'}} to={`/videos/${id}`}>
              <ItemContainer darkMode={darkMode}>
                <div>
                  <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
                </div>
                <DetailsContainer>
                  <div>
                    <Img src={modified.profileImageUrl} alt="channel logo" />
                  </div>

                  <div>
                    <Para>{title}</Para>
                    <Para>{modified.name}</Para>
                    <ViewContainer>
                      <Para>{viewCount} views</Para>
                      <Para>{formatDistanceToNow(new Date(publishedAt))}</Para>
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
}
export default videoCard
