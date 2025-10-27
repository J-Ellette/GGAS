# Admin Panel Documentation

## Overview

The Green Country GGAS Admin Panel provides centralized management for license keys, users, system settings, and integrations. Access is restricted to administrators with proper credentials.

## Accessing the Admin Panel

### Method 1: From License Key Screen
1. Launch the application
2. On the license key entry screen, click "Admin Panel Access"
3. Enter admin credentials

### Method 2: From Application Menu
1. After logging in with a valid license key
2. Navigate to "Admin Panel" from the sidebar menu
3. Enter admin credentials if not already authenticated

## Admin Credentials

> ⚠️ **CRITICAL SECURITY WARNING**  
> The credentials documented below are **DEMO CREDENTIALS ONLY** for development and testing.  
> These are default credentials that MUST NOT be used in production environments.
>
> **Production Security Requirements:**
> - Change default credentials immediately after first deployment
> - Implement strong password policies  
> - Enable multi-factor authentication (when available)
> - Use a secure credential management system
> - Never commit real production credentials to version control
> - Rotate passwords regularly
> - Audit access logs frequently

**Default Demo Credentials:**
- Username: `OKE03955`
- Password: `8675309Jenny!`

> 💡 **Note**: These credentials are intentionally simple for demo purposes. Production systems should use enterprise-grade authentication systems.

> ⚠️ **Security Note**: Change the default password immediately after first login through the "Change Password" feature.

## Admin Panel Features

### 1. License Key Management

Manage software licenses for your organization and clients.

**Features:**
- Create new license keys
- Assign keys to specific users or organizations
- Set expiration dates
- Deactivate or delete existing keys
- Track key status (Active, Inactive, Expired)

**Demo License Key Format:** `GCGGAS-YYYY-XXXX-XXXX`

**Example:** `GCGGAS-2024-DEMO-KEY1`

### 2. User Management

Manage application users and their access levels.

**Features:**
- Add new users with username and email
- Assign roles to users
- Activate/deactivate user accounts
- Edit user information
- Delete users
- View user status and last login

**User Fields:**
- Username (required)
- Email (required)
- Role (required, selected from available roles)
- Status (Active/Inactive)

### 3. Deep Learning Models

Quick access to AI/ML model configurations.

**Note:** Detailed model management is available on the AI/ML Analytics page. This tab provides a shortcut to those features.

### 4. LLM Integration

Configure Large Language Model integrations for enhanced analytics and insights.

**Features:**
- Enable/Disable LLM integration
- Select LLM provider:
  - OpenAI
  - Anthropic
  - Cohere
  - Custom Endpoint
- Configure API keys (stored securely)
- Test integration connection

**Supported Use Cases:**
- Automated insights generation
- Natural language queries
- Report generation assistance
- Anomaly explanation

### 5. Theme Management

Customize the application's visual appearance.

**Available Themes:**
- **Light Theme**: Default light mode with clean interface
- **Dark Theme**: Dark mode for reduced eye strain
- **Green Country Theme**: Branded theme with Green Country colors and styling

**Features:**
- Live theme preview
- Apply theme instantly
- Theme persists across sessions

## Security Features

### Password Management

Change your admin password to maintain security:

1. Click "Change Password" button in the header
2. Enter current password
3. Enter new password (minimum 8 characters)
4. Confirm new password
5. Click "Change Password"

**Password Requirements:**
- Minimum 8 characters
- Must match confirmation
- Current password must be correct

### Session Management

- Admin sessions expire after inactivity
- Logout button available in the header
- Sensitive data is not cached

## License Key Assignment Workflow

1. Navigate to "License Keys" tab
2. Click "Add License Key" button
3. Enter license key in format: `GCGGAS-YYYY-XXXX-XXXX`
4. Specify organization or user name
5. Set expiration date
6. Click "Add"
7. Key is now active and can be used for software activation

## Best Practices

1. **Change Default Password**: Update admin password on first login
2. **Regular Key Audits**: Review and remove expired or unused license keys
3. **User Access Reviews**: Periodically review user accounts and roles
4. **Secure API Keys**: Store LLM API keys securely and rotate regularly
5. **Theme Testing**: Test theme changes to ensure readability
6. **Backup Credentials**: Maintain secure backup of admin credentials

## Troubleshooting

### Cannot Login to Admin Panel
- Verify username is exactly: `OKE03955`
- Verify password is exactly: `8675309Jenny!` (case-sensitive)
- Clear browser cache and try again

### License Key Not Accepted
- Ensure key follows format: `GCGGAS-YYYY-XXXX-XXXX`
- Check key hasn't expired
- Verify key exists in License Keys table
- Try demo key: `GCGGAS-2024-DEMO-KEY1`

### LLM Integration Not Working
- Verify API key is correct
- Check provider selection matches your API key
- Ensure network connectivity
- Test API key with provider's test endpoint

### Theme Not Applying
- Click "Apply Theme" button after selection
- Refresh application if needed
- Clear application cache

## Future Enhancements

Planned features for future releases:
- Multi-factor authentication
- Role-based access control customization
- Advanced license key analytics
- Bulk user import/export
- Theme customization builder
- Integration with external identity providers
- Audit logging for admin actions

## Support

For technical support or questions about the Admin Panel:
- Check the main README.md for general application support
- Review TECHNICAL.md for architecture details
- Submit issues through the GitHub repository

---

**Last Updated:** October 2024  
**Version:** 1.0  
**Author:** Green Country Development Team
