import styled from 'styled-components'

export const MainContainer = styled.div`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const NotFoundImg = styled.img`
  width: 500px;
`
