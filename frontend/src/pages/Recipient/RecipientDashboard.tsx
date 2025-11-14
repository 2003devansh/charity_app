import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  getAvailableDonations,
  getMyDonations,
  claimDonation,
} from "../../redux/RecipientRedux/RecipientAction";
import { getMyRequests } from "../../redux/RequestRedux/RequestAction";
import Card from "../../components/Common/Card";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const RecipientDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { availableDonations, myDonations, loading } = useSelector(
    (state: RootState) => state.recipient
  );
  const { requests } = useSelector((state: RootState) => state.request);
  const [user, setUser] = useState<any>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      dispatch(getAvailableDonations());
      dispatch(getMyDonations(parsedUser.id));
      dispatch(getMyRequests());
    }
  }, [dispatch]);

  const handleClaim = async (donationId: string) => {
    if (!user) return;
    setClaimingId(donationId);
    try {
      await dispatch(claimDonation({ id: donationId, recipientId: user.id })).unwrap();
      dispatch(getAvailableDonations());
      dispatch(getMyDonations(user.id));
    } catch (error) {
      console.error("Failed to claim donation:", error);
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Recipient Dashboard</h1>
            <p className="text-gray-600 mt-1">Browse donations and manage your requests</p>
          </div>
          <Link
            to="/recipient/create-request"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
          >
            Create Request
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Available Donations</p>
              <p className="text-3xl font-bold text-blue-600">{availableDonations.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">My Claims</p>
              <p className="text-3xl font-bold text-green-600">{myDonations.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">My Requests</p>
              <p className="text-3xl font-bold text-teal-600">{requests.length}</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Donations</h2>
            {loading ? (
              <LoadingSpinner />
            ) : availableDonations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No donations available right now</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {availableDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{donation.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{donation.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-3 text-sm text-gray-500">
                        <span>{donation.category}</span>
                        <span>Qty: {donation.quantity}</span>
                      </div>
                      <button
                        onClick={() => handleClaim(donation.id)}
                        disabled={claimingId === donation.id}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
                      >
                        {claimingId === donation.id ? "Claiming..." : "Claim"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Claimed Donations</h2>
            {loading ? (
              <LoadingSpinner />
            ) : myDonations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">You haven't claimed any donations yet</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {myDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{donation.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{donation.description}</p>
                        <div className="flex space-x-3 text-sm text-gray-500 mt-2">
                          <span>{donation.category}</span>
                          <span>Qty: {donation.quantity}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
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
    </div>
  );
};

export default RecipientDashboard;
