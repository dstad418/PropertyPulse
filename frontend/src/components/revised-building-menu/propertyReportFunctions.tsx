import { supabase} from "../../db/supabase";

export interface Property {
    acronym: string | null;
    description: string | null;
    issues: string | null;
    status: string | null;
    mostRecent: string | null;
}

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


export default issueData;