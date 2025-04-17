import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import {BLUE} from '../shared/constants/color';

const AcAddDevice = ({width, height}) => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="135" height="42.179" viewBox="0 0 135 42.179">
  <defs>
    <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#c5c5c5"/>
      <stop offset="0.117" stop-color="#fff"/>
      <stop offset="0.238" stop-color="#cecece"/>
      <stop offset="0.36" stop-color="#fff"/>
      <stop offset="0.494" stop-color="#a0fbfb"/>
      <stop offset="0.665" stop-color="#cecece"/>
      <stop offset="0.841" stop-color="#fff"/>x
      <stop offset="1" stop-color="#c5c5c5"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="0.5" x2="1.116" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0" stop-color="#675d50"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="linear-gradient-3" x1="0.5" x2="-0.116" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0" stop-color="#857867"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="linear-gradient-5" x2="-0.116" xlink:href="#linear-gradient-2"/>
    <linearGradient id="linear-gradient-6" y1="0.422" x2="1" y2="0.439" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#d8d8d8"/>
      <stop offset="0.05" stop-color="#efefef"/>
      <stop offset="0.23" stop-color="#f6f6f6"/>
      <stop offset="0.46" stop-color="#f4f5f9"/>
      <stop offset="0.678" stop-color="#f6f6f6"/>
      <stop offset="0.941" stop-color="#efefef"/>
      <stop offset="1" stop-color="#d9d9d9"/>
    </linearGradient>
    <clipPath id="clip-path">
      <path id="Path_10661" data-name="Path 10661" d="M48.916,65.816v.825H174.729v-.825Z" transform="translate(-48.916 -65.816)" fill="url(#linear-gradient)"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <path id="Path_10661-2" data-name="Path 10661" d="M46.768,65.816a.237.237,0,0,0,0,.473H97.078a.238.238,0,0,0,0-.473Z" transform="translate(-46.549 -65.816)" fill="url(#linear-gradient-2)"/>
    </clipPath>
    <clipPath id="clip-path-3">
      <path id="Path_10661-3" data-name="Path 10661" d="M73.441,65.816a.237.237,0,0,1,0,.473H46.761a.238.238,0,0,1,0-.473Z" transform="translate(-46.549 -65.816)" fill="url(#linear-gradient-3)"/>
    </clipPath>
    <clipPath id="clip-path-4">
      <path id="Path_10661-4" data-name="Path 10661" d="M115.631,65.816v.473H47.809v-.473Z" transform="translate(-47.809 -65.816)" fill="#675d50"/>
    </clipPath>
    <clipPath id="clip-path-5">
      <path id="Path_10661-5" data-name="Path 10661" d="M46.787,65.816a.236.236,0,1,0,0,.473H99.81a.236.236,0,0,0,0-.473Z" transform="translate(-46.549 -65.816)" fill="url(#linear-gradient-2)"/>
    </clipPath>
    <clipPath id="clip-path-6">
      <path id="Path_10661-6" data-name="Path 10661" d="M73.3,65.816a.237.237,0,0,1,0,.473H46.76a.238.238,0,0,1,0-.473Z" transform="translate(-46.549 -65.816)" fill="url(#linear-gradient-5)"/>
    </clipPath>
    <clipPath id="clip-path-7">
      <path id="Path_10661-7" data-name="Path 10661" d="M119.656,65.8v.473H47.026V65.8Z" transform="translate(-47.026 -65.802)" fill="#675d50"/>
    </clipPath>
  </defs>
  <g id="Group_15666" data-name="Group 15666" transform="translate(7205.223 -9628.017)">
    <path id="Path_10689" data-name="Path 10689" d="M3,.765l.279,20.918s.129,5.64.946,7.986c0,0,1.054,6.407,6.258,6.509H123.254s7.389-.187,7.76-6.767c0,0,.6-6.269.752-7.8l.228-20.371s.135-1.033-.8-.935L3.562,0S2.99.255,3,.765" transform="translate(-7205.223 9631.017)" opacity="0.3"/>
    <path id="Path_10688" data-name="Path 10688" d="M-.768.744-1,23.6A51.713,51.713,0,0,0,.422,31.089S1.447,36.642,6.5,36.741H117.473S123.8,36.328,124.96,30a23.089,23.089,0,0,0,1.24-6.4l-.231-22.4s.131-1-.777-.909L-.222,0S-.778.248-.768.744" transform="translate(-7200.326 9629)" fill="url(#linear-gradient-6)"/>
    <rect id="Rectangle_3839" data-name="Rectangle 3839" width="126.738" height="36.768" transform="translate(-7201.094 9629)" fill="none"/>
    <g id="Group_15636" data-name="Group 15636" transform="translate(-7140.33 9638.853)">
      <path id="Path_4" data-name="Path 4" d="M55.167,754.075a.849.849,0,0,0-.4.29c-.2.213-.431.5-.644.5a.092.092,0,0,1-.1-.08.1.1,0,0,1,0-.02c0-.036.029-.071.085-.085.2-.06.516-.321.516-.5a.086.086,0,0,0-.073-.1h-.012c-.085,0-.33.041-.632.4a.162.162,0,0,1-.1.067c-.029,0-.062-.053-.062-.16v-.032c.009-.141.079-.2.079-.245s-.013-.043-.051-.043c-.085,0-.251.2-.281.2s-.052-.093-.08-.128c-.04-.053-.1-.067-.251-.067-.078,0-.123.007-.193.007s-.1,0-.113-.038-.247-.654-.778-.654c-.118,0-.243.052-.243.213s.1.379.5.511c.01,0,.02,0,.02.013a.726.726,0,0,1-.361.3.03.03,0,0,1-.033-.026.027.027,0,0,1,0-.006.671.671,0,0,0,.027-.151c0-.082-.025-.2-.18-.2s-.321.069-.754.487l-.047.045a.638.638,0,0,1-.095.075.174.174,0,0,1-.1.034c-.008,0-.013-.009.005-.035l.016-.022.089-.124c.085-.118.2-.27.227-.3.048-.055.073-.082.073-.1s-.03-.038-.067-.038a.439.439,0,0,0-.262.118c-.036.035-.134.137-.256.255l-.1.095c-.2.182-.426.364-.551.364-.05,0-.1-.033-.1-.113a1.105,1.105,0,0,1,.208-.419c.018-.025.036-.05.056-.075a1.925,1.925,0,0,1,.211-.229,1.514,1.514,0,0,1,.906-.431,1.583,1.583,0,0,1,.225.021.017.017,0,0,0,.021-.009l.177-.313s0-.008,0-.01a.3.3,0,0,0-.1-.014,2.608,2.608,0,0,0-1.365.531,3.286,3.286,0,0,0-.4.335l-.052.054a1.094,1.094,0,0,0-.357.662c0,.213.2.24.3.24a1.094,1.094,0,0,0,.452-.128c.054,0-.032.128-.114.181-.682.413-1.243.769-1.243,1.1,0,.149.137.158.242.158s.615-.065,1.4-1.278a.548.548,0,0,1,.154-.131,1.537,1.537,0,0,1,.281-.178c.037,0,.035.016.034.032a.676.676,0,0,0-.027.141.159.159,0,0,0,.17.139.8.8,0,0,0,.554-.322,1.351,1.351,0,0,1,.218-.208.167.167,0,0,1,.088-.03c.025,0,.034.011.034.026a.032.032,0,0,1,0,.008,1.55,1.55,0,0,0-.046.261v.008c0,.1.034.248.271.248a.513.513,0,0,0,.354-.174,1.37,1.37,0,0,0,.262-.4.912.912,0,0,0,.092-.319.029.029,0,0,1,.025-.032h.007c.026,0,.1.008.133.011a.094.094,0,0,1,.083.1.532.532,0,0,1-.068.192c-.074.146-.192.328-.277.457l-.076.115s-.022.027.011.027h.311a.053.053,0,0,0,.038-.027l.076-.116.2-.3a.044.044,0,0,1,.035-.022c.049,0-.011.124.17.124a.532.532,0,0,0,.115-.026c.014,0,.015.011.015.022a.951.951,0,0,0-.029.128v.029c0,.085.02.222.166.222.287,0,.644-.364.661-.366s.014,0,.014.014-.04.157-.46.667-.625.71-.625.82a.146.146,0,0,0,.136.152c.043,0,.227-.01.663-.719.311-.506.458-.819.623-1.07a2.117,2.117,0,0,1,.233-.3c.128-.128.163-.193.163-.223a.071.071,0,0,0-.062-.078Zm-.775.2c.009,0,.022.007.022.018,0,.075-.2.253-.258.253a.024.024,0,0,1-.026-.023h0a.526.526,0,0,1,.264-.247Zm-5.175,1.943a.061.061,0,0,1-.069-.053.071.071,0,0,1,0-.017c0-.146.507-.529.567-.529.015,0,.02.006.02.018C49.736,755.755,49.366,756.219,49.217,756.219Zm2.25-1.4a.323.323,0,0,1-.141.085c-.055,0-.071-.03-.073-.058a.176.176,0,0,1,.014-.078.668.668,0,0,1,.106-.167,1.144,1.144,0,0,1,.393-.326c.032,0,.046.013.047.027,0,.057-.078.1-.128.135s-.079.057-.073.093c0,.02.032.025.036.06a.074.074,0,0,1-.011.04A.77.77,0,0,1,51.467,754.816Zm.634-1.133a.106.106,0,0,1,.1-.111h.015c.322,0,.48.456.48.485s-.008.022-.032.022C52.549,754.08,52.1,753.906,52.1,753.682Zm.213,1.2a.059.059,0,0,1-.066-.051.079.079,0,0,1,0-.009.374.374,0,0,1,.072-.178.84.84,0,0,1,.19-.216c.069-.043.107-.083.106-.106s-.05-.055-.055-.078.016-.043.063-.029c.069.017.118.019.12.07a1,1,0,0,1-.12.335C52.547,754.756,52.441,754.878,52.313,754.878Z" transform="translate(-48.821 -753.316)" fill="#6f6f6f"/>
      <path id="Path_5" data-name="Path 5" d="M90.155,755.937a.334.334,0,0,0-.21.218c0,.053.081.09.108.09a.246.246,0,0,0,.18-.213A.09.09,0,0,0,90.155,755.937Z" transform="translate(-83.629 -755.534)" fill="#6f6f6f"/>
    </g>
    <path id="Ellipse_725" data-name="Ellipse 725" d="M4.332.231a4.1,4.1,0,0,0-2.9,7,4.1,4.1,0,1,0,5.8-5.8,4.074,4.074,0,0,0-2.9-1.2m0-.231A4.332,4.332,0,1,1,0,4.332,4.332,4.332,0,0,1,4.332,0Z" transform="translate(-7141.255 9636.076)" fill="#707070"/>
    <g id="Group_15637" data-name="Group 15637" transform="translate(-7200.626 9652.157)">
      <g id="Group_15596" data-name="Group 15596" transform="translate(0 0)" clip-path="url(#clip-path)">
        <rect id="Rectangle_3834" data-name="Rectangle 3834" width="126.659" height="0.825" transform="translate(-0.547 0)" fill="url(#linear-gradient)"/>
      </g>
    </g>
    <g id="Group_15638" data-name="Group 15638" transform="translate(-7196 9653.464)">
      <path id="Path_10661-8" data-name="Path 10661" d="M46.961,65.816a.412.412,0,0,0,0,.825h94.708a.413.413,0,0,0,0-.825Z" transform="translate(-36.242 -65.459)" fill="none"/>
      <g id="Group_15611" data-name="Group 15611" transform="translate(67.82 0)">
        <g id="Group_15596-2" data-name="Group 15596" clip-path="url(#clip-path-2)">
          <rect id="Rectangle_3834-2" data-name="Rectangle 3834" width="50.742" height="0.473" transform="translate(0 0)" fill="url(#linear-gradient-2)"/>
        </g>
      </g>
      <g id="Group_15612" data-name="Group 15612" transform="translate(0 0)">
        <g id="Group_15596-3" data-name="Group 15596" clip-path="url(#clip-path-3)">
          <rect id="Rectangle_3834-3" data-name="Rectangle 3834" width="50.742" height="0.473" transform="translate(0 0)" fill="url(#linear-gradient-3)"/>
        </g>
      </g>
      <g id="Group_15613" data-name="Group 15613" transform="translate(25.374 0)">
        <g id="Group_15596-4" data-name="Group 15596" transform="translate(0)" clip-path="url(#clip-path-4)">
          <rect id="Rectangle_3834-4" data-name="Rectangle 3834" width="128.09" height="0.473" transform="translate(-0.299 0)" fill="#675d50"/>
        </g>
      </g>
    </g>
    <path id="Path_10690" data-name="Path 10690" d="M-28,1H94.56c0,3.263-3.9,6.258-6.807,6.258H-22.663C-27.284,7.258-28,4.263-28,1Z" transform="translate(-7170.7 9658.416)" fill="#dfdfdf"/>
    <g id="Group_15639" data-name="Group 15639" transform="translate(-7200.166 9658.931)">
      <path id="Path_10661-9" data-name="Path 10661" d="M47,65.816a.414.414,0,1,0,0,.825h103.82a.413.413,0,1,0,0-.825Z" transform="translate(-38.001 -65.456)" fill="none"/>
      <g id="Group_15611-2" data-name="Group 15611" transform="translate(71.595 0.003)">
        <g id="Group_15596-5" data-name="Group 15596" clip-path="url(#clip-path-5)">
          <rect id="Rectangle_3834-5" data-name="Rectangle 3834" width="55.095" height="0.473" transform="translate(0 0)" fill="url(#linear-gradient-2)"/>
        </g>
      </g>
      <g id="Group_15612-2" data-name="Group 15612" transform="translate(0 0.003)">
        <g id="Group_15596-6" data-name="Group 15596" clip-path="url(#clip-path-6)">
          <path id="Path_10685" data-name="Path 10685" d="M15,0H62.325V.473H15Z" transform="translate(-11.85 0)" fill="url(#linear-gradient-5)"/>
        </g>
      </g>
      <g id="Group_15613-2" data-name="Group 15613" transform="translate(26.776 0)">
        <g id="Group_15596-7" data-name="Group 15596" transform="translate(0 0)" clip-path="url(#clip-path-7)">
          <rect id="Rectangle_3834-6" data-name="Rectangle 3834" width="136.767" height="0.473" transform="translate(-0.083 0.003)" fill="#675d50"/>
        </g>
      </g>
    </g>
    <path id="Path_10692" data-name="Path 10692" d="M-22007.566-793.338a9.853,9.853,0,0,1-1.168-1.964,11.947,11.947,0,0,1-.656-1.85,10.778,10.778,0,0,1-.355-1.924l.344-.024a10.871,10.871,0,0,0,.348,1.866,10.592,10.592,0,0,0,1.766,3.682Z" transform="translate(14817.054 10458.021)" fill="#707070"/>
    <path id="Path_10693" data-name="Path 10693" d="M106.583-.172,0-.4V-.75l106.585.231Z" transform="translate(-7190.509 9665.079)" fill="#707070"/>
    <path id="Path_10691" data-name="Path 10691" d="M-22008.625-793.31l-.273-.213a9.131,9.131,0,0,0,1.633-3.67,9.6,9.6,0,0,0,.215-1.861l.348,0a9.77,9.77,0,0,1-.223,1.927,10.7,10.7,0,0,1-.566,1.853A8.782,8.782,0,0,1-22008.625-793.31Z" transform="translate(14924.693 10458.22)" fill="#707070"/>
  </g>
</svg>


`;

  const styles = StyleSheet.create({
    backIcon: {
      flexDirection: 'row',
      marginVertical: 30,
      marginHorizontal: 15,
      color: 'red',
    },
    backIconText: {
      fontSize: 12,
      color: 'red',
    },
    backIconView: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.backIcon}>
      <SvgXml width={width} height={height} xml={svg} />
  
    </View>
  );
};
export default AcAddDevice;
