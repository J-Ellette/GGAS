# GGAS Development Guide

## Getting Started

### Prerequisites

Before you begin development, ensure you have the following installed:

- **Node.js**: v20.19.5 or higher
- **npm**: v10.8.2 or higher
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/J-Ellette/GGAS.git
   cd GGAS
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Application**
   ```bash
   npm run build
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

## Development Commands

### Building

```bash
# Build main process only
npm run build:main

# Build renderer process only
npm run build:renderer

# Build everything
npm run build
```

### Running

```bash
# Build and start the application
npm start

# Package for distribution
npm run package
```

### Testing

```bash
# Run tests (when implemented)
npm test
```

## Project Structure Explained

### Source Code Organization

```
src/
├── main/                    # Backend (Electron main process)
│   ├── main.ts              # Entry point, window management
│   ├── preload.ts           # Secure IPC bridge
│   └── services/            # Business logic layer
│       └── DatabaseService.ts
│
├── renderer/                # Frontend (React application)
│   ├── index.tsx            # React entry point
│   ├── App.tsx              # Root component, routing
│   ├── pages/               # Full-page components
│   │   ├── Dashboard.tsx
│   │   ├── ActivityDataPage.tsx
│   │   ├── EmissionFactorsPage.tsx
│   │   └── CalculationsPage.tsx
│   └── components/          # Reusable components (future)
│
└── common/                  # Shared code
    └── types/               # TypeScript interfaces
        └── index.ts
```

## Development Workflow

### Adding a New Feature

1. **Plan the Feature**
   - Define requirements
   - Design data model
   - Sketch UI mockups

2. **Backend Implementation**
   - Add database schema changes to `DatabaseService.ts`
   - Implement CRUD methods
   - Add IPC handlers in `main.ts`

3. **Frontend Implementation**
   - Create or update page components
   - Add state management
   - Connect to backend via IPC

4. **Testing**
   - Test functionality manually
   - Add unit tests (future)
   - Test edge cases

5. **Documentation**
   - Update user guide
   - Update technical documentation
   - Add code comments

### Code Style Guidelines

#### TypeScript

```typescript
// Use interfaces for data structures
interface ActivityData {
  id?: number;
  organizationUnit: string;
  value: number;
}

// Use explicit types for function parameters and returns
function calculateEmissions(activity: ActivityData, factor: EmissionFactor): number {
  return activity.value * factor.value;
}

// Use async/await for asynchronous operations
async function loadData(): Promise<ActivityData[]> {
  const data = await window.electronAPI.listActivityData();
  return data;
}
```

#### React Components

```typescript
// Use functional components with TypeScript
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<StateType>(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <Box>
      {/* JSX */}
    </Box>
  );
};

export default MyComponent;
```

#### Naming Conventions

- **Files**: PascalCase for components (`Dashboard.tsx`), camelCase for utilities
- **Components**: PascalCase (`ActivityDataPage`)
- **Functions**: camelCase (`calculateEmissions`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_VALUE`)
- **Interfaces**: PascalCase (`ActivityData`)
- **CSS Classes**: kebab-case (when used)

### State Management

#### Local State (useState)

Use for component-specific state:
```typescript
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState<FormData>({});
```

#### Effect Hook (useEffect)

Use for side effects and data loading:
```typescript
useEffect(() => {
  loadData();
}, []); // Empty array = run once on mount

useEffect(() => {
  filterData();
}, [searchQuery]); // Run when searchQuery changes
```

## Database Development

### Adding New Tables

1. **Define Schema**
   ```typescript
   this.db.exec(`
     CREATE TABLE IF NOT EXISTS table_name (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       field1 TEXT NOT NULL,
       field2 REAL,
       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
     )
   `);
   ```

2. **Add Indexes**
   ```typescript
   this.db.exec(`
     CREATE INDEX IF NOT EXISTS idx_table_field 
     ON table_name(field1);
   `);
   ```

3. **Create CRUD Methods**
   ```typescript
   createRecord(data: RecordType): RecordType | null {
     const stmt = this.db.prepare('INSERT INTO table_name ...');
     const result = stmt.run(...);
     return { id: result.lastInsertRowid, ...data };
   }
   ```

### Database Migration Strategy

For schema changes:
1. Check current schema version
2. Apply migrations sequentially
3. Update version number
4. Backup data before major changes

## UI Development

### Material-UI Components

Common patterns:

```typescript
import {
  Box,
  Button,
  TextField,
  Dialog,
  Typography,
  Paper
} from '@mui/material';

// Layout
<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
  <Typography variant="h4">Title</Typography>
  <Paper sx={{ p: 2 }}>Content</Paper>
</Box>

// Forms
<TextField
  label="Field Name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  fullWidth
  required
/>

// Dialogs
<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>Content</DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
  </DialogActions>
</Dialog>
```

### Data Visualization

Using Recharts:

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#2e7d32" />
  </BarChart>
</ResponsiveContainer>
```

## IPC Communication

### Adding New IPC Channels

1. **Main Process (main.ts)**
   ```typescript
   ipcMain.handle('channel-name', async (event, arg) => {
     // Handle request
     return result;
   });
   ```

2. **Preload Script (preload.ts)**
   ```typescript
   contextBridge.exposeInMainWorld('electronAPI', {
     methodName: (arg: ArgType) => ipcRenderer.invoke('channel-name', arg),
   });
   ```

3. **Type Definitions (common/types/index.ts)**
   ```typescript
   interface ElectronAPI {
     methodName: (arg: ArgType) => Promise<ReturnType>;
   }
   ```

4. **Renderer Process (any React component)**
   ```typescript
   const result = await window.electronAPI.methodName(arg);
   ```

## Debugging

### Main Process Debugging

Add logging:
```typescript
console.log('Debug info:', data);
console.error('Error:', error);
```

View logs in terminal where you ran `npm start`.

### Renderer Process Debugging

1. Enable DevTools in `main.ts`:
   ```typescript
   mainWindow.webContents.openDevTools();
   ```

2. Use browser console:
   ```typescript
   console.log('Debug info:', data);
   console.error('Error:', error);
   ```

3. React DevTools can be installed as Electron extension

### Database Debugging

Query the database directly:
```bash
sqlite3 ~/.config/ggas/ggas.db  # Linux
sqlite3 ~/Library/Application\ Support/ggas/ggas.db  # macOS
sqlite3 %APPDATA%/ggas/ggas.db  # Windows

# Then run SQL queries
SELECT * FROM activity_data;
```

## Performance Optimization

### Database Performance

```typescript
// Use transactions for bulk operations
const insertMany = this.db.transaction((items: any[]) => {
  for (const item of items) {
    stmt.run(item);
  }
});

// Use indexes for filtered queries
CREATE INDEX idx_field ON table(field);

// Use prepared statements
const stmt = this.db.prepare('SELECT * FROM table WHERE field = ?');
```

### React Performance

```typescript
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);

// Use React.memo for pure components
const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

## Testing

### Unit Testing (Future Implementation)

```typescript
// Example test structure
describe('DatabaseService', () => {
  it('should create activity data', () => {
    const service = new DatabaseService();
    const data = { /* test data */ };
    const result = service.createActivityData(data);
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
  });
});
```

### Manual Testing Checklist

- [ ] Activity data CRUD operations
- [ ] Emission factor search and filtering
- [ ] Calculation wizard flow
- [ ] Dashboard visualizations
- [ ] Data validation
- [ ] Error handling
- [ ] Cross-platform compatibility

## Common Issues and Solutions

### Build Issues

**Problem**: TypeScript compilation errors
**Solution**: 
- Check `tsconfig.json` settings
- Ensure all type definitions are installed
- Run `npm install` to update dependencies

**Problem**: Webpack build fails
**Solution**:
- Clear dist folder: `rm -rf dist/`
- Check webpack config files
- Verify all loaders are installed

### Runtime Issues

**Problem**: Database not initialized
**Solution**:
- Check user data path exists
- Verify write permissions
- Review initialization logs

**Problem**: IPC communication fails
**Solution**:
- Verify channel names match
- Check preload script is loaded
- Review main process logs

### UI Issues

**Problem**: Components not rendering
**Solution**:
- Check browser console for errors
- Verify data is loaded
- Check React DevTools component tree

**Problem**: Styling issues
**Solution**:
- Check MUI version compatibility
- Verify theme configuration
- Review CSS specificity

## Best Practices

### Security

- Never expose Node.js APIs directly to renderer
- Always use contextBridge for IPC
- Validate all user inputs
- Sanitize data before database operations
- Keep dependencies updated

### Performance

- Use database indexes for common queries
- Implement pagination for large datasets
- Lazy load heavy components
- Debounce search inputs
- Memoize expensive computations

### Code Quality

- Write self-documenting code
- Add comments for complex logic
- Use TypeScript types everywhere
- Follow consistent naming conventions
- Keep functions small and focused

### Git Workflow

- Create feature branches
- Write descriptive commit messages
- Keep commits atomic and focused
- Review changes before committing
- Sync with main branch regularly

## Resources

### Documentation

- [Electron Docs](https://www.electronjs.org/docs)
- [React Docs](https://react.dev)
- [Material-UI Docs](https://mui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SQLite Docs](https://www.sqlite.org/docs.html)

### Tools

- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- [Postman](https://www.postman.com/) (for future API development)

### Communities

- Electron Discord
- React Community on Reddit
- Stack Overflow
- GitHub Discussions

## Getting Help

1. Check this development guide
2. Review technical documentation
3. Search existing GitHub issues
4. Create a new GitHub issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - System information
   - Relevant logs

---

**Last Updated**: October 2025
**Document Version**: 1.0
