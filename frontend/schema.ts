export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ae_h_emp_e: {
        Row: {
          active: string | null
          emp_type: string | null
          fname: string | null
          lname: string | null
          shop_person: string
        }
        Insert: {
          active?: string | null
          emp_type?: string | null
          fname?: string | null
          lname?: string | null
          shop_person: string
        }
        Update: {
          active?: string | null
          emp_type?: string | null
          fname?: string | null
          lname?: string | null
          shop_person?: string
        }
        Relationships: []
      }
      ae_h_sch_d: {
        Row: {
          seq: string
          shop_person: string
          work_day: string | null
        }
        Insert: {
          seq: string
          shop_person: string
          work_day?: string | null
        }
        Update: {
          seq?: string
          shop_person?: string
          work_day?: string | null
        }
        Relationships: []
      }
      ae_l_shp_d: {
        Row: {
          date_from: string | null
          shop: string
          shop_person: string
        }
        Insert: {
          date_from?: string | null
          shop: string
          shop_person: string
        }
        Update: {
          date_from?: string | null
          shop?: string
          shop_person?: string
        }
        Relationships: []
      }
      ae_p_phs_e: {
        Row: {
          bldg: string | null
          category: string | null
          craft_code: string | null
          description: string | null
          edit_date: string | null
          ent_date: string | null
          order_type: string | null
          proposal: string
          shop: string | null
          sort_code: string
          status_code: string | null
        }
        Insert: {
          bldg?: string | null
          category?: string | null
          craft_code?: string | null
          description?: string | null
          edit_date?: string | null
          ent_date?: string | null
          order_type?: string | null
          proposal: string
          shop?: string | null
          sort_code: string
          status_code?: string | null
        }
        Update: {
          bldg?: string | null
          category?: string | null
          craft_code?: string | null
          description?: string | null
          edit_date?: string | null
          ent_date?: string | null
          order_type?: string | null
          proposal?: string
          shop?: string | null
          sort_code?: string
          status_code?: string | null
        }
        Relationships: []
      }
      ae_p_pro_e: {
        Row: {
          bldg: string | null
          category: string | null
          description: string | null
          edit_date: string | null
          ent_date: string | null
          order_type: string | null
          proposal: string
          status_code: string | null
        }
        Insert: {
          bldg?: string | null
          category?: string | null
          description?: string | null
          edit_date?: string | null
          ent_date?: string | null
          order_type?: string | null
          proposal: string
          status_code?: string | null
        }
        Update: {
          bldg?: string | null
          category?: string | null
          description?: string | null
          edit_date?: string | null
          ent_date?: string | null
          order_type?: string | null
          proposal?: string
          status_code?: string | null
        }
        Relationships: []
      }
      ae_p_pro_s: {
        Row: {
          proposal: string
          shop_person: string
          sort_code: string
        }
        Insert: {
          proposal: string
          shop_person: string
          sort_code: string
        }
        Update: {
          proposal?: string
          shop_person?: string
          sort_code?: string
        }
        Relationships: []
      }
      ae_p_pst_e: {
        Row: {
          proposal: string
          sort_code: string
          status_code: string
          status_date: string
        }
        Insert: {
          proposal: string
          sort_code: string
          status_code: string
          status_date: string
        }
        Update: {
          proposal?: string
          sort_code?: string
          status_code?: string
          status_date?: string
        }
        Relationships: []
      }
      ae_p_sta_e: {
        Row: {
          proposal: string
          status_code: string
          status_date: string
        }
        Insert: {
          proposal: string
          status_code: string
          status_date: string
        }
        Update: {
          proposal?: string
          status_code?: string
          status_date?: string
        }
        Relationships: []
      }
      ae_s_bld_c: {
        Row: {
          bldg: string
          bldg_status: string | null
          description: string | null
          prop_type: string | null
        }
        Insert: {
          bldg: string
          bldg_status?: string | null
          description?: string | null
          prop_type?: string | null
        }
        Update: {
          bldg?: string
          bldg_status?: string | null
          description?: string | null
          prop_type?: string | null
        }
        Relationships: []
      }
      ae_s_bld_c_udf: {
        Row: {
          bldg: string
          custom003: string | null
          custom007: string | null
          custom010: string | null
        }
        Insert: {
          bldg: string
          custom003?: string | null
          custom007?: string | null
          custom010?: string | null
        }
        Update: {
          bldg?: string
          custom003?: string | null
          custom007?: string | null
          custom010?: string | null
        }
        Relationships: []
      }
      ae_x_cft_e: {
        Row: {
          active: string | null
          category: string
          craft_code: string
          description: string | null
          order_type: string
        }
        Insert: {
          active?: string | null
          category: string
          craft_code: string
          description?: string | null
          order_type: string
        }
        Update: {
          active?: string | null
          category?: string
          craft_code?: string
          description?: string | null
          order_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      heatmapcounts: {
        Row: {
          acronym: string | null
          count: number | null
          craft_code: string | null
          property: string | null
        }
        Relationships: []
      }
      latestentry: {
        Row: {
          acronym: string | null
          bldg: string | null
          craft_code: string | null
          ent_date: string | null
        }
        Relationships: []
      }
      openactiveissues: {
        Row: {
          craft_code: string | null
        }
        Relationships: []
      }
      openissues: {
        Row: {
          acronym: string | null
          description: string | null
          ent_date: string | null
          property: string | null
          proposal: string | null
          recordurl: string | null
          status_code: string | null
        }
        Relationships: []
      }
      propertyissues: {
        Row: {
          property: string | null
          total_issues: number | null
        }
        Relationships: []
      }
      propertyissuetrends: {
        Row: {
          acronym: string | null
          bldg: string | null
          issue: string | null
          issue_count_per_month: number | null
          month: number | null
          year: number | null
        }
        Relationships: []
      }
      propertymenudata: {
        Row: {
          acronym: string | null
          description: string | null
          issues: number | null
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

