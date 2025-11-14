import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { getAllDonations } from "../../redux/DonorRedux/DonorAction";
import Card from "../../components/Common/Card";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const DonorDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { donations, loading } = useSelector((state: RootState) => state.donor);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    dispatch(getAllDonations());
  }, [dispatch]);

  const myDonations = donations.filter((d) => d.donorId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-700";
      case "CLAIMED":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your donations and make a difference</p>
          </div>
          <Link
            to="/donor/create-donation"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Create New Donation
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Total Donations</p>
              <p className="text-3xl font-bold text-blue-600">{myDonations.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Available</p>
              <p className="text-3xl font-bold text-green-600">
                {myDonations.filter((d) => d.status === "AVAILABLE").length}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Delivered</p>
              <p className="text-3xl font-bold text-teal-600">
                {myDonations.filter((d) => d.status === "DELIVERED").length}
              </p>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Donations</h2>
          {loading ? (
            <LoadingSpinner />
          ) : myDonations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't created any donations yet</p>
              <Link
                to="/donor/create-donation"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first donation
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{donation.title}</h3>
                      <p className="text-gray-600 mt-1">{donation.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-sm text-gray-500">
                          Category: <span className="font-medium">{donation.category}</span>
                        </span>
                        <span className="text-sm text-gray-500">
                          Quantity: <span className="font-medium">{donation.quantity}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
