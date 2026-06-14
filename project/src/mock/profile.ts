// Mock user profile and maintenance records for demo fallback
import type { UserProfile, MaintenanceRecord } from '../types';

export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Demo User',
  email: 'demo@mantis.ai',
  role: 'user',
  createdAt: '2024-01-01T00:00:00Z',
};

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    productId: 'prod-001',
    productName: 'Honda Activa 6G',
    type: 'Oil Change',
    description: 'Engine oil and filter replacement',
    date: '2024-06-01',
    status: 'completed',
  },
  {
    id: 'maint-002',
    productId: 'prod-001',
    productName: 'Honda Activa 6G',
    type: 'Brake Inspection',
    description: 'Front and rear brake pad inspection',
    date: '2024-07-15',
    status: 'scheduled',
  },
  {
    id: 'maint-003',
    productId: 'prod-002',
    productName: 'LG DualCool Inverter AC',
    type: 'Filter Cleaning',
    description: 'Deep clean air filters and condenser coils',
    date: '2024-05-20',
    status: 'overdue',
  },
];
