import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import productService
from '../services/productService.js';

// Create product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const product =
      await productService.create(
        req.body
      );

    res.status(201).json({
      status: 'success',
      data: product,
    });

  } catch (error) {

    next(error);

  }

};

// Get all products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const companyId =
      req.query.companyId as string;

    const products =
      await productService.getAll(
        companyId
      );

    res.status(200).json({
      status: 'success',
      data: products,
    });

  } catch (error) {

    next(error);

  }

};

// Get single product by ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const id =
      req.params.id as string;

    const product =
      await productService.getById(
        id
      );

    if (!product) {

      res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });

      return;

    }

    res.status(200).json({
      status: 'success',
      data: product,
    });

  } catch (error) {

    next(error);

  }

};

// Get product resources
export const getProductResources = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const id =
      req.params.id as string;

    const resources =
      await productService.getResources(
        id
      );

    res.status(200).json({
      status: 'success',
      data: resources,
    });

  } catch (error) {

    next(error);

  }

};