export interface SidebarRoute {
  routerLink?: string;
  routerLinkActiveOptions?: { exact: boolean };
  title: string;
  icon: string;
  label: string;
  children?: SidebarRoute[];
  isCollapsible?: boolean;
  isExpanded?: boolean;
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
    routerLink: '/dashboard/follow-ups',
    routerLinkActiveOptions: { exact: false },
    title: 'Follow-ups',
    icon: 'pi pi-refresh',
    label: 'Follow-ups'
  },
  {
    title: 'Reports',
    icon: 'pi pi-chart-bar',
    label: 'Reports',
    isCollapsible: true,
    isExpanded: false,
    children: [
      {
        routerLink: '/dashboard/reports/performance-inspection',
        routerLinkActiveOptions: { exact: false },
        title: 'Performance - Inspection',
        icon: 'pi pi-chart-line',
        label: 'Performance - Inspection'
      },
      {
        routerLink: '/dashboard/reports/performance-evaluator',
        routerLinkActiveOptions: { exact: false },
        title: 'Performance - Evaluator',
        icon: 'pi pi-user-edit',
        label: 'Performance - Evaluator'
      },
      {
        routerLink: '/dashboard/reports/performance-operator',
        routerLinkActiveOptions: { exact: false },
        title: 'Performance - Operator',
        icon: 'pi pi-users',
        label: 'Performance - Operator'
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
        routerLink: '/dashboard/setup/accounts',
        routerLinkActiveOptions: { exact: false },
        title: 'Accounts',
        icon: 'pi pi-user',
        label: 'Accounts'
      },
      {
        routerLink: '/dashboard/setup/assignments',
        routerLinkActiveOptions: { exact: false },
        title: 'Assignments',
        icon: 'pi pi-bookmark',
        label: 'Assignments'
      },
      {
        routerLink: '/dashboard/setup/departments',
        routerLinkActiveOptions: { exact: false },
        title: 'Departments',
        icon: 'pi pi-building',
        label: 'Departments'
      },
      {
        routerLink: '/dashboard/setup/job-titles',
        routerLinkActiveOptions: { exact: false },
        title: 'Job Titles',
        icon: 'pi pi-id-card',
        label: 'Job Titles'
      },
      {
        routerLink: '/dashboard/setup/inspection-templates',
        routerLinkActiveOptions: { exact: false },
        title: 'Inspection Templates',
        icon: 'pi pi-file-o',
        label: 'Inspection Templates'
      },
      {
        routerLink: '/dashboard/setup/location-structure',
        routerLinkActiveOptions: { exact: false },
        title: 'Location Structure',
        icon: 'pi pi-sitemap',
        label: 'Location Structure'
      },
      {
        routerLink: '/dashboard/setup/location-model',
        routerLinkActiveOptions: { exact: false },
        title: 'Location Model',
        icon: 'pi pi-map',
        label: 'Location Model'
      },
      {
        routerLink: '/dashboard/setup/topics',
        routerLinkActiveOptions: { exact: false },
        title: 'Topics',
        icon: 'pi pi-tags',
        label: 'Topics'
      },
      {
        routerLink: '/dashboard/setup/predefined-notes',
        routerLinkActiveOptions: { exact: false },
        title: 'Predefined Notes',
        icon: 'pi pi-file-edit',
        label: 'Predefined Notes'
      },
      {
        routerLink: '/dashboard/setup/users',
        routerLinkActiveOptions: { exact: false },
        title: 'Users',
        icon: 'pi pi-users',
        label: 'Users'
      },
      {
        routerLink: '/dashboard/setup/response-options',
        routerLinkActiveOptions: { exact: false },
        title: 'Response Options',
        icon: 'pi pi-list',
        label: 'Response Options'
      },
      {
        routerLink: '/dashboard/setup/mmg-settings',
        routerLinkActiveOptions: { exact: false },
        title: 'MMG Settings',
        icon: 'pi pi-sliders-h',
        label: 'MMG Settings'
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