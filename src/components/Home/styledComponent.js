import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  color: ${props => (props.darkMode ? '#f9f9f9' : '#181818')};
  text-align: center;
  padding: 10px;
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
`
export const MainCont = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#ffffff')};
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
`

export const Img = styled.img`
  width: 10%;
`

export const Head = styled.h1`
  font-size: 20px;
  @media (min-width: 400px) {
    font-size: 10px;
  }
`
export const FailContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
`

export const ImgFail = styled.img`
  width: 50%;
`

export const BannerContainer = styled.div`
  text-align: start;
  color: #181818;
  padding: 10px;
  height: 100px;
  width: 100%;
  background-size: cover;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
export const HomeContainer = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
`
export const ListContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  max-height: 75%;
  flex-direction: row;
  flex-wrap: wrap;
  background-size: cover;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
