import { MenuType } from '@/interFace/interFace';

const menu_data: MenuType[] = [
  {
    id: 1,
    hasDropdown: false,
    active: true,
    title: 'Home',
    link: '',
  },
  {
    id: 2,
    hasDropdown: true,
    megaMenu: true,
    active: true,
    title: 'Menu',
    link: '#',
    submenus: [
      // {
      //   title: 'Shop',
      //   link: '#',
      //   // megaMenu: [
      //   //   { title: 'Shop Sidebar 5 Column', link: '/shop-sidebar-5-column' },
      //   //   { title: 'Shop Sidebar 4 Column', link: '/shop-sidebar-4-column' },
      //   //   { title: 'Shop Sidebar 3 Column', link: '/shop-sidebar-3-column' },
      //   //   { title: 'Shop Full 6 Column', link: '/shop-full-6-column' },
      //   //   { title: 'Shop Full 5 Column', link: '/shop-full-5-column' },
      //   //   { title: 'Shop Full 4 Column', link: '/shop-full-4-column' },
      //   //   { title: 'Group Product', link: '/group-product' },
      //   // ],
      // },
      { title: 'Computers', link: '/contact' },
      { title: 'Software', link: '/contact' },
      { title: 'Accessories', link: '/contact' },
    ],
  },
  {
    id: 3,
    hasDropdown: false,
    active: true,
    title: 'Contact',
    link: '/contact',
  },
];

export default menu_data;
