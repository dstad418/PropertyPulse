import { useEffect, useState } from "react";
import issueData from "../src/propertyReportFunctions";
import { useParams } from "react-router-dom";
import HorizontalBarChart from "./HorizontalBarChart";

const CurrentIssueBar = () => {

const { acronym } = useParams();
const [barChartDetails, setbarChartDetails] = useState([]);

// This effect gets the data for the barchart
useEffect(() => {
    const getIssues = async() => { await issueData(acronym,setbarChartDetails); }
    getIssues();
},[acronym]);


    const labels:string[] = ['test'];
    const data:number[] = [1];

    console.log(barChartDetails);
    console.log(data);


return (
    <div>
        <h1>Test</h1>
        <HorizontalBarChart labels={labels} data={data} />
        </div>
)
  };

export default CurrentIssueBar;