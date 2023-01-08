import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  changeMode: () => {},
  savedVideos: [],
  onSave: () => {},
  saved: false,
})

export default NxtWatchContext
