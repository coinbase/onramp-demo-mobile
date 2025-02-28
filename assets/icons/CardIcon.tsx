import Svg, { Path } from "react-native-svg";

export default function CardIcon(props: any) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M0 2.33398V13.0007H16V2.33398H0ZM14.3333 4.00065V5.33398H1.66667V4.00065H14.3333ZM1.66667 11.334V7.66732H14.3333V11.334H1.66667Z"
        fill={props.color}
      />
      <Path
        d="M2.66667 8.66732H8V9.66732H2.66667V8.66732Z"
        fill={props.color}
      />
    </Svg>
  );
}
