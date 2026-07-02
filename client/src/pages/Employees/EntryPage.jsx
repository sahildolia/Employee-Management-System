import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const EntryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center px-5 py-10">

      <div className="max-w-7xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-10 lg:p-14 flex flex-col justify-center text-white">

          <div className="absolute -top-14 -right-14 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl"></div>

          <img
            src="../../src/assets/Welcome.png"
            alt="Welcome"
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
          />

          <div className="relative z-10 mt-10 space-y-4">

            <span className="inline-flex bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
              Employee Management System
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Manage Your Workforce Smarter
            </h1>

            <p className="text-blue-100 text-lg leading-8">
              Streamline employee records, departments,
              attendance, payroll, recruitment and HR
              operations through one unified platform.
            </p>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center p-8 lg:p-14">

          <div className="w-full max-w-md">

            <div className="text-center mb-10">

              <h2 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-3 text-lg">
                Choose your role to continue.
              </p>

            </div>

            <div className="space-y-5">

              <Link to="/auth/employee/login">

                <div className="group cursor-pointer rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 p-5 bg-white">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                        <Users
                          className="text-blue-600"
                          size={28}
                        />

                      </div>

                      <div>

                        <h3 className="text-xl font-semibold text-slate-800">
                          Employee
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Login to access your dashboard,
                          attendance and profile.
                        </p>

                      </div>

                    </div>

                    <ArrowRight
                      className="text-blue-600 group-hover:translate-x-1 transition-transform"
                    />

                  </div>

                </div>

              </Link>

              <Link to="/auth/HR/signup">

                <div className="group cursor-pointer rounded-2xl border border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 p-5 bg-white">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

                        <ShieldCheck
                          className="text-cyan-600"
                          size={28}
                        />

                      </div>

                      <div>

                        <h3 className="text-xl font-semibold text-slate-800">
                          HR Administrator
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Manage employees, departments,
                          recruitment and organization.
                        </p>

                      </div>

                    </div>

                    <ArrowRight
                      className="text-cyan-600 group-hover:translate-x-1 transition-transform"
                    />

                  </div>

                </div>

              </Link>

            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500">

              <div>
                <span className="block text-2xl font-bold text-blue-600">
                  20+
                </span>
                Modules
              </div>

              <div>
                <span className="block text-2xl font-bold text-blue-600">
                  100%
                </span>
                Responsive
              </div>

              <div>
                <span className="block text-2xl font-bold text-blue-600">
                  Secure
                </span>
                Authentication
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};