//Travis Block
/*
This is the primary component for the prooperty report. it is built up of various components that inform the user
on a few bits of statistics to give them an overview of issues occuring in a building both visually and textually.
*/

import WorkOrderTable from "../revised-property-menu/WorkOrderTable"
import PropertyReportHeader from '../revised-property-menu/PropertyReportHeader';
import { FC } from "react";
import ChartChannel from "../revised-property-menu/ChartChannel";

const PropertyReport: FC = () => {

    //passed parameter from URL
    return (
        <div className="p-5">
            <PropertyReportHeader />
            <ChartChannel />
            <WorkOrderTable />
        </div>
    )

}
export default PropertyReport;
