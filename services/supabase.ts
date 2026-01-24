/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://szfoxvvqqtfzbwbuacgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Zm94dnZxcXRmemJ3YnVhY2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTQ1MjYsImV4cCI6MjA4NDY3MDUyNn0.HOb0Qn3I0QisisyHGGN-koR4Ac6tL9pPVz4jxNKEFRk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const isSupabaseConfigured = () => true;
