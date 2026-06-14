import * as productService from '../services/productService.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const products = await productService.getProducts(companyId);
    res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get resources for product
export const getProductResources = async (req, res, next) => {
  try {

    const { id } = req.params;

    const resources =
      await productService.getProductResources(id);

    res.status(200).json({
      status: 'success',
      data: resources,
    });

  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};

export const uploadDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    // Determine type from mimetype or filename
    let type = 'manual';
    if (file.originalname.toLowerCase().includes('diagram')) type = 'diagram';
    else if (file.originalname.toLowerCase().includes('guide')) type = 'guide';
    else if (file.originalname.toLowerCase().includes('datasheet')) type = 'datasheet';

    const documentData = {
      product_id: id,
      title: file.originalname,
      type: type,
      // Create a static URL assuming localhost:5000/uploads
      file_url: `http://localhost:5000/uploads/${file.filename}`,
      file_size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    };

    const doc = await productService.uploadDocument(documentData);

    // Call MOSS worker asynchronously (don't await it so we can return response quickly)
    import('child_process').then(({ spawn }) => {
      const pythonProcess = spawn('python', [
        'src/services/moss_worker.py',
        'process',
        id,
        file.path // Pass the physical file path to MOSS
      ]);

      pythonProcess.stdout.on('data', (data) => console.log(`MOSS: ${data}`));
      pythonProcess.stderr.on('data', (data) => console.error(`MOSS Error: ${data}`));
    });

    res.status(201).json(doc); // The frontend dashboardService expects the raw object or { data }? Let's check dashboardService.ts... wait frontend expects res.data. Let's return raw.
  } catch (error) {
    next(error);
  }
};

export const getDocuments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resources = await productService.getProductResources(id);
    // dashboardService expects an array directly from res.data, but wait, dashboardService currently expects standard format
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};
