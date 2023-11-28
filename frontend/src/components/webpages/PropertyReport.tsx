import { useState } from 'react';
import { useParams } from 'react-router-dom';
import issueData, { Property } from '../revised-building-menu/propertyReportFunctions';
import { useEffect } from 'react';
import { propertyData } from '../revised-building-menu/propertyReportFunctions';
import { openIssuesList } from '../revised-building-menu/propertyReportFunctions';
// Import any subcomponents you might need

function PropertyReport() {

    //passed parameter from URL
    const { acronym } = useParams();
    const [barChartDetails, setbarChartDetails] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState<Property>();
    const [issuesListDetails, setissuesListDetails] = useState([]);

    // This effect gets the data for the barchart
    useEffect(() => {
        const getProperty = async() => { await issueData(acronym,setbarChartDetails); }
        getProperty();
    },[acronym]);

    // This effect gets the same data from the PropertyMenu, but is filtered by the acronym
    useEffect(() => {
        const getProperty = async() => { await propertyData(acronym,setPropertyDetails);}
            getProperty();
        },[acronym]);

        openIssuesList(acronym,setissuesListDetails);

    // Styling inspiration came from Flowbites: https://flowbite.com/docs/components/card/
    return (
        <div className="p-5">
            <div className="w-full mb-5 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-5xl font-extrabold tracking-tigh text-white">{acronym}</h2>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">{propertyDetails?.description || "Loading..."}</span>
            </div>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ul className="flex justify-evenly">
                    <li className="text-white">{"Status: " + (propertyDetails?.status || "Loading...")}</li>
                    <li className="text-white">{"Issues: " + (propertyDetails?.issues || "Loading...")}</li>
                    <li className="text-white">{"Most Recent: " + (propertyDetails?.mostRecent || "Loading...")}</li>
                </ul>
            </div>
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
                        {issuesListDetails.map((element,index) => (
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
        </div>
    )

}

/* const PropertyReport: FC = () => {

    // a parameter that was passed via the URL
    const { acronym } = useParams();

    //building issue barchart that will show the counts of active issues in the building
    const data = await issueData(acronym);

    console.log(data);

  return (
    <div>
      <h1>{acronym}</h1>
      <div>
            <h2>Test</h2>
      </div>
    </div>
  );
};
*/
export default PropertyReport;