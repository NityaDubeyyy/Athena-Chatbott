// import ImageKit from "imagekit";

// var imageKit=new ImageKit({
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// })
// export default imageKit;
import ImageKit from "imagekit";

let imageKit = null;

// Initialize ImageKit only if credentials are available
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    console.log("✓ ImageKit initialized successfully");
} else {
    console.warn("⚠ ImageKit credentials not found in .env - image features will be unavailable");
}

export default imageKit;
