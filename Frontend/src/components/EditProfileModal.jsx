import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    username: user?.username || "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.username.trim()) return;

    setLoading(true);

    try {
      await updateProfile(form);
      onClose();
    } catch (err) {
      console.log("Update failed:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-200 outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          Edit Profile
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Update username or change password.
        </p>

        {/* Username */}
        <label className="text-sm font-medium text-gray-700">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className={`${inputClass} mb-4`}
        />

        {/* Old Password */}
        <label className="text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder="Enter old password"
          className={`${inputClass} mb-4`}
        />

        {/* New Password */}
        <label className="text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          className={`${inputClass} mb-5`}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
