import { Navigates } from '@/utils/router/navigates';

const navigates = new Navigates();

export function useRouter() {
  return navigates;
}

export function useRoute() {
  const currentPages = getCurrentPages();
}
