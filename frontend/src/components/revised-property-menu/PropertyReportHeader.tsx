// Travis Block
/*This component is used as part 1 of 3 of the Property Report Pages. This is exactly the same information that is found
on in the property menu, except that it will just be one building and it is broken up into two divs. 
*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "./src/propertyMenuFunctions";
import { propertyData } from "./src/propertyReportFunctions";


const PropertyReportHeader = () => {


    const { acronym } = useParams();
    const [propertyDetails, setPropertyDetails] = useState<Property>();

    // This effect gets the same data from the PropertyMenu, but is filtered by the acronym passed
    useEffect(() => {
        const getProperty = async() => { await propertyData(acronym,setPropertyDetails);}
            getProperty();
        },[acronym]);

    
return (

    <><div className="w-full mb-5 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-5xl font-extrabold tracking-tigh text-white">{acronym}</h2>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">{propertyDetails?.description || "Loading..."}</span>
    </div><div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <ul className="flex  flex-wrap justify-evenly">
                <li className="text-white"><div className="p-2">{"Status: " + (propertyDetails?.status || "Loading...")}</div></li>
                <li className="text-white"><div className="p-2">{"Issues: " + (propertyDetails?.issues || "Loading...")}</div></li>
                <li className="text-white"><div className="p-2">{"Most Recent: " + (propertyDetails?.mostRecent || "Loading...")}</div></li>
            </ul>
        </div></>
);
}

export default PropertyReportHeader;