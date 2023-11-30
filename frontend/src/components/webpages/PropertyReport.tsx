import WorkOrderTable from "../revised-property-menu/subcomponents/WorkOrderTable"
import PropertyReportHeader from '../revised-property-menu/subcomponents/PropertyReportHeader';
import { FC } from "react";
import IssuesBarChart from "../revised-property-menu/subcomponents/IssuesBarChart";
// Import any subcomponents you might need

const PropertyReport: FC = () => {

    //passed parameter from URL
    return (
        <div className="p-5">
            <PropertyReportHeader />
            <WorkOrderTable />
            <IssuesBarChart />
        </div>
    )

}
export default PropertyReport;
