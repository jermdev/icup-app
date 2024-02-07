import { Outlet } from 'react-router-dom';
// import { useAuthStore } from '../stores';
import { SideMenu } from '@/components/shared/side-menu/SideMenu';

export const DashboardLayout = (): JSX.Element => {
  // const authStatus = useAuthStore( state => state.status );
  // const checkAuthStatus = useAuthStore( state => state.checkAuthStatus );

  // if (authStatus === 'pending') {

  //   checkAuthStatus();
  //   return <>Loading...</>
  // }

  // if ( authStatus === 'unauthorized') {
  //   return <Navigate to='/auth/login'/>
  // }

  // console.log({authStatus})

  return (
    <div className='bg-slate-200 w-full min-h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-col md:flex-row md:relative md:w-full md:min-h-fit'>
        {/* <div className="col-span-2 xl:col-span-1"> */}
        <SideMenu />

        {/* <div className="col-span-5 w-full p-4"> */}
        <div className='w-full  lg:h-[102rem] lg-lv1:h-[94rem] lg-lv2:h-[88rem] xl:h-[72rem] 2xl:h-[80rem] p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
