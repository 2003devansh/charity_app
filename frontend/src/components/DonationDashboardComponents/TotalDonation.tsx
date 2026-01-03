import { Card } from "antd";
import { useAppDispatch } from "../../redux/store/hook";
import { getAllDonations } from "../../redux/donorRedux/donorAction";
import { useEffect, useState } from "react";

const TotalDonation = () => {
  const dispatch = useAppDispatch();
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchedData = async () => {
      const res = await dispatch(getAllDonations());
      setTotalDonations(res.payload.data.length);
    };
    fetchedData();
  }, [dispatch]);

  return (
    <Card className="w-fit">
      <div className="flex flex-col gap-5 w-fit bg-gray-200 px-4 py-2">
        {totalDonations}
        <p>Total donations</p>
      </div>
    </Card>
  );
};

export default TotalDonation;
