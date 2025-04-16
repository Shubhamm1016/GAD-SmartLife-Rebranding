import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import {BLUE} from '../shared/constants/color';
 
const Auto = ({width, height}) => {
  const svg = `<svg xmlns="
  http://www.w3.org/2000/svg"
  xmlns:xlink="
  http://www.w3.org/1999/xlink"
  width="74" height="73" viewBox="0 0 74 73">
  <defs>
  <filter id="Path_34401" x="0" y="0" width="74" height="73" filterUnits="userSpaceOnUse">
  <feOffset input="SourceAlpha"/>
  <feGaussianBlur stdDeviation="1.5" result="blur"/>
  <feFlood flood-opacity="0.161"/>
  <feComposite operator="in" in2="blur"/>
  <feComposite in="SourceGraphic"/>
  </filter>
  <clipPath id="clip-path">
  <rect id="Rectangle_8627" data-name="Rectangle 8627" width="30.106" height="30.106" rx="10" transform="translate(139.167 452.805)" fill="#f8f8f8"/>
  </clipPath>
  </defs>
  <g id="Group_25000" data-name="Group 25000" transform="translate(-99.5 -448.305)">
  <g transform="matrix(1, 0, 0, 1, 99.5, 448.3)" filter="url(#Path_34401)">
  <path id="Path_34401-2" data-name="Path 34401" d="M10,0H55A10,10,0,0,1,65,10V54A10,10,0,0,1,55,64H10A10,10,0,0,1,0,54V10A10,10,0,0,1,10,0Z" transform="translate(4.5 4.5)" fill="#f8f8f8"/>
  </g>
  <path id="Path_34483" data-name="Path 34483" d="M-14.91-4.28l.34-1.49h.01l.34,1.49L-13.05,0h.99l1.94-6.6h-.81l-1.6,5.99L-14.09-6.6H-15L-16.56-.63-18.15-6.6h-.86L-17.06,0h.99ZM-4.3-6.6v2.88H-7.88V-6.6h-.8V0h.8V-2.97H-4.3V0h.8V-6.6Zm3.76,0h-.8V0h.8Zm6.8,0H.86v.75h2.3V0h.8V-5.85h2.3ZM8.46-.75V-2.97h2.98v-.75H8.46V-5.85h3.83V-6.6H7.66V0h4.78V-.75Zm7.7-5.95c-1.53,0-2.46.9-2.46,1.96,0,1.01.64,1.55,2.42,1.86,1.39.24,1.82.57,1.82,1.14,0,.71-.68,1.09-1.7,1.09a2.131,2.131,0,0,1-2.11-1.24l-.69.56A3,3,0,0,0,16.22.1c1.54,0,2.55-.75,2.55-1.88,0-1.02-.63-1.58-2.4-1.88-1.39-.24-1.83-.55-1.83-1.17s.58-1.12,1.63-1.12a1.761,1.761,0,0,1,1.85,1.21l.69-.56A2.678,2.678,0,0,0,16.16-6.7Z" transform="translate(137.272 504.805)" fill="#838383"/>
  <g id="Mask_Group_2573" data-name="Mask Group 2573" clip-path="url(#clip-path)">
  <path id="Path_34381" data-name="Path 34381" d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Z" transform="translate(150 448)" fill="#e0dfdf"/>
  </g>
  <path id="Path_34484" data-name="Path 34484" d="M-2.044-5.28H-4.26V0h1.1V-1.92h1.112C-.82-1.92-.1-2.536-.1-3.584-.1-4.664-.82-5.28-2.044-5.28Zm-.168,2.5h-.944V-4.4h.944c.688,0,.992.272.992.808S-1.524-2.776-2.212-2.776ZM.74,0H4.548V-.888H3.092c-.272,0-.736.016-.968.032V-.864c1.6-.984,2.344-1.8,2.344-2.816a1.7,1.7,0,0,0-1.9-1.68A1.8,1.8,0,0,0,.572-3.648l.952.36c.032-.744.384-1.168.976-1.168a.794.794,0,0,1,.856.84c0,.808-.7,1.584-2.616,2.864Z" transform="translate(160.5 464.699)" fill="#838383"/>
  <g id="Group_24976" data-name="Group 24976" transform="translate(125 466.202)">
  <path id="Path_34165" data-name="Path 34165" d="M485.792,174.338q-2.164-2.813-4.323-5.619c-.062-.077-.119-.139-.161-.181a.411.411,0,0,0-.1-.1.851.851,0,0,0-.132-.056,2.356,2.356,0,0,0-.237-.062l-3.1-.67a.414.414,0,0,0-.391.133,4.363,4.363,0,0,1-6.713,0,.413.413,0,0,0-.391-.133l-3.1.67a1.765,1.765,0,0,0-.23.062.622.622,0,0,0-.132.056.421.421,0,0,0-.111.1c-.042.042-.091.1-.155.181q-2.162,2.813-4.328,5.619a.4.4,0,0,0,.071.557q1.882,1.444,3.757,2.894a.4.4,0,0,0,.559-.077c.243-.321.493-.641.738-.962v10.366a.4.4,0,0,0,.4.4H480.27a.4.4,0,0,0,.4-.4V176.75c.245.321.495.641.74.962a.4.4,0,0,0,.557.077c1.255-.97,2.5-1.932,3.757-2.894a.4.4,0,0,0,.071-.557m-4.239,2.266c-.292-.383-.593-.767-.886-1.15V173.2a.4.4,0,1,0-.794,0v13.516H468.113V173.2a.4.4,0,1,0-.794,0v2.252c-.292.383-.586.767-.886,1.15-1.045-.8-2.084-1.6-3.13-2.412q1.956-2.531,3.912-5.075,1.266-.271,2.53-.544a5.564,5.564,0,0,0,8.5,0l2.53.544q1.956,2.54,3.912,5.075C483.637,175,482.6,175.8,481.553,176.6Z" transform="translate(-462.114 -166.719)" fill="#838383"/>
  </g>
  </g>
  </svg>
`;

  return (
      <SvgXml width={width} height={height} xml={svg} />

  );
};
export default Auto;
 