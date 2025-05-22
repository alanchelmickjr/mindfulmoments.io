import React from 'react';

interface PaperAirplaneIconProps extends React.SVGProps<SVGSVGElement> {
  // You can add any specific props for your icon here
}

const PaperAirplaneIcon: React.FC<PaperAirplaneIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export default PaperAirplaneIcon;