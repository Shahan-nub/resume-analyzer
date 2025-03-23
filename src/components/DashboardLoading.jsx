import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DashboardLoading = () => {
  return (
    <div className="absolute flex items-center justify-center w-full h-full backdrop-blur-sm ">
      <AiOutlineLoading3Quarters className="text-5xl font-bold animate-spin"></AiOutlineLoading3Quarters>
    </div>
  );
};

export default DashboardLoading;
