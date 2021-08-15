import { Icon } from '@chakra-ui/react';

export const Close = (props) => (
  <Icon color="grey.700" viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M14.933.813l.139.116a1 1 0 01.116 1.275l-.116.139L9.415 8l5.657 5.657a1 1 0 01.116 1.275l-.116.139a1 1 0 01-1.276.116l-.139-.116L8 9.414l-5.656 5.657a1 1 0 01-1.276.116l-.139-.116a1 1 0 01-.116-1.276l.116-.138L6.586 8 .93 2.343a1 1 0 01-.116-1.276L.93.93A1 1 0 012.205.813l.139.116L8 6.586 13.657.929a1 1 0 011.276-.116l.139.116-.139-.116z"
    />
  </Icon>
);

export default Close;
