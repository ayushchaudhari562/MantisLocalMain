import * as companyService from '../services/companyService.js';

export const createCompany = async (req, res, next) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json({
      status: 'success',
      data: company
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getCompanies();
    res.status(200).json({
      status: 'success',
      data: companies
    });
  } catch (error) {
    next(error);
  }
};
