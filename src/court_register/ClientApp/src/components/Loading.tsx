import * as React from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            position: 'fixed',
            width: '100%',
            left: '0',
            top: '0'
        }
    }),
);

export default () => {
    const styles = useStyles();
    return <LinearProgress className={styles.progress} />;
};