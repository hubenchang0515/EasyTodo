import React from 'react'
import Container from '@material-ui/core/Container'
import Login from '../component/Login'

function LoginPage() {
    return (
        <Container component="main" maxWidth="xs">
            <Login url="/api/user/login" />
        </Container>
    )
}

export default LoginPage