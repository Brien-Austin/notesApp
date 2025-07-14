export function extractNameFromEmail(email?: string): string {
  if (!email || !email.includes("@")) return "User";
  return email.split("@")[0];
}
