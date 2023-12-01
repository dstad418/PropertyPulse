// Travis Block
/* This File is to organize the functions that are used to call for data within the property Report
I am personally not a fan of having functions defined within the components much, so this file just takes them out
of the equation and into their only file so I do not get dizzy looking at my own code.*/

/* eslint-disable @typescript-eslint/ban-types */
import { supabase} from "../../../db/supabase";

export interface Property {
    acronym: string | null;
    description: string | null;
    issues: string | null;
    status: string | null;
    mostRecent: string | null;
}

/* this pulls the issue counts within a particular building. Recall that on the property report a Param
is passed that is the building acronym. This is what filters out the results */

const issueData = async (bldg:string | undefined, setState:Function) => {

    //making a call to get the number of active issues in the property by filtering with the acronym
    const chartData = await supabase.from('heatmapcounts').select('craft_code,count').eq("acronym", bldg);
    //pulling the returned data and organizing it in a separate array
    const dataResults = chartData.data.map((data: { craft_code: string, count: number}) => {
        return {
            issue: data.craft_code,
            count: data.count
        };
    });

    setState(dataResults);
};

/* this is the same function to retrieve property data that you would see in the Building Menu Component
however, this is more narrowed, again by the buildings acronym rather than getting all buildings*/
export const propertyData = async(bldg:string | undefined, setState:Function) => {

    const propertyInfo = await supabase.from('propertymenudata').select('*').eq("acronym", bldg);
    const latestIssues = await supabase.from('latestentry').select('*').eq("acronym", bldg);

    const issueResults = latestIssues.data.map((issue: { acronym: string, craft_code: string, ent_date: string }) => {
        return { 
            acronym: issue.acronym,
            issue: issue.craft_code,
            ent_date: issue.ent_date
        };
    });

    const propertyResult = propertyInfo.data.map((prop: {acronym: string, description:string, issues:number, status:string}) => {
        return {
            acronym: prop.acronym,
            description: prop.description.split('- ')[1],
            issues: prop.issues,
            status: prop.status,
            mostRecent: (() => {
                const recentIssue = issueResults.find(obj => obj.acronym === prop.acronym);
                if (recentIssue) {
                  return `${recentIssue.issue} - ${recentIssue.ent_date.slice(0,10)}`;
                } else {
                  return 'Error or no recent issues?';
                }
              })(),
        };
    })

    const results = propertyResult[0];
    setState(results);
}

/* This is function retrieves open work orders within the building. Note that the status codes here are ones that are
considered 'open' meaning work is still occuring on them by a trades employee */
export const openIssuesList = async(acronym:string | undefined, setState:Function) => {
    const propertyCode = await supabase.from('ae_s_bld_c_udf').select('bldg').eq("custom003", acronym);
    const bldgCode = propertyCode.data[0].bldg;
    const openIssues = await supabase.from('ae_p_pro_e').select('proposal,status_code,description,ent_date')
    .in('status_code',
    ['11-OPEN',
    '50-ASSGN',
    '45-PARTS ON ORDER',
    '60-WIP',
    '63-MONITORING']
    ).eq('bldg',bldgCode);
    
    setState(openIssues.data);
}

export const shopCountsList = async(acronym:string | undefined, setState:Function) => {
    const propertyCode = await supabase.from('ae_s_bld_c_udf').select('bldg').eq("custom003", acronym);
    const bldgCode = propertyCode.data[0].bldg;
    const shopCounts = await supabase.from('shopcounts').select('shop,count').eq("bldg",bldgCode);
    
    setState(shopCounts.data);
}

export default issueData;