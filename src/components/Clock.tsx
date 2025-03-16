import { useState, useEffect } from "react";

const TimeDifference = ({ pastTime }: { pastTime: string }) => {
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    const updateDifference = () => {
      const now = new Date();
      const past = new Date(pastTime);
      const diffMs = now.getTime() - past.getTime(); // Difference in milliseconds

      // console.log("time" + now.getTime());

      // Convert to days, hours, minutes, and seconds
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeDiff(
        `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${
          minutes > 0 ? `${minutes}m ` : ""
        }1s ago`
      );
    };

    // Update every second
    const interval = setInterval(updateDifference, 1000);
    updateDifference(); // Call immediately

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pastTime]);

  return <div className="text-[10px]  ">{timeDiff}</div>;
};

export default TimeDifference;
