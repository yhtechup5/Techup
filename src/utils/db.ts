import * as dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

export default postgres(process.env.SUPABASE_URI!);