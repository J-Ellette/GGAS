# 🚀 Developer Quick Start Guide

**Green Country: Greenhouse Gas Accounting Software**  
*Get up and running in under 30 minutes*

---

## Prerequisites

### Required Software

- **Node.js** v18+ (recommended: v22.19.0)
- **npm** v8+ (comes with Node.js)
- **Git** for version control
- **VS Code** (recommended) with TypeScript support

### System Requirements

- **OS**: Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB available space
- **Display**: 1920x1080 minimum resolution

---

## 🏃‍♂️ Quick Setup (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/J-Ellette/GGAS.git
cd GGAS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build and Run

```bash
npm start
```

**That's it!** The application should open in Electron.

---

## 🔧 Development Environment

### Project Structure

GGAS/
├── src/
│   ├── main/           # Electron main process
│   ├── renderer/       # React frontend
│   └── common/         # Shared code
├── docs/               # Documentation
├── build-docs/         # Build and implementation docs
├── scripts/            # Utility scripts
└── dist/               # Built application

### Key Technologies

- **Electron** v38.4.0 - Desktop app framework
- **React** v19.2.0 - UI framework
- **TypeScript** v5.9.3 - Type safety
- **Material-UI** v5.18.0 - UI components
- **SQLite** via better-sqlite3 - Local database
- **Webpack** v5.102.1 - Build system

### Development Scripts

```bash
# Build main process only
npm run build:main

# Build renderer process only  
npm run build:renderer

# Full build
npm run build

# Start application
npm start

# Generate license keys
npm run generate-licenses

# Test license system
npm run test-license-system

# Rebuild native modules (if needed)
npm run rebuild
```

---

## 🐛 Common Issues & Solutions

### 1. Node.js Module Version Errors

**Error**: `NODE_MODULE_VERSION 127/139 mismatch`

**Solution**:

```bash
npm run rebuild
# or
npx electron-rebuild
```

### 2. Build Failures

**Error**: TypeScript compilation errors

**Solution**:

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. Electron Won't Start

**Error**: Application crashes on startup

**Solutions**:

- Check Node.js version (use v22.19.0)
- Rebuild native modules: `npm run rebuild`
- Check console for specific errors

### 4. License Key Issues

**Demo Key**: `GCGGAS-2024-DEMO-KEY1`
**Admin Access**: Username: `OKE03955`, Password: `8675309Jenny!`

---

## 🏗️ Development Workflow

### 1. Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes in the appropriate directory:
   - **Frontend**: `src/renderer/`
   - **Backend**: `src/main/`
   - **Shared**: `src/common/`
3. Test your changes: `npm start`
4. Build to verify: `npm run build`

### 2. Code Organization

#### Main Process (`src/main/`)

- `main.ts` - Electron main process entry point
- `preload.ts` - IPC bridge between main and renderer
- `services/` - Database and business logic services

#### Renderer Process (`src/renderer/`)

- `App.tsx` - Main React component
- `pages/` - Page components (Dashboard, Settings, etc.)
- `components/` - Reusable UI components
- `contexts/` - React contexts for state management

#### Common (`src/common/`)

- `types/` - TypeScript type definitions
- `license/` - License system components
- `services/` - Shared business logic

### 3. Database Development

- **Location**: Local SQLite database
- **Service**: `src/main/services/DatabaseService.ts`
- **Schema**: Auto-created on first run
- **Data**: Located in application data directory

---

## 🧪 Testing & Debugging

### Testing the Application

1. **License System**: Use demo key `GCGGAS-2024-DEMO-KEY1`
2. **Admin Panel**: Login with `OKE03955` / `8675309Jenny!`
3. **Core Features**: Test Dashboard, Activity Data, Calculations
4. **AI Features**: Navigate to AI & Strategic Planning section

### Debugging Tips

1. **Enable DevTools**: The app runs in Electron with DevTools available
2. **Console Errors**: Check both main and renderer process consoles
3. **Database Issues**: Check application data directory for database file
4. **IPC Issues**: Verify preload.ts exposes needed APIs

### Performance Monitoring

- Main process memory usage
- Renderer process performance
- Database query optimization
- Bundle size optimization

---

## 📚 Key Documentation

### Essential Reading

- **[Technical Architecture](../docs/TECHNICAL.md)** - System design overview
- **[User Guide](../docs/USER_GUIDE.md)** - How the application works
- **[License System](../docs/LICENSE_SYSTEM.md)** - License implementation details

### API References

- **IPC APIs**: See `src/main/preload.ts` for exposed methods
- **Database Schema**: Auto-generated, see `DatabaseService.ts`
- **Type Definitions**: `src/common/types/index.ts`

---

## 🤝 Contributing Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use Material-UI components for UI
- Maintain consistent indentation (2 spaces)

### Commit Guidelines

- Use conventional commit format: `type(scope): description`
- Examples:
  - `feat(dashboard): add emissions chart`
  - `fix(license): resolve validation issue`
  - `docs(readme): update installation guide`

### Pull Request Process

1. Ensure all tests pass: `npm run build`
2. Update documentation if needed
3. Add descriptive PR title and description
4. Link any related issues

---

## 🆘 Getting Help

### Resources

- **Documentation Hub**: [build-docs/README.md](README.md)
- **Issue Tracker**: GitHub Issues (if applicable)
- **Technical Docs**: [docs/TECHNICAL.md](../docs/TECHNICAL.md)

### Common Developer Questions

**Q: How do I add a new page?**
A: Create component in `src/renderer/pages/`, add route in `App.tsx`, update sidebar if needed.

**Q: How do I add a new database table?**
A: Update `DatabaseService.ts`, add table creation in initialization, add CRUD methods.

**Q: How do I expose new APIs to renderer?**
A: Add method in `src/main/main.ts` IPC handlers, expose in `preload.ts`, use in renderer.

**Q: Where are the license keys generated?**
A: `scripts/generate-licenses.js` or `src/common/license/LicenseKeyGenerator.ts`

---

**Ready to contribute? Start with the [buildsheet.md](buildsheet.md) to understand the project vision!**

---

**Last Updated**: October 27, 2025  
**Guide Version**: 1.0.0
