import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export default function BaseIcon(props: any) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clip-path="url(#clip0_2318_7518)">
        <Path
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
          fill="#0052FF"
        />
        <Path
          d="M7.98259 13C10.744 13 12.9826 10.7614 12.9826 8C12.9826 5.23858 10.744 3 7.98259 3C5.36271 3 3.21345 5.01496 3 7.57971H9.60886V8.42029H3C3.21345 10.985 5.36271 13 7.98259 13Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2318_7518">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
