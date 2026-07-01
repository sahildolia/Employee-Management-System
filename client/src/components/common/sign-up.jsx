
import { ErrorPopup } from "./error-popup";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, User, ShieldCheck } from "lucide-react";

export const SignUP = ({ handlesignupform, handlesubmitform, stateformdata, errorpopup }) => {
  const employeestate = useSelector((state) => state.HRReducer);

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-200";

  return (
    <>
      {employeestate.error.status && <ErrorPopup error={employeestate.error.message} />}
      {errorpopup && <ErrorPopup error="Password does not match, Please try again" />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-2xl overflow-auto grid lg:grid-cols-2 max-h-[98vh]">

          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-6 lg:p-8 flex flex-col justify-center">
            <img
              src="../../src/assets/Employee-Welcome.jpg"
              alt="Welcome"
              className="w-full max-w-xs mx-auto rounded-2xl shadow-xl max-h-fit object-cover"
            />

            <h1 className="text-2xl lg:text-3xl font-bold mt-4">HR Management Portal</h1>
            <p className="mt-2 text-blue-100 leading-6 text-sm">
              Create your organization and start managing employees,
              departments, payroll, recruitment and attendance from one place.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2"><ShieldCheck size={18} /> Secure Authentication</div>
              <div className="flex items-center gap-2"><User size={18} /> Employee Management</div>
              <div className="flex items-center gap-2"><Building2 size={18} /> Organization Dashboard</div>
            </div>
          </div>

          <div className="p-5 lg:p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800">Create HR Account</h2>
            <p className="text-slate-500 mt-1 mb-4 text-sm">Fill in the details below to register your organization.</p>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600 text-sm">Personal Information</h3>

                <label className="text-xs font-medium text-slate-600">First Name</label>
                <input id="firstname" name="firstname" value={stateformdata.firstname} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Last Name</label>
                <input id="lastname" name="lastname" value={stateformdata.lastname} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Email</label>
                <input id="email" name="email" type="email" value={stateformdata.email} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Contact Number</label>
                <input id="contactnumber" name="contactnumber" value={stateformdata.contactnumber} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Password</label>
                <input id="textpassword" name="textpassword" value={stateformdata.textpassword} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Confirm Password</label>
                <input id="password" name="password" type="password" value={stateformdata.password} onChange={handlesignupform} className={inputClass} />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600 text-sm">Organization Information</h3>

                <label className="text-xs font-medium text-slate-600">Organization Name</label>
                <input id="name" name="name" value={stateformdata.name} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Description</label>
                <input id="description" name="description" value={stateformdata.description} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Organization URL</label>
                <input id="OrganizationURL" name="OrganizationURL" value={stateformdata.OrganizationURL} onChange={handlesignupform} className={inputClass} />

                <label className="text-xs font-medium text-slate-600">Organization Mail</label>
                <input id="OrganizationMail" name="OrganizationMail" value={stateformdata.OrganizationMail} onChange={handlesignupform} className={inputClass} />
              </div>

            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                onClick={handlesubmitform}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-sm"
              >
                Create Account
              </Button>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Already have an account?</span>
                <Link to="/auth/HR/login">
                  <Button variant="outline" className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 text-sm h-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
