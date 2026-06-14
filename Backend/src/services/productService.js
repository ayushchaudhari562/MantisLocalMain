import { supabase } from '../config/supabase.js';

export const createProduct = async (productData) => {
  const { company_id, name, description } = productData;
  
  if (!company_id || !name) {
    const error = new Error('Company ID and Product Name are required');
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{ company_id, name, description }])
    .select()
    .single();

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return data;
};

export const getProducts = async (companyId) => {
  let query = supabase.from('products').select('*');
  
  if (companyId) {
    query = query.eq('company_id', companyId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, companies(name)')
    .eq('id', id)
    .single();

  if (error) {
    const err = new Error(error.message);
    err.statusCode = error.code === 'PGRST116' ? 404 : 500; // PGRST116 is Supabase "not found"
    throw err;
  }

  return data;
};
