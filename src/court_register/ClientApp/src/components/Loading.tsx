import * as React from 'react';
import { LinearProgress } from '@material-ui/core';
import useStyles from '../models/useStyles';

export default () => {
    const styles = useStyles();
    return <LinearProgress className={styles.progress} />;
};