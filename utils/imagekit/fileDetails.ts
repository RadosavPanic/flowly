import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export const getFileDetails = async (fileId: string): Promise<FileDetails> => {
  return new Promise((resolve, reject) => {
    imagekit.getFileDetails(fileId, (error, result) => {
      if (error) reject(error);
      else resolve(result as FileDetails);
    });
  });
};
