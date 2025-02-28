import Svg, { Path } from "react-native-svg";

export default function CoinbaseIcon(props: any) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8.01503 12C5.80088 12 4.00751 10.21 4.00751 8C4.00751 5.79 5.80088 4 8.01503 4C9.99875 4 11.6452 5.44333 11.9624 7.33333H16C15.6594 3.22667 12.2162 0 8.01503 0C3.59006 0 0 3.58333 0 8C0 12.4167 3.59006 16 8.01503 16C12.2162 16 15.6594 12.7733 16 8.66667H11.9624C11.6452 10.5567 9.99875 12 8.01503 12Z"
        fill="#0052FF"
      />
    </Svg>
  );
}
