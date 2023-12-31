import React from 'react'

import Breeds from './pages/breeds'
import {Route} from './Route'
import {Router} from './Router'
import Breed from './pages/breed'

export const App = ({initialPath}) => {
  return (
    <Router initialPath={initialPath}>
      <Route path='/'>
        <Breeds />
      </Route>
      <Route path='/breed'>
        <Breed />
      </Route>
    </Router>
  )
}
