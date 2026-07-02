import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  Building2,
  CalendarClock,
  FileText,
  UserPlus,
  Bell,
  Wallet,
  ArrowRight,
} from "lucide-react";

import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js";
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx";
import { Loading } from "../../../components/common/loading.jsx";
import { AddEmployeesDialogBox, CreateDepartmentDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx";
import { CreateSalaryDialogBox } from "../../../components/common/Dashboard/salarydialogboxes.jsx"
import { CreateNoticeDialogBox } from "../../../components/common/Dashboard/noticedialogboxes.jsx"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import AddEmpModal from "../../../components/common/Dashboard/AddEmpModal.jsx";

export const HRDashboardPage = ({formdata, handleformchange}) => {
  const DashboardState = useSelector(
    (state) => state.dashboardreducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      HandleGetDashboard({
        apiroute: "GETDATA",
      })
    );
  }, []);

  if (DashboardState.isLoading) {
    return <Loading />;
  }

  const dashboardData = DashboardState?.data || {};

  const statCards = [
    {
      title: "Employees",
      value: dashboardData?.employees || 0,
      icon: Users,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Departments",
      value: dashboardData?.departments || 0,
      icon: Building2,
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Leaves",
      value: dashboardData?.leaves || 0,
      icon: CalendarClock,
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Requests",
      value: dashboardData?.requestes || 0,
      icon: FileText,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  const notices = dashboardData?.notices || [];

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-6 md:p-8 text-white shadow-lg">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              HR Dashboard
            </h1>

            <p className="mt-3 text-blue-100 max-w-xl">
              Manage employees, departments, notices,
              leave requests and organization insights
              from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">


 <AddEmployeesDialogBox />
            <button
              className="
              bg-blue-700/30
              border
              border-white/30
              text-white
              px-4
              py-2
              rounded-xl
              backdrop-blur
            "
            >
              Create Notice
            </button>

          </div>

        </div>

      </div>

      {/* KPI CARDS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
      >
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-5
              shadow-sm
              hover:shadow-md
              transition-all
            "
            >
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-800">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`
                    ${card.bg}
                    p-3
                    rounded-2xl
                  `}
                >
                  <Icon
                    className={card.iconColor}
                    size={24}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ANALYTICS + QUICK ACTIONS */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      "
      >

        {/* CHART */}

        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm">
          <SalaryChart balancedata={dashboardData} />
        </div>

        {/* QUICK ACTIONS */}

        <div
          className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-5
        "
        >
          <h2 className="text-xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="space-y-3">

<Dialog>
  <DialogTrigger asChild>
    <button
      className="
        w-full
        flex
        items-center
        justify-between
        p-4
        rounded-2xl
        bg-blue-50
        hover:bg-blue-100
        transition
      "
    >
      <div className="flex items-center gap-3">
        <UserPlus
          size={20}
          className="text-blue-600"
        />
        <span>Add Employee</span>
      </div>

      <ArrowRight size={18} />
    </button>
  </DialogTrigger>

  <AddEmpModal
    formdata={formdata} 
   handleformchange={handleformchange}
  />
</Dialog>
            <CreateDepartmentDialogBox>
              <button
                className="
              w-full
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              bg-violet-50
              hover:bg-violet-100
              transition
            "
              >
                <div className="flex items-center gap-3">
                  <Building2
                    size={20}
                    className="text-violet-600"
                  />
                  <span>Create Department</span>
                </div>

                <ArrowRight size={18} />
              </button>
            </CreateDepartmentDialogBox>

            <CreateNoticeDialogBox>
              <button
                className="
              w-full
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              bg-amber-50
              hover:bg-amber-100
              transition
            "
              >
                <div className="flex items-center gap-3">
                  <Bell
                    size={20}
                    className="text-amber-600"
                  />
                  <span>Issue Notice</span>
                </div>

                <ArrowRight size={18} />
              </button>
            </CreateNoticeDialogBox>

            <CreateSalaryDialogBox>
              <button
                className="
              w-full
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              bg-emerald-50
              hover:bg-emerald-100
              transition
            "
              >
                <div className="flex items-center gap-3">
                  <Wallet
                    size={20}
                    className="text-emerald-600"
                  />
                  <span>Manage Salaries</span>
                </div>

                <ArrowRight size={18} />
              </button>
            </CreateSalaryDialogBox>

          </div>
        </div>
      </div>

      {/* RECENT NOTICES */}

      <div
        className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-5
      "
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Recent Notices
          </h2>
        </div>

        {notices.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No notices available yet.
          </div>
        ) : (
          <div className="divide-y">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-slate-800">
                    {notice.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {notice.description?.slice(0, 120)}
                  </p>
                </div>

                <Bell
                  className="text-blue-600"
                  size={18}
                />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};