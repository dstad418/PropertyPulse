//Travis Block

/*This component is 2 of 3 for the Property Report. This showcases the list of active work orders in a building.
Active or open or unresolved are just work orderst that still need to be completed. Once they are completed, they would
then drop out of this list.
*/

import { useEffect, useState } from "react";
import { openIssuesList } from "./src/propertyReportFunctions";
import { useParams } from "react-router-dom";

interface IssueData {
    proposal: string | null;
    status_code: string | null;
    description: string | null;
    ent_date: string;
}

const WorkOrderTable = () => {
    
    const { acronym } = useParams();
    const [issuesListDetails, setissuesListDetails] = useState([]);

    
        // This effect gets the list of active workorders that will be used for a scrollable table on the page
        useEffect(() => {
            const getIssuesList = async() => { await openIssuesList(acronym,setissuesListDetails);}
            getIssuesList();
        },[acronym]);

    return (

        <div className="w-full mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
        <h2 className="ms-1 mb-5 text-xl font-normal text-gray-800">Open Issues</h2>
        <div className="overflow-y-auto h-72">
            <table className="w-full border-separate">
                <thead>
                    <tr>
                        <th className="w-1/8 border">Work Code</th>
                        <th className="w-1/8 border">Status</th>
                        <th className="w-1/2 border">Description</th>
                        <th className="w-1/8 border">Entry Date</th>
                    </tr>
                </thead>
                <tbody>
                {issuesListDetails.map((element:IssueData,index:number) => (
                    <tr key={index} className="even:bg-gray-200 odd:bg-white">
                        <td><a className="pl-3 text-sky-950	hover:text-sky-600" href={`https://bedrock.psu.ds.pdx.edu/aim/screen/WO_VIEW?proposal=${element.proposal}`}>{element.proposal}</a></td>
                        <td className="pl-3">{element.status_code}</td>
                        <td className="pl-3">{element.description}</td>
                        <td className="text-right pr-3">{new Date(element.ent_date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    </div>
    )
}

export default WorkOrderTable;