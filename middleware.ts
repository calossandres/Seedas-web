import { DEFAULT_IGNORED_ROUTES } from '@clerk/nextjs/dist/types/server/authMiddleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import Header from './app/components/Header';

const isProtectedRoute = createRouteMatcher([
  '/indexPage(.*)',
  '/about(.*)',
  DEFAULT_IGNORED_ROUTES[ 'Header']
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {

    // Add custom logic to run before redirecting

    return auth().redirectToSignIn();
  }
});

export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']};


