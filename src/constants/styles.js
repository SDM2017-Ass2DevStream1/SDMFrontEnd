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

export const tableStyles = {
  table: {
    borderBottom: BORDER,
  },
  headerRow: {
    display: 'flex',
    height: 'auto',
    marginBottom: '-1px',
    borderTop: BORDER,
  },
  bodyRow: {
    display: 'flex',
    height: 'auto',
  },
};
