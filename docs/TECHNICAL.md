# GGAS Technical Documentation

## Architecture Overview

GGAS is built as an Electron-based desktop application following a modular architecture with clear separation between the main process (backend) and renderer process (frontend).

### Technology Stack

#### Core Technologies
- **Electron**: v38.4.0 - Cross-platform desktop application framework
- **Node.js**: v20+ - JavaScript runtime for backend logic
- **TypeScript**: v5.9+ - Type-safe development

#### Frontend
- **React**: v19.2.0 - UI component library
- **Material-UI (MUI)**: v5.14.0 - Component library and design system
- **Recharts**: v3.3.0 - Data visualization and charting
- **Emotion**: v11.14.0 - CSS-in-JS styling

#### Backend
- **better-sqlite3**: v12.4.1 - SQLite database driver
- **SQLite**: Local embedded database

#### Build Tools
- **Webpack**: v5.102.1 - Module bundler
- **ts-loader**: v9.5.4 - TypeScript loader for Webpack
- **electron-builder**: v26.0.12 - Application packager

## Project Structure

```
GGAS/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── main.ts              # Application entry point
│   │   ├── preload.ts           # Secure IPC bridge
│   │   └── services/
│   │       └── DatabaseService.ts  # Data layer
│   │
│   ├── renderer/                # React frontend
│   │   ├── App.tsx              # Root component
│   │   ├── index.tsx            # Renderer entry
│   │   └── pages/               # Page components
│   │       ├── Dashboard.tsx
│   │       ├── ActivityDataPage.tsx
│   │       ├── EmissionFactorsPage.tsx
│   │       └── CalculationsPage.tsx
│   │
│   └── common/                  # Shared code
│       └── types/               # TypeScript interfaces
│           └── index.ts
│
├── public/                      # Static assets
│   └── index.html              # HTML template
│
├── dist/                        # Compiled output
│   ├── main.js                 # Compiled main process
│   ├── preload.js              # Compiled preload script
│   ├── renderer.js             # Compiled renderer
│   └── index.html              # Processed HTML
│
├── docs/                        # Documentation
├── webpack.main.config.js      # Main process build config
├── webpack.renderer.config.js  # Renderer build config
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project metadata
```

## Core Components

### Main Process (src/main/main.ts)

The main process is responsible for:
- Application lifecycle management
- Window creation and management
- Database initialization
- IPC communication handling
- Security configuration

#### Key Functions

```typescript
createWindow(): void
// Creates the main browser window with security settings

setupIpcHandlers(): void
// Registers IPC handlers for frontend-backend communication
```

#### IPC Channels

**Activity Data**
- `activity-data:create` - Create new activity data
- `activity-data:list` - Retrieve activity data list
- `activity-data:update` - Update existing activity data
- `activity-data:delete` - Delete activity data

**Emission Factors**
- `emission-factors:list` - Retrieve emission factors
- `emission-factors:create` - Create custom emission factor
- `emission-factors:search` - Search emission factors

**Calculations**
- `calculations:calculate` - Perform emission calculation
- `calculations:list` - Retrieve calculation history

### Database Service (src/main/services/DatabaseService.ts)

The DatabaseService provides data persistence and business logic:

#### Database Schema

**activity_data**
```sql
CREATE TABLE activity_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizationUnit TEXT NOT NULL,
  timePeriod TEXT NOT NULL,
  emissionSource TEXT NOT NULL,
  activityType TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  dataSource TEXT NOT NULL,
  dataQuality REAL DEFAULT 0,
  metadata TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**emission_factors**
```sql
CREATE TABLE emission_factors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  source TEXT NOT NULL,
  version TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  region TEXT,
  year INTEGER,
  description TEXT,
  isCustom INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**calculations**
```sql
CREATE TABLE calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  activityDataId INTEGER NOT NULL,
  emissionFactorId INTEGER NOT NULL,
  scope INTEGER NOT NULL,
  methodology TEXT NOT NULL,
  result REAL NOT NULL,
  unit TEXT NOT NULL,
  uncertainty REAL,
  metadata TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activityDataId) REFERENCES activity_data(id),
  FOREIGN KEY (emissionFactorId) REFERENCES emission_factors(id)
);
```

#### Key Methods

```typescript
initialize(): void
// Initialize database connection and create tables

createActivityData(data: ActivityData): ActivityData | null
// Create new activity data record

listActivityData(filters?: any): ActivityData[]
// Retrieve activity data with optional filtering

updateActivityData(id: number, data: Partial<ActivityData>): ActivityData | null
// Update existing activity data

deleteActivityData(id: number): boolean
// Delete activity data record

listEmissionFactors(filters?: any): EmissionFactor[]
// Retrieve emission factors with optional filtering

searchEmissionFactors(query: string): EmissionFactor[]
// Full-text search of emission factors

createEmissionFactor(data: EmissionFactor): EmissionFactor | null
// Create custom emission factor

calculateEmissions(data: any): Calculation | null
// Perform emission calculation

listCalculations(filters?: any): Calculation[]
// Retrieve calculation history with joins
```

### Preload Script (src/main/preload.ts)

The preload script provides a secure bridge between renderer and main processes using Electron's contextBridge API:

```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  // Activity Data API
  createActivityData: (data: any) => ipcRenderer.invoke('activity-data:create', data),
  listActivityData: (filters?: any) => ipcRenderer.invoke('activity-data:list', filters),
  // ... other API methods
});
```

This creates a `window.electronAPI` object available to the renderer process with type-safe methods.

### Type Definitions (src/common/types/index.ts)

Shared TypeScript interfaces ensure type safety across the application:

```typescript
interface ActivityData {
  id?: number;
  organizationUnit: string;
  timePeriod: string;
  emissionSource: string;
  activityType: string;
  value: number;
  unit: string;
  dataSource: string;
  dataQuality: number;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EmissionFactor {
  id?: number;
  name: string;
  category: string;
  subcategory: string;
  source: string;
  version: string;
  value: number;
  unit: string;
  region?: string;
  year?: number;
  description?: string;
  isCustom: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Calculation {
  id?: number;
  activityDataId: number;
  emissionFactorId: number;
  scope: number;
  methodology: string;
  result: number;
  unit: string;
  uncertainty?: number;
  metadata?: string;
  createdAt?: string;
}
```

## Frontend Architecture

### Application Component (src/renderer/App.tsx)

The root component provides:
- Theme configuration
- Navigation sidebar
- Page routing
- Layout structure

### Page Components

#### Dashboard (src/renderer/pages/Dashboard.tsx)

Features:
- Summary cards (total emissions, calculation count, data quality)
- Pie chart for emissions by scope
- Bar chart for emissions trends
- Recent calculations list

Data Flow:
1. Load calculations on mount
2. Process data for visualizations
3. Display interactive charts using Recharts

#### Activity Data Page (src/renderer/pages/ActivityDataPage.tsx)

Features:
- CRUD operations via dialog forms
- Data table with sorting and filtering
- Real-time validation
- Quality score indicators

#### Emission Factors Page (src/renderer/pages/EmissionFactorsPage.tsx)

Features:
- Search and filter functionality
- Category-based filtering
- Custom factor creation
- Read-only display of standard factors

#### Calculations Page (src/renderer/pages/CalculationsPage.tsx)

Features:
- 3-step wizard interface
- Activity data selection
- Emission factor matching
- Calculation preview and execution
- Results display with uncertainty

## Build Process

### Development Build

```bash
npm run build:main     # Compile main process
npm run build:renderer # Compile renderer process
npm run build          # Compile both
```

### Build Configuration

**Main Process** (webpack.main.config.js)
- Entry: `src/main/main.ts`
- Target: `electron-main`
- Output: `dist/main.js`
- Externals: Node.js built-ins and Electron

**Preload Script** (webpack.main.config.js)
- Entry: `src/main/preload.ts`
- Target: `electron-preload`
- Output: `dist/preload.js`

**Renderer Process** (webpack.renderer.config.js)
- Entry: `src/renderer/index.tsx`
- Target: `electron-renderer`
- Output: `dist/renderer.js`
- HTML Plugin: Processes `public/index.html`

## Security Considerations

### Context Isolation

Enabled in BrowserWindow configuration:
```typescript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, 'preload.js')
}
```

### Content Security Policy

Implemented in HTML template:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'">
```

### IPC Security

- All IPC communication goes through the preload script
- No direct access to Node.js APIs from renderer
- Validated inputs and sanitized outputs

## Data Storage

### Database Location

Platform-specific locations:
- **Windows**: `%APPDATA%/ggas/ggas.db`
- **macOS**: `~/Library/Application Support/ggas/ggas.db`
- **Linux**: `~/.config/ggas/ggas.db`

### Data Persistence

- SQLite provides ACID compliance
- Automatic database creation on first run
- Built-in data integrity constraints
- Foreign key relationships enforced

## Performance Considerations

### Database Optimization

- Indexed columns for common queries
- Prepared statements for repeated operations
- Transaction batching for bulk operations

### Frontend Optimization

- React functional components with hooks
- Memoization for expensive computations
- Lazy loading for large datasets
- Virtual scrolling for long lists (future enhancement)

## Testing Strategy

### Unit Testing (Future)

- Jest for JavaScript/TypeScript testing
- React Testing Library for component testing
- Database mocking for service tests

### Integration Testing (Future)

- Spectron for Electron testing
- E2E testing of user workflows

### Manual Testing

Current focus on manual testing of:
- CRUD operations
- Calculation accuracy
- UI responsiveness
- Cross-platform compatibility

## Deployment

### Packaging

Use electron-builder for distribution:

```bash
npm run package
```

Creates platform-specific installers:
- **Windows**: `.exe` installer
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` or `.deb` package

### Distribution Channels

- Direct download from GitHub Releases
- Platform-specific app stores (future)
- Enterprise deployment (future)

## Extension Points

### Adding New Emission Factor Sources

1. Create data import script
2. Update database schema if needed
3. Add validation logic
4. Update UI search/filter

### Adding New Calculation Methodologies

1. Implement calculation logic in DatabaseService
2. Add methodology option to UI
3. Update documentation
4. Add validation tests

### Adding New Reporting Formats

1. Create report generator service
2. Add report UI components
3. Implement export functionality
4. Add preview capability

## Troubleshooting

### Build Errors

**TypeScript Errors**
- Check tsconfig.json settings
- Verify type definitions are installed
- Run `npm install` to update dependencies

**Webpack Errors**
- Clear dist folder: `rm -rf dist/`
- Check webpack configurations
- Verify loaders are installed

### Runtime Errors

**Database Errors**
- Check database file permissions
- Verify SQLite is accessible
- Review database initialization logs

**IPC Errors**
- Verify preload script is loaded
- Check IPC channel names match
- Review main process console logs

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit pull request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write descriptive commit messages

### Documentation

- Update README for user-facing changes
- Update technical docs for architecture changes
- Add inline comments for complex logic
- Keep changelog updated

## Future Enhancements

### Phase 2 Features

- **Reporting Module**: CDP, TCFD, GRI, SASB templates
- **Advanced Analytics**: Forecasting, hotspot analysis
- **Target Setting**: Science-based targets support
- **Data Import**: Excel, CSV file support

### Phase 3 Features

- **Cloud Sync**: Multi-device synchronization
- **Collaboration**: Multi-user support
- **API**: REST API for integrations
- **Mobile**: Companion mobile app

### Performance Improvements

- Virtual scrolling for large datasets
- Database query optimization
- Caching strategies
- Progressive loading

---

**Last Updated**: October 2025
**Document Version**: 1.0
