import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  text-align: center;
  padding: 10px;
  height: 90vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
`

export const BannerContainer = styled.div`
  text-align: start;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20%;
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`
export const Img = styled.img`
  width: 10%;
`
export const FailContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`

export const ImgFail = styled.img`
  width: 50%;
`

export const HomeContainer = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`
export const ListContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
  max-height: 75%;
  flex-direction: row;
  flex-wrap: wrap;
  background-size: cover;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
export const DetailsContainer = styled.div`
  text-align: start;
  padding: 10px;
  display: flex;
  flex-direction: row;
`

export const ListItemContainer = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  flex-direction: row;
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`

export const ItemContainer = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  flex-direction: row;
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`

export const ImgItem = styled.img`
  width: 70%;
`

export const Thumbnail = styled.img`
  width: 400px;
`

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
