// Supabase function calls for use in application

// Importing supabase createClient function to create a connection.
import { createClient } from '@supabase/supabase-js';

// Importing schema of db. You must add/change types if the database changes
import { Database } from './schema.ts';

// Importing env variables to connect to the db
//import dotenv from 'dotenv';
//dotenv.config();

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPA_URL,
    import.meta.env.VITE_SUPA_API);