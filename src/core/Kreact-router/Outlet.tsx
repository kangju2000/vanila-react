import { useContext } from '@/core/Kreact';
import { RouterContext } from '@/App';

interface OutletProps {
  pathname: string;
}

export default function Outlet({ pathname }: OutletProps) {
  setTimeout(() => {
    const router = useContext(RouterContext);
    if (!router) {
      return;
    }
    const route = router.routes.find(route => route.pathname === pathname);

    if (!route) {
      throw new Error('NOT FOUND');
    }

    router.push(pathname, { outlet: true });
  }, 0);

  return <div id={pathname}></div>;
}
