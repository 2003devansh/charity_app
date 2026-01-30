/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Card, Button, Spin, Tabs, message } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import {
  getAvailableTasks,
  acceptTask,
  getMyTasks,
  updateTaskStatus,
} from "../redux/volenteerRedux/volenteerAction";

const { TabPane } = Tabs;

const VolunteerPage = () => {
  const dispatch = useAppDispatch();

  const {
    availableTasks,
    availableTasksLoading,
    myTasks,
    myTasksLoading,
    acceptTaskLoading,
    updateTaskLoading,
  } = useAppSelector((state) => state.volunteerTasks);

  useEffect(() => {
    dispatch(getAvailableTasks());
    dispatch(getMyTasks());
  }, [dispatch]);

  const handleAcceptTask = async (donationId: string) => {
    try {
      await dispatch(acceptTask({ donationId })).unwrap();
      message.success("Task accepted successfully");
      dispatch(getAvailableTasks());
      dispatch(getMyTasks());
    } catch (error) {
      console.error("Failed to accept task", error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await dispatch(
        updateTaskStatus({ taskId, status: "COMPLETED" }),
      ).unwrap();
      message.success("Task marked as completed");
      dispatch(getMyTasks());
    } catch (error) {
      console.error("Failed to accept task", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Volunteer Dashboard</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Available Tasks" key="1">
          {availableTasksLoading ? (
            <Spin />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTasks?.data?.length > 0 ? (
                availableTasks.data.map((task: any) => (
                  <Card key={task.id} title={task.title} className="shadow-sm">
                    <p>
                      <strong>Category:</strong> {task.category}
                    </p>
                    <p>
                      <strong>Donor:</strong> {task.donor?.name}
                    </p>
                    <p>
                      <strong>Recipient:</strong> {task.recipient?.name}
                    </p>

                    <Button
                      type="primary"
                      loading={acceptTaskLoading}
                      className="mt-4"
                      onClick={() => handleAcceptTask(task.id)}
                    >
                      Accept Task
                    </Button>
                  </Card>
                ))
              ) : (
                <p>No available tasks right now.</p>
              )}
            </div>
          )}
        </TabPane>

        <TabPane tab="My Tasks" key="2">
          {myTasksLoading ? (
            <Spin />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTasks?.tasks?.length > 0 ? (
                myTasks.tasks.map((task: any) => (
                  <Card
                    key={task.id}
                    title={task.donation?.title}
                    className="shadow-sm"
                  >
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Donor:</strong> {task.donation?.donor?.name}
                    </p>
                    <p>
                      <strong>Recipient:</strong>{" "}
                      {task.donation?.recipient?.name}
                    </p>

                    {task.status === "PENDING" && (
                      <Button
                        type="primary"
                        loading={updateTaskLoading}
                        className="mt-4"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </Card>
                ))
              ) : (
                <p>You haven’t accepted any tasks yet.</p>
              )}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default VolunteerPage;
