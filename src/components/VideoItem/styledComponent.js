import styled from 'styled-components'

export const DetailsContainer = styled.div`
  text-align: start;
  display: flex;
  flex-direction: row;
`
export const ListItemContainer = styled.div`
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
  width: 33%;
`

export const Img = styled.img`
  width: 20px;
  @media (min-width: 400px) {
    width: 60px;
  }
`

export const Head = styled.h1`
  font-size: 20px;
  @media (min-width: 400px) {
    font-size: 10px;
  }
`

export const Para = styled.p`
  font-size: 10px;
  @media (min-width: 400px) {
    font-size: 20px;
  }
`

export const Thumbnail = styled.img`
  width: 90%;
`

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
export const HomeContainer = styled.div`
  width: 100%;
  background-size: cover;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
