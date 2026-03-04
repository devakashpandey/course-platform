// Admin Configuration
// Add email addresses that should have admin access

export const ADMIN_EMAILS = [
  'developerakky@gmail.com',
  // Add more admin emails here as needed
];

// Check if a user is an admin
export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
