import React from 'react'
import { render } from 'react-dom'

import './app.css'
import './app.less'
import style from './app.scss'
import style2 from './app.styls'

import logo from './logo.png'
import bigSizeImg from './bigsize.png'

const App = () => (
  <div className={style.app}>
    <h1 className={style2.h1}>it works adsfasdf</h1>
    <img src={logo} alt="" />
    <img src={bigSizeImg} alt="" style={{width: 200, height: 290}} />
  </div>
)

render(
  <App/>,
  document.getElementById('app')
)
