import { createIcon } from '@chakra-ui/react';

const Trashcan = createIcon({
  displayName: 'Trashcan',
  viewBox: '0 0 18 18',
  path: (
    <>
      <path
        fill="currentColor"
        d="M6.75 7.5v6a.75.75 0 101.5 0v-6a.75.75 0 00-1.5 0zM10.5 6.75a.75.75 0 01.75.75v6a.75.75 0 11-1.5 0v-6a.75.75 0 01.75-.75z"
      />
      <path
        fill="currentColor"
        d="M12 3h4.5a.75.75 0 110 1.5h-.83l-1.127 10.164A3.75 3.75 0 0110.815 18h-3.63a3.75 3.75 0 01-3.727-3.336L2.328 4.5H1.5a.75.75 0 010-1.5H6a3 3 0 116 0zM9 1.5A1.5 1.5 0 007.5 3h3A1.5 1.5 0 009 1.5zm-5.162 3l1.11 9.999A2.25 2.25 0 007.186 16.5h3.63a2.25 2.25 0 002.235-2.001L14.163 4.5H3.838z"
      />
    </>
  ),
});

export default Trashcan;
