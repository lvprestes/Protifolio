import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-6 shadow rounded relative">
      <div className="flex justify-between items-center">
        <img className="h-8" src={job.companyId.image} alt="" />
      </div>
      <h4 className="font-medium text-xl mt-2">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 text-red-600 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4 mb-10"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 170) }}
      ></p>
      <div
        className="absolute bottom-4 flex gap-4 text-sm"
        style={{ left: "1.5rem" }}
      >
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply now
        </button>
        <button
          className="text-gray-500 border border-gray-500 rounded px-4 py-2"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
