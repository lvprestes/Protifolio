import { useContext, useRef, useState } from "react";
import quill from "quill";
import { useEffect } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "./../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const { backendUrl, companyToken } = useContext(AppContext);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, category, salary, level },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success("Job added");
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setSalary(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    //INITIATE QUILL
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-3"
    >
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div
          className="h-72 w-full border-2 border-gray-300 rounded overflow-y-auto"
          ref={editorRef}
        ></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sc:gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="mb-2">Job Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
          type="number"
          placeholder="25000"
          min={0}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white rounded">
        Add
      </button>
    </form>
  );
};

export default AddJob;
