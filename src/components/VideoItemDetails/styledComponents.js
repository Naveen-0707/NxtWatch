import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkMode ? '#f9f9f9' : '#0f0f0f')};
  text-align: center;
  padding: 10px;
  height: 90vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
`

export const HomeContainer = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#f9f9f9')};
`
export const FailContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#f9f9f9')};
`

export const ImgFail = styled.img`
  width: 50%;
`

export const Head = styled.h1`
  font-size: 20px;
  @media (min-width: 400px) {
    font-size: 10px;
  }
`

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const Para = styled.p`
  font-size: 10px;
  @media (min-width: 400px) {
    font-size: 20px;
  }
`
export const DetailsContainer = styled.div`
  text-align: start;
  display: flex;
  flex-direction: row;
`

export const Img = styled.img`
  width: 20px;
  @media (min-width: 400px) {
    width: 60px;
  }
`
export const CustomBtnLike = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => (props.likeActive ? '#2563eb' : '#64748b')};
`

export const CustomBtnDislike = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => (props.disLikeActive ? '#2563eb' : '#64748b')};
`

export const CustomBtnSave = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => (props.isSaved ? '#2563eb' : '#64748b')};
`
