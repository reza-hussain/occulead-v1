import Company from "assets/components/Company";
import Dashboard from "assets/components/Dashboard";
import Documents from "assets/components/Documents";
import Folder from "assets/components/Folder";
import Payment from "assets/components/Payment";
import PersonOutlined from "assets/components/PersonOutlined";
import Report from "assets/components/Report";
import Services from "assets/components/Services";
import Settings from "assets/components/Settings";
import Subscribe from "assets/components/Subscribe";

export const clinicSidebar: SidebarItemProps[] = [
  {
    title: "Dashboard",
    icon: <Dashboard width={16} height={16} />,
    url: "/dashboard",
    disabled: false
  },
  {
    title: "Master charge sheet",
    icon: <Documents width={16} height={16} />,
    url: "/masterchargesheet",
    disabled: false
  },
  {
    title: "Company",
    icon: <Company width={16} height={16} />,
    url: "/companies",
    disabled: false
  },
  {
    title: "Appointments",
    children: [
      {
        title: "Appointments List",
        url: "/appointments",
        disabled: false
      },
      {
        title: "Add Appointment",
        url: "/appointments/add",
        disabled: false
      },
      {
        title: "Generate Invoice",
        url: "/appointments/invoice",
        disabled: false
      }
    ],
    icon: <Folder width={16} height={16} />,
    disabled: false
  },
  {
    title: "Payments",
    icon: <Payment width={16} height={16} />,
    url: "/payments",
    disabled: false
  },
  {
    title: "Settings",
    icon: <Settings width={16} height={16} />,
    disabled: false,
    children: [
      {
        title: "Clinic-settings",
        url: "/settings-settings",
        disabled: false
      },
      {
        title: "Appointment Setup",
        url: "/settings/appointment-setup",
        disabled: false
      }
    ]
  },
  {
    title: "Documents",
    icon: <Documents width={16} height={16} />,
    url: "/documents",
    disabled: false
  },
  {
    title: "Subscription",
    icon: <Subscribe width={16} height={16} />,
    url: "/subscription",
    disabled: false
  },
  {
    title: "Reports",
    icon: <Report width={16} height={16} />,
    disabled: false,
    children: [
      {
        title: "Account Receivable",
        url: "/reports/account-receivable",
        disabled: false
      },
      {
        title: "Collected Revenue",
        url: "/reports/collected-revenue",
        disabled: false
      }
    ]
  },
  {
    title: "Invoices",
    icon: <Report width={16} height={16} />,
    url: "/invoices",
    disabled: false,
    children: [
      {
        title: "Account Receivable",
        url: "/invoices/account-receivable",
        disabled: false
      },
      {
        title: "Collected Revenue",
        url: "/invoices/collected-revenue",
        disabled: false
      }
    ]
  }
];

export const companySidebar: SidebarItemProps[] = [
  {
    title: "Dashboard",
    icon: <Dashboard width={16} height={16} />,
    url: "/dashboard",
    disabled: false
  },
  {
    title: "Employees",
    icon: <PersonOutlined width={16} height={16} />,
    url: "/employees",
    disabled: false
  },
  {
    title: "Service Providers",
    icon: <Services width={16} height={16} />,
    url: "/service-providers",
    disabled: false
  },
  {
    title: "Appointments",
    icon: <Folder width={16} height={16} />,
    url: "/appointments",
    disabled: false
  },
  {
    title: "Payments",
    icon: <Payment width={16} height={16} />,
    url: "/payments",
    disabled: false
  },
  {
    title: "Invoices",
    icon: <Documents width={16} height={16} />,
    url: "/invoices",
    disabled: false
  },
  {
    title: "Profile Settings",
    icon: <Settings width={16} height={16} />,
    url: "/profile-settings",
    disabled: false
  },
  {
    title: "Documents",
    icon: <Documents width={16} height={16} />,
    url: "/documents",
    disabled: false
  },
  {
    title: "Reports",
    icon: <Report width={16} height={16} />,
    url: "/documents",
    disabled: false
  }
];

export const adminSidebar: SidebarItemProps[] = [
  {
    title: "Dashboard",
    icon: <Dashboard width={16} height={16} />,
    url: "/admin/dashboard",
    disabled: false
  },
  {
    title: "Services",
    icon: <Settings width={16} height={16} />,
    url: "/admin/services",
    disabled: false
  },
  {
    title: "Service Providers",
    icon: <Services width={16} height={16} />,
    url: "/admin/service-providers",
    disabled: false
  },
  {
    title: "Companies",
    icon: <Company width={16} height={16} />,
    url: "/admin/companies",
    disabled: false
  }
];
