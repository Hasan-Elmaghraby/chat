import { useState, useEffect } from "react";

const TimeDifference = ({ pastTime }: { pastTime: string }) => {
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    const updateDifference = () => {
      const now = new Date();
      const past = new Date(pastTime);
      const diffMs = now.getTime() - past.getTime();

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      setTimeDiff(
        `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${
          minutes > 0 ? `${minutes}m ` : ""
        }1s ago`
      );
    };

    const interval = setInterval(updateDifference, 1000);
    updateDifference();

    return () => clearInterval(interval);
  }, [pastTime]);

  return <div className="text-[10px]  ">{timeDiff}</div>;
};

export default TimeDifference;
