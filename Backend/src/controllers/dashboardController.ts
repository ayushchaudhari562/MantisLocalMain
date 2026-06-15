import { supabase } from '../config/supabase.js';

export const getStats = async (req, res, next) => {
  try {
    // Get total products
    const { count: productCount, error: productError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (productError) throw productError;

    // Get total documents (resources)
    const { count: documentCount, error: documentError } = await supabase
      .from('resources')
      .select('*', { count: 'exact', head: true });

    if (documentError) throw documentError;

    // Get total chat sessions (diagnostics)
    const { count: chatCount, error: chatError } = await supabase
      .from('chat_sessions')
      .select('*', { count: 'exact', head: true });

    if (chatError) throw chatError;

    res.status(200).json({
      totalProducts: productCount || 0,
      totalDocuments: documentCount || 0,
      totalDiagnostics: chatCount || 0,
      activeUsers: 1, // Hardcoded active users for demo
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsCards = async (req, res, next) => {
  try {
    // In a real app, this would query timeseries data.
    // For now, we'll return dynamic but static-shaped cards based on counts.
    
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: documentCount } = await supabase.from('resources').select('*', { count: 'exact', head: true });
    
    res.status(200).json([
      { id: '1', label: 'Total Products', value: productCount || 0, change: '+12%', trend: 'up' },
      { id: '2', label: 'Documents', value: documentCount || 0, change: '+5%', trend: 'up' },
      { id: '3', label: 'Diagnostics', value: '1.2K', change: '+8%', trend: 'up' }, // Mocking diagnostics volume
      { id: '4', label: 'Active Users', value: 89, change: '+5', trend: 'up' },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getCompanyProducts = async (req, res, next) => {
  try {
    // Fetch all products with their resources count
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        resources ( count )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map to frontend expected format
    const mappedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      status: p.status || 'Active',
      docs: p.resources[0]?.count || 0, // supabase returns array of counts or object depending on version, usually [{count}]
    }));

    res.status(200).json(mappedProducts);
  } catch (error) {
    next(error);
  }
};
