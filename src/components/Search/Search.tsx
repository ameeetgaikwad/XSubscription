import { useEffect, useState } from "react";
import SearchIcon from "./components/SearchIcon";
import axios from "axios";

function Search({ setSubscriptions }: any) {
  const [value, setValue] = useState("");
  async function search() {
    try {
      if (value.length === 0) {
        const res = await axios.get("/api/subscription/subscription");
        setSubscriptions(res.data.subscriptions);
      } else {
        const res = await axios.get("/api/subscription/searchSubscription", {
          params: { reg: value },
        });
        setSubscriptions(res.data.subscriptions);
      }
    } catch (e) {
      console.log("error in Search.tsx", e);
    }
  }
  useEffect(() => {
    search();
  }, [value]);
  return (
    <>
      <div>
        <div className="flex items-center gap-2 w-full">
          <SearchIcon className="w-5 h-5" />
          <input
            type="text"
            value={value}
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
