import Svg, { Path } from "react-native-svg";

export default function WalletIcon(props: any) {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M19.2383 8.99609H22.2383V21.9961H2.23828V8.54155L19.2383 1.99609V8.99609ZM6.6239 8.99609H17.2383V4.90927L6.6239 8.99609ZM18.2383 14.9961C18.2383 14.4438 17.7906 13.9961 17.2383 13.9961C16.686 13.9961 16.2383 14.4438 16.2383 14.9961C16.2383 15.5484 16.686 15.9961 17.2383 15.9961C17.7906 15.9961 18.2383 15.5484 18.2383 14.9961Z"
        fill={props.color}
      />
    </Svg>
  );
}
