import { Icon } from '@chakra-ui/react';

const LogoAngular = ({ ...props }) => {
  return (
    <Icon width="250" height="auto" viewBox="0 0 250 250" {...props}>
      <path
        fill="#DD0031"
        d="M125 30L125 30 125 30 31.9 63.2 46.1 186.3 125 230 125 230 125 230 203.9 186.3 218.1 63.2z"
      ></path>
      <path
        fill="#C3002F"
        d="M125 30L125 52.2 125 52.1 125 153.4 125 153.4 125 230 125 230 203.9 186.3 218.1 63.2 125 30z"
      ></path>
      <path
        fill="#FFF"
        d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"
      ></path>
    </Icon>
  );
};

export default LogoAngular;
