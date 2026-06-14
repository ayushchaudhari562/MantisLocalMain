import { supabase } from '../config/supabase.js';

export const createCompany = async (companyData) => {
  const { name } = companyData;
  
  if (!name) {
    const error = new Error('Company name is required');
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await supabase
    .from('companies')
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return data;
};

export const getCompanies = async () => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return data;
};
