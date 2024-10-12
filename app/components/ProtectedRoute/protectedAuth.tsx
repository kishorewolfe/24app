import { JSX, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Or your auth state management system
import { useAppSelector } from '@/lib/hooks';
import { selectLoggedIn } from '@/lib/features/user/userDataSlice';
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent:any) => {
  return (props:any) => {
    const router = useRouter();
    let isAuthenticated = useAppSelector(selectLoggedIn);
    // Example: Using Redux for authentication state

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated]);

    // Show loading or placeholder content while redirecting
    if (!isAuthenticated) {
      return <>
      <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-cyan-900 animate-spin">
        </div>
    </div>
</div>
      </>;
    }

    // If authenticated, return the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
