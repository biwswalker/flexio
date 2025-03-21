import type { NavSectionProps, NavItemDataProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------
export const navMenuData = (companies: Company[], projects: Project[]): NavSectionProps['data'] => {
  const companieMenus: NavItemDataProps[] = companies.map((company) => ({
    title: company.name,
    path: paths.management.companies.detail(company.shortName),
  }));
  const projectMenus: NavItemDataProps[] = projects.map((project) => ({
    title: project.name,
    path: paths.management.companies.detail(project.shortName),
  }));
  return [
    /**
     * Overview
     */
    {
      subheader: 'Overview',
      items: [
        {
          title: 'แดชบอร์ด',
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
          // info: <Label>v{CONFIG.appVersion}</Label>,
        },
        {
          title: 'ผู้ใช้งานระบบ',
          path: paths.user.root,
          icon: ICONS.user,
        },
      ],
    },
    /**
     * Management
     */
    {
      subheader: 'การจัดการ',
      items: [
        {
          title: 'บริษัท',
          path: paths.management.companies.root,
          icon: ICONS.banking,
          info:
            companieMenus.length > 0 ? (
              <Label color="info" variant="soft">
                {companieMenus.length}
              </Label>
            ) : null,
          children: [
            ...companieMenus,
            {
              title: 'เพิ่มบริษัท',
              path: paths.management.companies.new,
              icon: ICONS.blank,
            },
          ],
        },
        {
          title: 'โครงการ',
          path: paths.management.projects.root,
          icon: ICONS.product,
          info:
            projectMenus.length > 0 ? (
              <Label color="info" variant="soft">
                {projectMenus.length}
              </Label>
            ) : null,
          children: [
            ...projectMenus,
            {
              title: 'เพิ่มโครงการ',
              path: paths.management.projects.new,
              icon: ICONS.blank,
            },
          ],
        },
        {
          title: 'รายรับ/รายจ่าย',
          path: paths.management.incomeExpense.root,
          icon: ICONS.invoice,
          children: [
            {
              title: 'รายการรายรับ/รายจ่าย',
              path: paths.management.incomeExpense.transactions,
            },
          ],
        },
        {
          title: 'เอกสาร',
          path: paths.management.documents.root,
          icon: ICONS.blog,
          children: [
            {
              title: 'ใบเสนอราคา',
              path: paths.management.documents.quotations,
            },
            {
              title: 'ใบแจ้งหนี้',
              path: paths.management.documents.invoices,
            },
            {
              title: 'ใบเสร็จรับเงิน',
              path: paths.management.documents.receives,
            },
          ],
        },
      ],
    },
  ];
};
