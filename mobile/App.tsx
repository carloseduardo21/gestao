import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

import { Routes } from './src/routes'
import theme from './src/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" backgroundColor={theme.COLORS.BACKGROUND} />
      <Routes />
    </ThemeProvider>
  )
}
