import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    copyright: {
        marginTop: theme.spacing(2)
    }
}))

interface CopyrightProps {
    name: string,
    url: string,
}

function Copyright(props:CopyrightProps) {
    const classes = useStyles()

    return (
        <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
        {'Copyright © '}
        <Link color="inherit" href={props.url}>
            {props.name}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

Copyright.defaultProps = {
    name: "Easy Todo",
    url: "https://github.com/hubenchang0515/easy-todo"
}

export default Copyright