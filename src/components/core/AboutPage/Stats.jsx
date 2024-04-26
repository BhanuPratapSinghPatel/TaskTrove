import React from 'react'


const Stats = [
    {count: "10K", label: "Active Users"},
    // {count: "10+", label: "Mentors"},
    {count: "500+", label: "Tasks Created"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return(
    <div className="bg-richblack-500">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-3 text-center">
          {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-richblack-5">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-richblack-5">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StatsComponent
