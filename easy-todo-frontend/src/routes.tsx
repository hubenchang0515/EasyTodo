import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import LoginPage from './page/LoginPage'

function Routes(props: any) {
    return (
        <BrowserRouter>
            <Route path='/todo/login' component={LoginPage} />
        </BrowserRouter>
    )
}

export default Routes