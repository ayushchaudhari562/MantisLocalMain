import { supabase } from '../config/supabase.js';

export const getSessionHistory = async (sessionId) => {
  if (!sessionId) return [];
  
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(15); // "aakhri 10-15 chat yaad rhe Ai ko"

  if (error) {
    console.error("Error fetching history", error);
    return [];
  }
  return data;
};

export const saveMessage = async (sessionId, role, content) => {
  if (!sessionId) return;
  
  await supabase
    .from('chat_messages')
    .insert([{ session_id: sessionId, role, content }]);
};
