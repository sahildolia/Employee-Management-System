// src/pages/HumanResources/Dashboard Childs/leavespage.jsx

import {
  Clock3,
  CheckCircle2,
  XCircle,
  PlaneTakeoff,
} from "lucide-react";

export const EmpLeavesPage = () => {
  const stats = [
    {
      title: "Pending",
      value: 12,
      color: "bg-amber-50",
      text: "text-amber-600",
      icon: <Clock3 size={24} />,
    },
    {
      title: "Approved",
      value: 45,
      color: "bg-green-50",
      text: "text-green-600",
      icon: <CheckCircle2 size={24} />,
    },
    {
      title: "Rejected",
      value: 8,
      color: "bg-red-50",
      text: "text-red-600",
      icon: <XCircle size={24} />,
    },
    {
      title: "On Leave",
      value: 5,
      color: "bg-blue-50",
      text: "text-blue-600",
      icon: <PlaneTakeoff size={24} />,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Leave Management
        </h1>

        <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-xl font-medium shadow">
          New Leave Request
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {stats.map((item) => (
          <div
            key={item.title}
            className={`${item.color}
            rounded-2xl border border-slate-200
            p-5 flex justify-between items-center`}
          >
            <div>
              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </div>

            <div className={item.text}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Upcoming Leaves
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-3">
            <div>
              <p className="font-medium">
                Rahul Sharma
              </p>
              <p className="text-sm text-slate-500">
                Annual Leave
              </p>
            </div>

            <span className="text-sm text-slate-500">
              12 Jul - 15 Jul
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <div>
              <p className="font-medium">
                Priya Verma
              </p>
              <p className="text-sm text-slate-500">
                Sick Leave
              </p>
            </div>

            <span className="text-sm text-slate-500">
              18 Jul
            </span>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl border p-5 shadow-sm overflow-auto">

        <h2 className="text-lg font-semibold mb-4">
          Recent Requests
        </h2>

        <table className="w-full min-w-[700px]">

          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Employee</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-3">Aman Singh</td>
              <td>Casual</td>
              <td>2 Days</td>
              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                  Pending
                </span>
              </td>
              <td>
                <button className="text-[#2563EB] font-medium">
                  View
                </button>
              </td>
            </tr>

          </tbody>

        </table>
      </div>

    </div>
  );
};