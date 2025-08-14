# Authentication Guards

This folder contains authentication guards for the Inspections MFE.

## Auth Guard Implementation

The `auth.guard.ts` implements a functional guard that:

1. **Checks user authentication** by validating the presence and expiration of access tokens
2. **Works in both contexts**:
   - When running as a standalone application
   - When loaded as a micro frontend through the shell
3. **Handles redirects appropriately** based on the execution context

## Design Decisions

### Why Not Reuse Shell's AuthService?

While the shell has a comprehensive `AuthService`, we chose to implement a lightweight authentication check in the MFE for the following reasons:

1. **Micro Frontend Independence**: The MFE should be able to run standalone without dependencies on the shell's services
2. **Simplified Dependencies**: Reduces coupling between shell and MFE
3. **Consistent Behavior**: Ensures authentication works the same way regardless of how the MFE is loaded

### Why Not Copy the Entire Guard?

Instead of copying the shell's guard entirely, we:

1. **Implemented a focused solution** that handles the specific needs of the MFE
2. **Maintained compatibility** with the shell's authentication system by using the same localStorage keys
3. **Added context awareness** to handle both standalone and MFE scenarios

## Usage

The guard is applied at multiple levels:

1. **App-level routing** (`app-routing.module.ts`): Protects the entire application
2. **Feature-level routing** (`inspections.module.ts`): Additional protection at the feature level

## Authentication Flow

1. User attempts to access a protected route
2. Guard checks for valid authentication tokens in localStorage
3. If authenticated: Allow access
4. If not authenticated: Redirect to login based on context
   - **MFE context**: Redirect to shell's login (`/auth/login`)
   - **Standalone context**: Redirect to login (currently falls back to shell's login)

## Future Enhancements

1. **Standalone Authentication**: Implement a complete authentication flow for standalone operation
2. **Role-based Guards**: Add guards for specific user roles (similar to `InspectorGuard` in shared)
3. **Token Refresh**: Implement automatic token refresh functionality
4. **Service Integration**: Consider creating a shared authentication service if more MFEs need similar functionality

## Best Practices

1. **Keep guards lightweight** and focused on their specific responsibility
2. **Handle both execution contexts** (standalone vs MFE)
3. **Use consistent localStorage keys** across shell and MFEs
4. **Implement proper error handling** and user feedback
5. **Document guard behavior** for future developers