// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <svg width="92" height="32" viewBox="0 0 92 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.034 13.9586C14.6301 14.8295 18.2304 15.7957 18.6611 18.6879C18.8687 15.8409 15.5335 12.882 15.034 13.9586Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M7.46619 17.5935C8.11524 17.3231 8.42345 16.5746 8.15463 15.9217C7.8858 15.2688 7.14167 14.9587 6.49262 15.2292C5.84357 15.4996 5.53536 16.2481 5.80418 16.9011C6.07306 17.5539 6.81714 17.8639 7.46619 17.5935Z"
        fill={theme.palette.secondary.main}
      />
      <path
        d="M10.3549 14.08C10.6585 13.7746 10.6585 13.2795 10.3549 12.9741C10.0513 12.6687 9.55909 12.6687 9.25551 12.9741C8.95194 13.2795 8.95194 13.7746 9.25551 14.08C9.55909 14.3854 10.0513 14.3854 10.3549 14.08Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M13.1014 9.05206C14.2245 5.7149 13.4696 3.04871 11.1614 1.78241C9.58359 2.10513 8.647 2.87335 8.12549 3.93383C11.2204 3.68185 13.1844 5.63041 13.1014 9.05206Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M25.6983 6.13641C20.1389 4.1294 16.6304 4.81756 16.0786 9.39055C19.2648 12.6973 22.474 11.1146 25.6983 6.13641Z"
        fill={theme.palette.primary.main}
      />
      <path
        d="M21.2765 4.32541C21.5343 3.21728 21.6681 1.90776 21.6881 0.41748C15.9226 1.70883 13.3224 4.17658 15.2839 8.33846C15.3816 8.36203 15.4754 8.38119 15.5696 8.40085C16.0281 5.14422 18.0463 3.93835 21.2765 4.32541Z"
        fill={theme.palette.primary.main}
      />
    </svg>
  );
};

export default Logo;
