import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  getAvailableTasks,
  acceptTask,
  getMyTasks,
  updateTaskStatus,
} from "../../redux/VolunteerRedux/VolunteerAction";
import Card from "../../components/Common/Card";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const VolunteerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { availableTasks, myTasks, loading } = useSelector(
    (state: RootState) => state.volunteer
  );
  const [user, setUser] = useState<any>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      dispatch(getAvailableTasks());
      dispatch(getMyTasks(parsedUser.id));
    }
  }, [dispatch]);

  const handleAcceptTask = async (donationId: string) => {
    if (!user) return;
    setAcceptingId(donationId);
    try {
      await dispatch(
        acceptTask({ donationId, volunteerId: user.id })
      ).unwrap();
      dispatch(getAvailableTasks());
      dispatch(getMyTasks(user.id));
    } catch (error) {
      console.error("Failed to accept task:", error);
    } finally {
      setAcceptingId(null);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    setCompletingId(taskId);
    try {
      await dispatch(
        updateTaskStatus({ taskId, status: "COMPLETED" })
      ).unwrap();
      dispatch(getMyTasks(user.id));
    } catch (error) {
      console.error("Failed to complete task:", error);
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Volunteer Dashboard</h1>
          <p className="text-gray-600 mt-1">Help deliver donations to those in need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Available Tasks</p>
              <p className="text-3xl font-bold text-blue-600">{availableTasks.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">My Tasks</p>
              <p className="text-3xl font-bold text-orange-600">{myTasks.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {myTasks.filter((t) => t.status === "COMPLETED").length}
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Tasks</h2>
            {loading ? (
              <LoadingSpinner />
            ) : availableTasks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No tasks available right now</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {availableTasks.map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">From:</span>
                        <span className="font-medium text-gray-700">
                          {task.donor?.name} ({task.donor?.location})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">To:</span>
                        <span className="font-medium text-gray-700">
                          {task.recipient?.name} ({task.recipient?.location})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptTask(task.id)}
                      disabled={acceptingId === task.id}
                      className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
                    >
                      {acceptingId === task.id ? "Accepting..." : "Accept Task"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
            {loading ? (
              <LoadingSpinner />
            ) : myTasks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">You haven't accepted any tasks yet</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {task.donation?.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">From:</span>
                        <span className="font-medium text-gray-700">
                          {task.donation?.donor?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">To:</span>
                        <span className="font-medium text-gray-700">
                          {task.donation?.recipient?.name}
                        </span>
                      </div>
                    </div>
                    {task.status === "PENDING" && (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        disabled={completingId === task.id}
                        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {completingId === task.id ? "Marking..." : "Mark as Completed"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
