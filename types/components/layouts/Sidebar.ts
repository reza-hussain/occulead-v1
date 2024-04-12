type SidebarItemProps = {
  isOpen?: boolean;
  icon?: React.JSX.Element;
  title: string;
  children?: SidebarItemProps[];
  disabled?: boolean;
  url?: string;
};
