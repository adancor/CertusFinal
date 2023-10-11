import React from 'react'
import { Router } from '.pages/Router'
import { BrowserRouter } from 'react-router-dom'


export const mainPage = () => {
  return (
    <BrowserRouter>
    <Router/>
    </BrowserRouter>

  )
}
