/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { AllIcons } from "../../../public/images/AllImages";
import { INotification } from "../../Components/Dashboard/Overview/Admin/RecentNotification";
import { useGetNotificationQuery } from "../../redux/features/school/schoolApi";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/dateFormet";
import { useSocket } from "../../context/socket-context";
import useUserData from "../../hooks/useUserData";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Loading from "../../ui/Loading";

const AlarmsPage = () => {
  const userId = useUserData()?.userId;
  const socket = useSocket()?.socket;
  const limit = 10;

  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);

  const { items, lastItemRef, isLoading, isFetchingNextPage } =
    useInfiniteScroll<
      INotification,
      {
        limit: number;
      }
    >({
      query: useGetNotificationQuery,
      items: allNotifications,
      setItems: setAllNotifications,
      queryArgs: {
        limit,
      }, // if you have other args, pass them here

      dataSelector: (data) => data?.data?.result,
      metaSelector: (data) => data?.data?.meta,
    });

  console.log({
    isLoading,
    isFetchingNextPage,
  });

  useEffect(() => {
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleNotification = (data: any) => {
      setAllNotifications((prev) => [...prev, data?.notification]);
    };

    const eventName = `notification::${userId}`;

    socket.on(eventName, handleNotification);

    return () => {
      socket.off(eventName, handleNotification); // <-- Match eventName here!
    };
  }, [socket, userId]);

  const newNotificationsByTime = items
    ?.slice() // clone array to avoid mutating state
    .sort(
      (a: INotification, b: INotification) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  console.log(newNotificationsByTime);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" bg-primary-color w-full h-full  rounded-xl">
      <div className="flex items-center bg-primary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <h1 className="text-3xl font-bold text-secondary-color">Alarms</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {newNotificationsByTime?.map((activity: INotification, i: number) => (
          <div
            key={activity._id}
            className="flex items-center gap-2 border-b border-[#e1e1e1] py-3"
            ref={
              i === newNotificationsByTime.length - 1 ? lastItemRef : undefined
            }
          >
            <div className=" p-1.5 bg-secondary-color rounded-full w-fit">
              <img src={AllIcons.bell} alt="bell" className="w-5 h-5 " />
            </div>
            <div>
              <p className="text-base-color text-base font-semibold">
                At {dayjs(activity.createdAt).format("hh:mm A")}{" "}
                {activity.message}
                {activity?.senderName && (
                  <span className="font-semibold text-red-600">
                    {" "}
                    - {activity?.senderName}
                  </span>
                )}
              </p>

              <p className="text-sm text-[#8A8D8E] mt-1">
                {formatDateTime(activity.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="w-full flex justify-center items-center mb-10">
          <div className="flex justify-center items-center ">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-[#F9DD40] animate-spin dark:text-gray-600 fill-secondary-color"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlarmsPage;
