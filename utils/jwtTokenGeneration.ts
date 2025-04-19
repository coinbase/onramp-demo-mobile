import * as Crypto from "expo-crypto";

const keyName = "MobileDemoApp";
const keySecret = `6nLZvCOKACEmI3DgbTQojmCbNHt0KJcQEyPcNSvgriBpp+SFX5DKDyZ5cKb5s/KkUE1dZV08TFZuqdtQ2W6rhQ==`;

// Function to create a JWT token
export async function createToken(
  method: "GET" | "POST",
  url: string
): Promise<string> {
  try {
    const header = {
      alg: "ES256",
      typ: "JWT",
      kid: keyName,
      nonce: await Crypto.getRandomBytesAsync(16),
    };

    const uri = `${method} ${url}`;
    const payload = {
      iss: "cdp",
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 120,
      sub: keyName,
      uri,
    };

    console.log("Original header:", JSON.stringify(header));
    console.log("Original payload:", JSON.stringify(payload));

    // Convert to base64 using expo-crypto
    const headerStr = JSON.stringify(header);
    const payloadStr = JSON.stringify(payload);

    const headerBytes = new TextEncoder().encode(headerStr);
    const payloadBytes = new TextEncoder().encode(payloadStr);

    const encodedHeader = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      String.fromCharCode(...headerBytes)
    );

    const encodedPayload = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      String.fromCharCode(...payloadBytes)
    );

    console.log("Encoded header:", encodedHeader);
    console.log("Encoded payload:", encodedPayload);

    // Create signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      signatureInput + keySecret
    );

    console.log("Signature:", signature);

    // Return complete JWT
    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    console.log("Final token:", token);

    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
}

// // Function to verify and decode a JWT token
// function decodeToken(token: string): any {
//   try {
//     return jwt_decode(token);
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// }

// Example usage:
const payload = {
  userId: "123",
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
};

const secret = "your-secret-key";

// Create and use token
//const token = await createToken(payload, secret);
// const decoded = decodeToken(token);
//console.log("Decoded token:", decoded);

// export const generateJWT = (method: "GET" | "POST", url: string): string => {
//   const uri = `${method} ${url}`;
//   const payload = {
//     iss: "cdp",
//     nbf: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + 120,
//     sub: keyName,
//     uri,
//   };

//   const header = {
//     alg: algorithm,
//     kid: keyName,
//     nonce: toHexString(crypto.getRandomBytes(16)),
//   };

//   return jwt.sign(payload, keySecret, { algorithm, header });
// };

// // Function to convert Uint8Array to hex string
// function toHexString(bytes: Uint8Array): string {
//   return Array.from(bytes)
//     .map((byte) => byte.toString(16).padStart(2, "0"))
//     .join("");
// }

// // const main = () => {
// //   const token = generateJWT();
// //   console.log(token);
// // };

// // main();
