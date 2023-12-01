import { supabase} from "../../../db/supabase";

export interface Property {
    acronym: string | null;
    description: string | null;
    issues: string | null;
    status: string | null;
    mostRecent: string | null;
}


// eslint-disable-next-line @typescript-eslint/ban-types
const fetchMenuInfo = async (setState:Function) => {

    const propertyInfo = await supabase.from('propertymenudata').select('*').order('acronym',{ascending: true} );
    const latestIssues = await supabase.from('latestentry').select('*').order('acronym',{ascending: true} );

    const issueResults = latestIssues.data.map((issue: { acronym: string, craft_code: string, ent_date: string }) => {
        return { 
            acronym: issue.acronym,
            issue: issue.craft_code,
            ent_date: issue.ent_date
        };
    });

    
    const propertyResults = propertyInfo.data.map((item: Property) => {
        return {
          acronym: item.acronym,
          description: item.description.split('- ')[1],
          issues: item.issues,
          status: item.status,
          mostRecent: (() => {
            const recentIssue = issueResults.find(obj => obj.acronym === item.acronym);
            if (recentIssue) {
              return `${recentIssue.issue}: ${recentIssue.ent_date.slice(0,10)}`;
            } else {
              return 'Error or no recent issues?';
            }
          })(),
        };
    });

    const arrayofProperties: Property[] = propertyResults.map( (obj) => ({
        acronym: obj.acronym,
        description: obj.description,
        issues: obj.issues,
        status: obj.status,
        mostRecent: obj.mostRecent
    }));

    setState(arrayofProperties);
};

export default fetchMenuInfo;