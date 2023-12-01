// Travis Block
/*
This component provides the data to showcase the type of issues in a given building. Using the passed acrnym
the component calls supabse to retrieve the data and to present it as a piechart using a subcomponent PieChart.tsx
*/
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import issueData from "./src/propertyReportFunctions";
import PieChart from "./subcomponents/PieChart";
import BarChart from "./subcomponents/BarChart";
import { shopCountsList } from "./src/propertyReportFunctions";

Chart.register(CategoryScale);

export default function ChartChannel() {

  const { acronym } = useParams();
  const [pieChartDetails, setPieChartDetails] = useState([]);
  const [barChartDetails, setBarChartDetails] = useState([]);

  useEffect(() => {
    const pchartDetails = async() => { await issueData(acronym,setPieChartDetails);}
    pchartDetails();
  },[acronym]);

  useEffect(() => {
    const bchartDetails = async() => { await shopCountsList(acronym,setBarChartDetails);}
    bchartDetails();
  },[acronym]);

  // preference to easily see the datasets before they're passed into the component
  const pieIssueLabels = pieChartDetails.map((data) => data.issue);
  const pieChartCounts = pieChartDetails.map((data) => data.count);
  const barShopLabels = barChartDetails.map((data) => data.shop);
  const barShopCounts = barChartDetails.map((data) => data.count);

  return (
    <div className="flex justify-around">
    <div className="min-w-300 max-w-xl mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
      <PieChart labels={pieIssueLabels} dataValues={pieChartCounts} />
    </div>
        <div className="min-w-300 max-w-xl mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
        <BarChart labels={barShopLabels} dataValues={barShopCounts} />
      </div>
    </div>
  );
}
