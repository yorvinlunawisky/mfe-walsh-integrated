export interface SidebarRoute {
  routerLink?: string;
  routerLinkActiveOptions?: { exact: boolean };
  title: string;
  icon: string;
  label: string;
  children?: SidebarRoute[];
  isCollapsible?: boolean;
  isExpanded?: boolean;
  externalApp?: string;
  externalRoute?: string;
  isExternal?: boolean;
}

export const SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    routerLink: '/dashboard',
    routerLinkActiveOptions: { exact: true },
    title: 'Dashboard',
    icon: 'pi pi-home',
    label: 'Dashboard'
  },
  {
    routerLink: '/dashboard/inspections',
    routerLinkActiveOptions: { exact: false },
    title: 'Inspections',
    icon: 'pi pi-clipboard',
    label: 'Inspections'
  },
  {
    title: 'Follow-ups',
    icon: 'pi pi-refresh',
    label: 'Follow-ups',
    isExternal: true,
    externalApp: 'juno-frontend',
    externalRoute: 'followups'
  },
  {
    title: 'Reports',
    icon: 'pi pi-chart-bar',
    label: 'Reports',
    isCollapsible: true,
    isExpanded: false,
    children: [
      {
        title: 'Performance - Inspection',
        icon: 'pi pi-chart-line',
        label: 'Performance - Inspection',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'reports-performance-inspection'
      },
      {
        title: 'Performance - Evaluator',
        icon: 'pi pi-user-edit',
        label: 'Performance - Evaluator',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'reports-performance-evaluator'
      },
      {
        title: 'Performance - Operator',
        icon: 'pi pi-users',
        label: 'Performance - Operator',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'reports-performance-operator'
      }
    ]
  },
  {
    title: 'Setup',
    icon: 'pi pi-cog',
    label: 'Setup',
    isCollapsible: true,
    isExpanded: false,
    children: [
      {
        title: 'Accounts',
        icon: 'pi pi-user',
        label: 'Accounts',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-accounts'
      },
      {
        title: 'Assignments',
        icon: 'pi pi-bookmark',
        label: 'Assignments',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-assignments'
      },
      {
        title: 'Departments',
        icon: 'pi pi-building',
        label: 'Departments',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-departments'
      },
      {
        title: 'Job Titles',
        icon: 'pi pi-id-card',
        label: 'Job Titles',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-job-titles'
      },
      {
        title: 'Inspection Templates',
        icon: 'pi pi-file-o',
        label: 'Inspection Templates',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-inspection-templates'
      },
      {
        title: 'Location Structure',
        icon: 'pi pi-sitemap',
        label: 'Location Structure',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-location-structure'
      },
      {
        title: 'Location Model',
        icon: 'pi pi-map',
        label: 'Location Model',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-location-model'
      },
      {
        title: 'Topics',
        icon: 'pi pi-tags',
        label: 'Topics',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-topics'
      },
      {
        title: 'Predefined Notes',
        icon: 'pi pi-file-edit',
        label: 'Predefined Notes',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-predefined-notes'
      },
      {
        title: 'Users',
        icon: 'pi pi-users',
        label: 'Users',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-users'
      },
      {
        title: 'Response Options',
        icon: 'pi pi-list',
        label: 'Response Options',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-response-options'
      },
      {
        title: 'MMG Settings',
        icon: 'pi pi-sliders-h',
        label: 'MMG Settings',
        isExternal: true,
        externalApp: 'juno-frontend',
        externalRoute: 'setup-mmg-settings'
      }
    ]
  },
  {
    routerLink: '/dashboard/support',
    routerLinkActiveOptions: { exact: false },
    title: 'Support',
    icon: 'pi pi-question-circle',
    label: 'Support'
  }
];