# Welcome to Coinbase Onramp Demo App 👋

## Running the app

1. Install dependencies

   ```bash
   npm install
   ```

2. For `Android`, you need a debug keystore (required for app signing):
   
   If debug.keystore doesn't exist in android/app, create it:
   ```bash
   cd android/app
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   Default debug keystore credentials (for development only):
   - Keystore password: `android`
   - Key alias: `androiddebugkey`
   - Key password: `android`

   > Note: This keystore is for development only. For production, you'll need to create a separate release keystore.

3. Start the app

   ```bash
    npx expo start
   ```
4. Follow the output instructions to run the app on your device or simulator.


## Onramp integration demo
Main integration point is in the [Fund](./components/Fund/Fund.tsx) component.


### Steps to integrate:

1. Register and get the projectId from the [CDP portal](https://cdp.coinbase.com/projects)

2. Assemble the Onramp URL with the [getOnrampBuyUrl](./utils/getOnrampUrl.ts) function

3. Open the browser with the Onramp URL



### Download the iOS app
You can also download this (iOS) app on your phone using TestFlight [here](https://testflight.apple.com/join/RnGceg3e)

