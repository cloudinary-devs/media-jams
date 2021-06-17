import { Icon } from '@chakra-ui/react';

const Logo = (props) => (
  <svg
    width="52"
    height="36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g clipPath="url(#clip0)">
      <mask
        id="a"
        maskUnits="userSpaceOnUse"
        x="0"
        y="-6"
        width="41"
        height="35"
      >
        <path d="M.85-6h39.21l-8.95 34.29H.85V-6z" fill="#C4C4C4" />
      </mask>
      <g mask="url(#a)">
        <path fill="url(#pattern0)" d="M.85-6h83.93v34.29H.85z" />
      </g>
    </g>
    <g clipPath="url(#clip1)">
      <mask
        id="b"
        maskUnits="userSpaceOnUse"
        x="-3"
        y="9"
        width="56"
        height="35"
      >
        <path d="M52.85 43.71h-55.4L8.18 9.43h44.66V43.7z" fill="#C4C4C4" />
      </mask>
      <g mask="url(#b)">
        <path fill="url(#pattern1)" d="M-32.39 9.43h83.93v34.29h-83.93z" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h36.66v13.71H0z" />
      </clipPath>
      <clipPath id="clip1">
        <path fill="#fff" transform="translate(0 15.43)" d="M0 0h52v20.57H0z" />
      </clipPath>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="matrix(.00786 0 0 .01923 0 0)" />
      </pattern>
      <pattern
        id="pattern1"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="matrix(.00786 0 0 .01923 0 0)" />
      </pattern>
      <image
        id="image0"
        width="128"
        height="52"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default Logo;
