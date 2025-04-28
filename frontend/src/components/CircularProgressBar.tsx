import React from "react";
import "@/styles/CircularProgressBar.css";

const CircularProgressBar = ({ percentage }: { percentage: number }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <span className="circular-progress">
      <svg
        className="circular-progress-svg"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <circle
          className="circular-progress-circle-bg"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
        />
        <circle
          className="circular-progress-circle"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="circular-progress-text">{percentage}%</div>
    </span>
  );
};

export default CircularProgressBar;
