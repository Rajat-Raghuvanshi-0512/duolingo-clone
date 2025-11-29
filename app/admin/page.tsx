import { isAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';
import AdminApp from './app';

const AdminPage = async () => {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return redirect('/');
  }
  return <AdminApp />;
};

export default AdminPage;
