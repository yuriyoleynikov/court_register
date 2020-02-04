import { makeStyles, Theme, createStyles } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            }
        },
        progress: {
            position: 'fixed',
            width: '100%',
            left: '0',
            top: '0'
        },
        active: {
            fontWeight: 'bold'
        },
        root2: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        title: {
            flex: '1 1 100%',
        },
        margin: {
            margin: theme.spacing(1),
        }
    }),
);