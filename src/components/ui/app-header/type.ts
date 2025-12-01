import { Location } from 'react-router-dom';

export type TAppHeaderUIProps = {
  userName: string | undefined;
  location: Location;
  handleMenuClick: (path: string) => void;
  handleLogout: () => void;
};
