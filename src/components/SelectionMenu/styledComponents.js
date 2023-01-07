import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
export const ProfileImg = styled.img`
  width: 40px;
`
export const MainContainer = styled.div`
  text-align: center;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`

export const LogosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const Logo = styled.img`
  width: 40px;
`
