import { async } from '@firebase/util'
import React from 'react'
import { useSelector } from 'react-redux'
import LogIn from '../LogIn/LogIn'
import TaskWindow from '../TaskWindow/TaskWindow'

function HomePage() {
  const state = useSelector((store) => store.userData)

  return <>{state.userOnline ? <TaskWindow /> : <LogIn />}</>
}

export default HomePage
