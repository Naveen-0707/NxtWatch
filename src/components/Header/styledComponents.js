import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${props => (props.darkMode ? '#ffffff' : '#181818')};
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
`
export const ProfileImg = styled.img`
  width: 40px;
`
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`
