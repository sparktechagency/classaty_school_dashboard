/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImagePreviewer = ({
  imageUrl,
  image,
  msg,
  userData,
  imgHeight,
}: {
  imageUrl: string;
  image: string;
  msg: any;
  userData: any;
  imgHeight?: number;
}) => {
  return (
    <PhotoProvider>
      <div className={`w-32 ${imgHeight ? `h-[${imgHeight}px]` : "h-auto"}`}>
        <PhotoView src={imageUrl + image}>
          <img
            loading="lazy"
            src={imageUrl + image}
            alt="Profile"
            height={500}
            width={500}
            className={`cursor-pointer h-32 object-cover object-top rounded-md relative border border-[#FF6740] ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "order-last"
                : "order-first"
            }`}
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default ImagePreviewer;
