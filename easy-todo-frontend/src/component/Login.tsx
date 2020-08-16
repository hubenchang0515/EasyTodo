import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Request from '../common/Request'
import Hint from './Hint'
import Copyright from './Copyright'

interface LoginProps {
    url: string,
    onCheck?: (data:any)=>boolean,  // 返回true表示请求成功，false表示请求失败，data为response的数据
    onSuccess?: (data:any)=>void,   // 请求成功时的回调
    onFailed?: (data:any)=>void,    // 请求失败时的回调
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progress: {
        width: "100%",
    }
}))

function Login(props: LoginProps) {
    const classes = useStyles()

    const [state, setState] = useState({
        username: "",
        password: "",
    })

    const [hint, setHint] = useState({
        display: false,
        type: "info",
        message: "Test",
    })

    const [loading, setLoading] = useState(false)

    const clearHint = () => {
        setHint({
            ...hint,
            display: false,
        })
    }

    const handleChangeUsername = (event:any) => {
        clearHint()
        setState({
            ...state,
            username: event.target.value,
        })
    }

    const handleChangePassword = (event:any) => {
        clearHint()
        setState({
            ...state,
            password: event.target.value,
        })
    }

    const defaultHandleCheck = (data:any):boolean => {
        return data.status === "ok"
    }
    
    const defaultHandleSuccess = (data:any):void => {
        setHint({
            display: true,
            type: "success",
            message: "Success"
        })
    }
    
    const defaultHandleFailed = (data:any):void => {
        setHint({
            display: true,
            type: "warning",
            message: data.message
        })
    }

    const checkEmpty = ():boolean => {
        if(state.username === ""){
            setHint({
                display: true,
                type: "warning",
                message: "Username cannot be empty"
            })
            return false
        }
        
        if(state.password === ""){
            setHint({
                display: true,
                type: "warning",
                message: "Password cannot be empty"
            })
            return false
        }

        return true
    }

    const onCheck:(data:any)=>boolean = props.onCheck ? props.onCheck : defaultHandleCheck
    const onSuccess:(data:any)=>void = props.onSuccess ?  props.onSuccess : defaultHandleSuccess
    const onFailed:(data:any)=>void = props.onFailed ? props.onFailed : defaultHandleFailed

    const handleClick = async () => {
        setLoading(true)
        clearHint()

        if(!checkEmpty()) {
            setLoading(false)
            return 
        }

        try {
            let [data, status, statusText] = await Request.PostAsync(props.url, state)
            if(status !== 200) {
                setHint({
                    display: true,
                    type: "error",
                    message: `${status} ${statusText}`,
                })
            }
            else if(onCheck(data)) {
                onSuccess(data)
            } else {
                onFailed(data)
            }
        } catch(err) {
            setHint({
                display: true,
                type: "error",
                message: `${err.message}`,
            })
        }
        setLoading(false)
    }

    return (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextField 
                variant="outlined" 
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="eusernamemail"
                onChange={handleChangeUsername}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleClick}
                disabled={loading}
            >
                Sign In
            </Button>
            {loading && <LinearProgress color="secondary" className={classes.progress}/>}
            <Hint display={hint.display} type={hint.type} message={hint.message} />
            <Copyright />
        </Paper>
    )
}

export default Login