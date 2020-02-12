"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
exports.default = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
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
        },
        root3: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    });
});
//# sourceMappingURL=useStyles.js.map