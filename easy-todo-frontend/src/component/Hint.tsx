import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

interface HintProps {
    display: boolean,
    type: string,
    message: string,
}

interface IconProps {
    type: string,
}

interface HintContainerProps {
    type: string,
    children: any,
}

const useStyles = makeStyles((theme) => ({
    message: {
        verticalAlign: "middle",
        wordBreak: "break-all",
    },

    hint: {
        color: "#fff",
        fontWeight: 500,
        padding: theme.spacing(1),
        // borderRadius: "4px",
        lineHeight: 0,
    },

    icon: {
        paddingRight: theme.spacing(1),
        verticalAlign: "middle",
    },

    info: {
        backgroundColor: "#2196f3",
    },

    error: {
        backgroundColor: "#f44336",
    },

    warning: {
        backgroundColor: "#ff9800",
    },

    success: {
        backgroundColor: "#4caf50",
    },
}))

function Icon(props: IconProps) {
    const classes = useStyles()
    switch(props.type)
    {
        case "error":
        return (<ErrorIcon className={classes.icon}/>)
        case "warning":
        return (<WarningIcon className={classes.icon}/>)
        case "info":
        return (<InfoIcon className={classes.icon}/>)
        case "success":
        return (<CheckCircleIcon className={classes.icon}/>)
        default:
        return null
    }
}

function HintContainer(props: HintContainerProps) {
    const classes = useStyles()
    switch(props.type)
    {
        case "error":
        return (<Container className={classes.hint + " " + classes.error}>{props.children}</Container>)

        case "warning":
        return (<Container className={classes.hint + " " + classes.warning}>{props.children}</Container>)

        case "info":
        return (<Container className={classes.hint + " " + classes.info}>{props.children}</Container>)

        case "success":
        return (<Container className={classes.hint + " " + classes.success}>{props.children}</Container>)

        default:
        return null
    }
}

function Hint(props: HintProps) {
    const classes = useStyles()
    if(props.display) {
        return (
        <HintContainer type={props.type}>
            <Typography>
            <Icon type={props.type}/>
            <span className={classes.message}>{props.message}</span>
            </Typography>
        </HintContainer>
        )
    } else {
        return null
    }
}

export default Hint