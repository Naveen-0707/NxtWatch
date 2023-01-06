import {formatDistanceToNow} from 'date-fns'
import {
  DetailsContainer,
  ListItemContainer,
  Img,
  ViewContainer,
  Thumbnail,
} from './styledComponent'
import './index.css'

const videoCard = props => {
  const {videoData} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = videoData
  const modified = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  return (
    <ListItemContainer>
      <div>
        <Thumbnail src={thumbnailUrl} alt="thumbnail" />
      </div>
      <DetailsContainer>
        <div>
          <Img src={modified.profileImageUrl} alt="profile" />
        </div>

        <div>
          <p>{title}</p>
          <p>{modified.name}</p>
          <ViewContainer>
            <p>{viewCount} views</p>
            <p>{formatDistanceToNow(new Date(publishedAt))}</p>
          </ViewContainer>
        </div>
      </DetailsContainer>
    </ListItemContainer>
  )
}
export default videoCard
