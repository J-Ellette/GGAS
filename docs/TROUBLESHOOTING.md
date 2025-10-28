# 🛠️ Troubleshooting Guide & FAQ

**Green Country: Greenhouse Gas Accounting Software**  
*Common Issues and Solutions*

---

## 🚨 Emergency Access

### Can't Access the Application?

**Demo License Key**: `GCGGAS-2024-DEMO-KEY1`

**Admin Panel Bypass**: Click "Admin Panel Access" on license screen

- **Username**: `OKE03955`
- **Password**: `8675309Jenny!`

---

## 🔑 License Key Issues

### Q: "Invalid license key" error

**Solutions**:

1. Try demo key: `GCGGAS-2024-DEMO-KEY1`
2. Check for typos (keys are case-sensitive)
3. Use admin bypass option
4. Clear browser cache: `localStorage.clear()` in DevTools

### Q: License key format requirements

**Format**: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`

**Valid Examples**:

- `GCGGAS-2024-DEMO-KEY1` (Legacy demo)
- `GG01-EN98-FD00-3FFF-FFWH-LR55` (Enterprise)
- `GG01-TR42-1400-0124-F5B7-TW7C` (Trial)

### Q: License expired or doesn't work

**Steps**:

1. Use admin panel to generate new license
2. Contact support for enterprise licenses
3. Use demo key for testing

---

## 🖥️ Application Startup Issues

### Q: Application won't start

**Common Causes & Fixes**:

1. **Node.js version mismatch**

   ```bash
   npm run rebuild
   ```

2. **Missing dependencies**

   ```bash
   npm install
   npm start
   ```

3. **Corrupted build**

   ```bash
   npm run build
   npm start
   ```

### Q: White screen or blank window

**Solutions**:

1. Check DevTools console for errors (`Ctrl+Shift+I`)
2. Clear application data
3. Restart application
4. Check license key validity

### Q: Database errors on startup

**Fix**: Delete database file to reset:

- **Windows**: `%APPDATA%/ggas/`
- **macOS**: `~/Library/Application Support/ggas/`
- **Linux**: `~/.config/ggas/`

---

## 🔧 Performance Issues

### Q: Application running slowly

**Optimization Steps**:

1. Close unnecessary browser tabs
2. Restart the application
3. Check available RAM (8GB+ recommended)
4. Clear application cache
5. Reduce number of open charts/visualizations

### Q: High memory usage

**Solutions**:

1. Navigate to Dashboard to reset state
2. Close complex pages (AI Analytics, Advanced Features)
3. Restart application
4. Check for memory leaks in DevTools

---

## 📊 Data & Calculations

### Q: Calculations not working

**Checklist**:

1. Verify activity data is entered correctly
2. Check emission factors are available
3. Ensure data quality score > 50%
4. Verify correct units are selected
5. Check scope assignments (1, 2, or 3)

### Q: Data not saving

**Troubleshooting**:

1. Check database connection
2. Verify sufficient disk space
3. Try refreshing the page
4. Check browser localStorage limits
5. Restart application

### Q: Import/export issues

**Common Solutions**:

1. Check file format (CSV, JSON)
2. Verify file size limits
3. Ensure proper column headers
4. Check for special characters
5. Try smaller data sets

---

## 🧠 AI Features Not Working

### Q: AI features disabled or unavailable

**Possible Reasons**:

1. **License Type**: Trial licenses have limited AI features
2. **Operation Mode**: Check AI Settings page
3. **Manual Mode**: AI may be intentionally disabled
4. **Feature Toggles**: Individual features may be off

**Fix**: Navigate to **AI & Strategic Planning** → **AI Settings**

### Q: AI suggestions not appearing

**Steps to Enable**:

1. Check operation mode (should not be "Manual Only")
2. Verify individual AI features are enabled
3. Check data quality requirements
4. Ensure sufficient data volume

---

## 🔐 Admin Panel Issues

### Q: Can't access admin panel

**Login Credentials**:

- **Username**: `OKE03955` (case-sensitive)
- **Password**: `8675309Jenny!` (case-sensitive)

**If still can't access**:

1. Clear browser cache
2. Check for typos
3. Try incognito/private browsing mode
4. Restart application

### Q: Admin panel features not working

**Common Issues**:

1. **User Management**: Check database connection
2. **License Management**: Verify admin permissions
3. **Theme Changes**: May require application restart
4. **Settings Not Saving**: Check localStorage permissions

---

## 🌐 Network & Connectivity

### Q: License validation fails

**Network Issues**:

1. Check internet connection
2. Verify firewall settings
3. Try offline validation (7-day grace period)
4. Use demo license for offline testing

### Q: AI features require internet

**For Online AI Features**:

1. Check internet connectivity
2. Verify API endpoints are accessible
3. Check corporate firewall settings
4. Use manual alternatives if offline

---

## 💻 Platform-Specific Issues

### Windows Issues

1. **Antivirus blocking**: Add GGAS to exclusions
2. **Windows Defender**: Allow through firewall
3. **Admin rights**: Run as administrator if needed
4. **Path length limits**: Keep installation path short

### macOS Issues

1. **Gatekeeper warnings**: Right-click → Open to bypass
2. **Permission dialogs**: Allow all requested permissions
3. **Notarization**: May see security warnings (normal)

### Linux Issues

1. **Missing dependencies**: Install build-essential
2. **Permission errors**: Check file permissions
3. **Display issues**: Verify X11/Wayland compatibility

---

## 🗂️ File & Data Management

### Q: Where is my data stored?

**Locations**:

- **Windows**: `%APPDATA%\ggas\`
- **macOS**: `~/Library/Application Support/ggas/`
- **Linux**: `~/.config/ggas/`

### Q: How to backup data?

**Steps**:

1. Close application
2. Copy entire GGAS data folder
3. Store backup in safe location
4. To restore: Replace data folder

### Q: Reset application to default

**Complete Reset**:

1. Close application
2. Delete data folder (see locations above)
3. Clear browser localStorage
4. Restart application
5. Re-enter license key

---

## 🔍 Developer/Advanced Issues

### Q: Console errors about Autofill

**Error Messages**:

"Request Autofill.enable failed"
"Request Autofill.setAddresses failed"

**Status**: These are harmless Electron DevTools warnings. No action needed.

### Q: TypeScript compilation errors

**Developer Fix**:

```bash
npm run build
```

Check console output for specific errors.

### Q: Hot reload not working

**Developer Solutions**:

1. Restart development server
2. Check webpack configuration
3. Clear cache: `npm run build`

---

## 📞 Still Need Help?

### Quick Diagnostics

1. **Version Check**: See "About" in application menu
2. **Console Logs**: Press `F12` to open DevTools
3. **System Info**: Check Node.js version: `node --version`
4. **Memory Usage**: Check Task Manager/Activity Monitor

### Reporting Issues

When reporting problems, include:

- Error messages (screenshots helpful)
- Steps to reproduce
- System information (OS, Node.js version)
- License key type (without sharing actual key)
- Console errors from DevTools

### Self-Service Resources

- **User Guide**: [docs/USER_GUIDE.md](USER_GUIDE.md)
- **Technical Docs**: [docs/TECHNICAL.md](TECHNICAL.md)
- **Admin Guide**: [docs/ADMIN_PANEL.md](ADMIN_PANEL.md)
- **Developer Guide**: [docs/DEVELOPER_QUICK_START.md](DEVELOPER_QUICK_START.md)

---

**Last Updated**: October 27, 2025  
**Covers GGAS Version**: 1.0.1
