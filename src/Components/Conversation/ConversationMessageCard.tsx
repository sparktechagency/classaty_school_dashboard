/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTime } from "../../utils/dateFormet";
import ImagePreviewer from "../../utils/ImagePreviewer";

const ConversationMessageCard = ({ msg, userData, imageUrl }: any) => {
  return (
    <div>
      <div>
        <div className="flex items-start gap-1 mb-2">
          {/* {msg?.sender !== null && (
            <Image
              loading="lazy"
              src={
                msg?.sender?.petImage
                  ? imageUrl + msg.sender.petImage
                  : msg?.image
                  ? imageUrl + msg.image
                  : "/assets/images/user.png"
              }
              width={1000}
              height={1000}
              alt="Profile"
              className={`h-6 w-6 object-cover rounded-md relative mt-2 ${
                msg?.sender === userData?.userId ||
                msg?.sender?.toString() === userData?.userId
                  ? "order-last"
                  : "order-first"
              }`}
              sizes="100vw"
            />
          )} */}
          <div
            className={`flex items-center gap-2 w-full ${
              msg?.sender === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "justify-end"
                : msg?.sender !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div>
              {msg?.file && (
                <div
                  className={`grid grid-cols-1  ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right text-white "
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  <ImagePreviewer
                    msg={msg}
                    imageUrl={imageUrl}
                    image={msg?.file}
                    userData={userData}
                  />
                </div>
              )}
              {msg?.text_message?.length > 0 && (
                <p
                  className={`py-1 px-3 mt-0.5 rounded-md ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right  text-white bg-[#28314E]"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.text_message}
                </p>
              )}

              {msg?.sender !== null && (
                <p
                  className={`text-[11px] mt-0.5 text-secondary-color ${
                    msg?.sender === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageCard;
