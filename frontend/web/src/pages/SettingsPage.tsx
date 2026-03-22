/**
 * Settings page — shows user role and environment info.
 * Backend integration:
 *   - User details come from /api/v1/auth/me (after Firebase auth is wired)
 *   - Role is stored in users collection: { uid, role, active, createdAt }
 *   - Environment vars are read client-side (VITE_API_URL, VITE_FIREBASE_PROJECT_ID)
 */

const SettingsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "Not configured";
  const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID || "Not configured";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Account and environment configuration</p>
      </div>

      {/* Profile */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Email</span>
            {/* TODO: Replace with real user email from Firebase auth / /api/v1/auth/me */}
            <span className="text-sm font-medium">farmer@example.com</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Role</span>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded">FARMER</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="bg-success/10 text-success text-xs font-medium px-2 py-0.5 rounded">Active</span>
          </div>
        </div>
      </div>

      {/* Environment */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Environment</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">API URL</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{apiUrl}</code>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Firebase Project</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{firebaseProject}</code>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-muted-foreground">Auth Mode</span>
            <span className="bg-warning/10 text-warning text-xs font-medium px-2 py-0.5 rounded">Mock (Dev)</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Set <code>VITE_API_URL</code> and <code>VITE_FIREBASE_*</code> env vars to connect to real backend.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
