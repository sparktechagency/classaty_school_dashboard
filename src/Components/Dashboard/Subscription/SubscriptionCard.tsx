import { MdDelete, MdOutlineDone } from "react-icons/md";

// Define the type for a subscription (sub)
interface Subscription {
  planName: string;
  price: number;
  timeline: number;
  numberOfChildren: number;
  features: string[];
}

interface SubscriptionCardProps {
  sub: Subscription;
  showUpdateModal: (sub: Subscription) => void;
  showDeleteModal: (sub: Subscription) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  sub,
  showUpdateModal,
  showDeleteModal,
}) => {
  return (
    <div className="w-full max-w-full sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[400px] flex flex-col justify-between  text-secondary-color p-6 rounded-3xl shadow-lg border border-[#E1E1E1]">
      <div>
        <div className="p-1 bg-primary-color rounded-full w-fit ml-auto cursor-pointer flex justify-end items-center gap-2">
          {/* <Switch defaultChecked size="small" /> */}
          <MdDelete
            onClick={() => showDeleteModal(sub)}
            className="text-red-500 size-6 "
          />
        </div>
        <h3 className="text-xl md:text-2xl lg:text-3xl text-start text-secondary-color font-bold mb-2">
          {sub?.planName}
        </h3>
        <p className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl text-start font-bold mb-5">
          {sub?.price} KWD/
          <span className="text-lg sm:text-xl lg:text-2xl">
            {sub?.timeline}
          </span>
        </p>
        <ul className="mb-5">
          <li className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-secondary-color -mt-4">
              <MdOutlineDone className="size-3 text-primary-color" />
            </div>
            <p className="lg:text-lg text-secondary-color mb-5">
              Number of children {sub?.numberOfChildren}
            </p>
          </li>
          {sub?.features?.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-secondary-color -mt-4">
                <MdOutlineDone className="size-3 text-primary-color" />
              </div>
              <p className="lg:text-lg text-secondary-color mb-5">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() => showUpdateModal(sub)}
          className="w-full py-3 text-lg sm:text-xl lg:text-2xl rounded-2xl text-primary-color font-bold bg-secondary-color cursor-pointer"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
