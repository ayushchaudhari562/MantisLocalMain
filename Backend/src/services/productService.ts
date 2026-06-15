import { supabase } from '../config/supabase.js';

// Create product
export const createProduct = async (productData: any) => {
  const {
    company_id,
    name,
    description,
    category,
    image,
    status,
  } = productData;

  let finalCompanyId = company_id;

  // If company_id is missing, find the first available company or create a default one
  if (!finalCompanyId) {
    const { data: companies } = await supabase
      .from('companies')
      .select('id')
      .limit(1);

    if (companies && companies.length > 0) {
      finalCompanyId = companies[0].id;
    } else {
      // Create a default company if none exists
      const { data: newCompany } = await supabase
        .from('companies')
        .insert([{ name: 'Default Company' }])
        .select()
        .single();
      if (newCompany) {
        finalCompanyId = newCompany.id;
      }
    }
  }

  // Validate required fields
  if (!finalCompanyId || !name) {
    const error: any = new Error(
      'Company ID and Product Name are required'
    );
    error.statusCode = 400;
    throw error;
  }

  // Insert product into database
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        company_id: finalCompanyId,
        name,
        description,
        category,
        image,
        status: status || 'draft',
      },
    ])
    .select()
    .single();

  // Handle database error
  if (error) {

    const err: any = new Error(error.message);

    err.statusCode = 500;

    throw err;

  }

  return data;

};

// Get all products
export const getProducts = async (
  companyId?: string
) => {

  let query = supabase
    .from('products')
    .select('*');

  // Filter by company if provided
  if (companyId) {

    query = query.eq(
      'company_id',
      companyId
    );

  }

  const { data, error } = await query
    .order('created_at', {
      ascending: false,
    });

  // Handle database error
  if (error) {

    const err: any = new Error(error.message);

    err.statusCode = 500;

    throw err;

  }

  return data;

};

// Get single product
export const getProductById = async (
  id: string
) => {

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      companies(name)
    `)
    .eq('id', id)
    .single();

  // Handle not found / database errors
  if (error) {

    const err: any = new Error(error.message);

    err.statusCode =
      error.code === 'PGRST116'
        ? 404
        : 500;

    throw err;

  }

  return data;

};

// Get product resources
export const getProductResources = async (
  productId: string
) => {

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', {
      ascending: false,
    });

  // Handle database error
  if (error) {

    const err: any = new Error(error.message);

    err.statusCode = 500;

    throw err;

  }

  return data;

};

// Update product
export const updateProduct = async (id: string, productData: any) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    const err: any = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
  return data;
};

// Upload document
export const uploadDocument = async (documentData: any) => {
  const { data, error } = await supabase
    .from('resources')
    .insert([documentData])
    .select()
    .single();

  if (error) {
    const err: any = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
  return data;
};