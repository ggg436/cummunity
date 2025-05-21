// Clerk configuration file
// This centralizes all Clerk-related configuration

// Get the Clerk publishable key from environment variables
export const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

// Check and log Clerk configuration
if (typeof publishableKey !== 'string') {
  throw new Error('Missing Clerk publishable key');
}

// Standard paths for Clerk authentication
export const clerkPaths = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  afterSignIn: '/',
  afterSignOut: '/',
  ssoCallback: '/sso-callback',
};

// Define appearance settings for Clerk components
export const clerkAppearance = {
  layout: {
    socialButtonsVariant: 'iconButton',
    socialButtonsPlacement: 'bottom',
    termsPageUrl: 'https://easy-learning-hub.vercel.app/terms',
    privacyPageUrl: 'https://easy-learning-hub.vercel.app/privacy',
  },
  variables: {
    colorPrimary: '#0C4A6E',
    colorText: '#0F172A',
  },
  elements: {
    card: 'shadow-lg rounded-lg border border-sky-800/20',
    formButtonPrimary: 'bg-sky-800 hover:bg-sky-900 text-white',
    formFieldInput: 'border-gray-300 focus:ring-sky-800 focus:border-sky-800',
    socialButtonsIconButton: 'border-gray-300 hover:bg-gray-50',
    footer: 'text-gray-500',
  },
}; 