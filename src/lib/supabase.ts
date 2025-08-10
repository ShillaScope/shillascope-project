import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Database = {
  public: {
    Tables: {
      attractions: {
        Row: {
          id: string;
          title: string;
          content_type_id: string;
          area_code: string;
          sigungu_code: string;
          first_image: string | null;
          first_image2: string | null;
          map_x: string;
          map_y: string;
          addr1: string;
          addr2: string | null;
          tel: string | null;
          overview: string | null;
          created_at: string;
          updated_at: string;
          data_hash: string;
        };
        Insert: Omit<Database['public']['Tables']['attractions']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['attractions']['Insert']>;
      };
    };
  };
};