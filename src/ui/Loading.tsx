import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" isolate aspect-video h-screen bg-[#ffffff] backdrop-blur w-full flex justify-center items-center">
      <FadeLoader color="#28314E" />
    </div>
  );
};

export default Loading;
