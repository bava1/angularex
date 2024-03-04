 interface Links {
  link: string;
  title: string;
  icon?: string;
}
export const navigationList: Links[] = [
  { link: '', title: 'home', icon: 'home' },
  { link: '/page/tasks', title: 'tasks', icon: 'assignment' },
  { link: '/page/articles', title: 'articles', icon: 'reorder' },
  { link: '/page/contacts', title: 'contacts', icon: 'people' },
]
