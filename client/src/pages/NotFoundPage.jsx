import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-slate-200">
      <TbError404 className="w-48 h-48 text-white" />
      <h1 className="text-2xl">Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};
