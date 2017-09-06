import { getMuiTheme, colors } from 'material-ui/styles';


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.lightGreen500,
    primary2Color: colors.lightGreen700,
    pickerHeaderColor: colors.lightGreen500,
  },
});

export const BORDER = `1px solid ${muiTheme.palette.borderColor}`;
