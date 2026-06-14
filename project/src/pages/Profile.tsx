// User profile with owned products and maintenance records
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { User, Package, Calendar, ArrowUpRight } from 'lucide-react';
import { userService } from '../services/userService';
import { Skeleton } from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import type {
  UserProfile as UserProfileType,
  Product,
  MaintenanceRecord,
} from '../types';

function Profile() {
  const { user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const handleRoleSwitch = async (role: 'user' | 'company') => {
    if (!clerkUser) return;
    try {
      setIsUpdatingRole(true);
      await clerkUser.update({
        unsafeMetadata: { role }
      });
      window.location.reload(); // Reload to refresh navbar and routing logic
    } catch (err) {
      console.error('Failed to update role:', err);
    } finally {
      setIsUpdatingRole(false);
    }
  };

  // Fetch user data, products, and maintenance records
  const fetchData = () => {
    setLoading(true);
    setError(false);
    Promise.all([
      userService.getProfile(),
      userService.getUserProducts(),
      userService.getMaintenanceRecords(),
    ])
      .then(([profile, prods, maint]) => {
        setUser(profile);
        setProducts(prods);
        setRecords(maint);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-8">
          <Skeleton className="h-[200px] rounded-3xl" />
          <Skeleton className="h-[300px] rounded-3xl" />
          <Skeleton className="h-[200px] rounded-3xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <ErrorState onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="space-y-10">
        {/* User information card */}
        <div className="flex items-center gap-6 rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-8 shadow-soft-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F5F7]">
            <User className="h-7 w-7 text-[#60758A]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#111315]">
              {user?.name || clerkUser?.fullName || 'User'}
            </h1>
            <p className="mt-1 text-[14px] text-[#60758A]">
              {user?.email || clerkUser?.primaryEmailAddress?.emailAddress || ''}
            </p>
            
            {/* Role Switcher for Demo Purposes */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#ECEFF3] bg-[#F8FAFC] p-2">
              <span className="text-[13px] font-medium text-[#60758A] ml-2">Role:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleRoleSwitch('user')}
                  disabled={isUpdatingRole}
                  className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                    (!clerkUser?.unsafeMetadata?.role || clerkUser.unsafeMetadata.role === 'user')
                      ? 'bg-white text-[#111315] shadow-sm'
                      : 'text-[#60758A] hover:bg-white/50 hover:text-[#111315]'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => handleRoleSwitch('company')}
                  disabled={isUpdatingRole}
                  className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${
                    clerkUser?.unsafeMetadata?.role === 'company'
                      ? 'bg-[#111315] text-white shadow-sm'
                      : 'text-[#60758A] hover:bg-white/50 hover:text-[#111315]'
                  }`}
                >
                  {isUpdatingRole ? 'Updating...' : 'Company'}
                </button>
              </div>
            </div>
            {/* End Role Switcher */}
          </div>
        </div>

        {/* Owned products section */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Package className="h-5 w-5 text-[#60758A]" />
            <h2 className="text-xl font-semibold text-[#111315]">
              My Products
            </h2>
          </div>

          {products.length === 0 ? (
            <EmptyState
              title="No products yet"
              description="Products you own or register will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <p className="text-[12px] font-medium uppercase tracking-wide text-[#60758A]">
                    {product.category || 'Product'}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#111315]">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[13px] text-[#60758A]">
                      {product.docs || 0} docs
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#60758A] transition group-hover:text-[#111315]" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Maintenance records section */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#60758A]" />
            <h2 className="text-xl font-semibold text-[#111315]">
              Maintenance Records
            </h2>
          </div>

          {records.length === 0 ? (
            <EmptyState
              title="No maintenance records"
              description="Maintenance history for your products will appear here."
            />
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-2xl border border-[rgba(96,117,138,0.1)] bg-white p-5 transition hover:bg-[#F3F5F7]/50"
                >
                  <div>
                    <h3 className="text-[15px] font-medium text-[#111315]">
                      {record.type}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#60758A]">
                      {record.productName || 'Product'} · {record.date}
                    </p>
                    <p className="mt-1 text-[13px] text-[#60758A]">
                      {record.description}
                    </p>
                  </div>
                  <Badge variant={record.status}>
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
