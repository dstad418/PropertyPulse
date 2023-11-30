import WorkOrderTable from "../revised-property-menu/subcomponents/WorkOrderTable"
import PropertyReportHeader from '../revised-property-menu/subcomponents/PropertyReportHeader';
import { FC } from "react";
import CurrentIssueBar from "../revised-property-menu/subcomponents/CurrentIssueBar";
// Import any subcomponents you might need

const PropertyReport: FC = () => {

    //passed parameter from URL
    return (
        <div className="p-5">
            <PropertyReportHeader />
            <WorkOrderTable />
            <CurrentIssueBar />
        </div>
    )

}
export default PropertyReport;
