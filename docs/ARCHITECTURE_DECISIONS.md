# Architecture Decision Records (ADRs)

**Green Country: Greenhouse Gas Accounting Software**  
*Key Technical Decisions and Rationale*

---

## ADR-001: Desktop Application Framework Selection

**Date**: 2024-10-XX  
**Status**: Accepted  
**Decision Makers**: Development Team

### Context

Need to choose a framework for building a desktop greenhouse gas accounting application that works across Windows, macOS, and Linux.

### Decision

Selected **Electron** with **React** and **TypeScript**.

### Rationale

**Pros**:

- Cross-platform compatibility with single codebase
- Rich web ecosystem and component libraries (Material-UI)
- Strong TypeScript support for type safety
- Excellent developer tooling and debugging
- Native desktop integration capabilities
- Large community and extensive documentation

**Alternatives Considered**:

- **Native C++/Qt**: Too complex, slower development
- **Tauri**: Too new, smaller ecosystem
- **Flutter Desktop**: Limited desktop maturity
- **Java/JavaFX**: Poor user experience, heavy runtime

### Consequences

- Larger application size (~150MB)
- Higher memory usage than native apps
- Access to full web ecosystem and rapid development
- Excellent cross-platform compatibility

---

## ADR-002: Database Selection

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need local data storage for emissions data, calculations, and application state.

### Decision

Selected **SQLite** via **better-sqlite3** Node.js library.

### Rationale

**Pros**:

- No server setup required (embedded database)
- ACID compliance for data integrity
- Excellent performance for read-heavy workloads
- Cross-platform file portability
- SQL standard compliance
- Small footprint and zero-configuration

**Alternatives Considered**:

- **File-based storage (JSON)**: Poor performance, no ACID guarantees
- **MongoDB**: Overkill, requires server
- **PostgreSQL**: Too complex for desktop app
- **Browser storage**: Size limitations, persistence issues

### Consequences

- Simple deployment and backup (single file)
- Limited to single-user scenarios without additional infrastructure
- Excellent performance for application's read-heavy patterns

---

## ADR-003: Frontend Architecture Pattern

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need a scalable frontend architecture for complex emissions management workflows.

### Decision

Selected **React with Context API** and **Material-UI** component library.

### Rationale

**React Benefits**:

- Component-based architecture for reusability
- Large ecosystem and community
- Excellent TypeScript integration
- Familiar to developers

**Context API over Redux**:

- Sufficient for current complexity
- Reduces boilerplate code
- Native React solution
- Easier to learn and maintain

**Material-UI Benefits**:

- Professional, consistent design system
- Comprehensive component library
- Built-in accessibility features
- Excellent TypeScript support

### Consequences

- Rapid UI development with consistent design
- Potential performance issues with large contexts
- Learning curve for Material-UI patterns

---

## ADR-004: Inter-Process Communication (IPC) Strategy

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need secure communication between Electron main process and renderer process.

### Decision

Use **IPC with contextBridge** and **preload scripts** for secure API exposure.

### Rationale

**Security Benefits**:

- Prevents direct Node.js access from renderer
- Controlled API surface
- Protection against code injection

**Developer Experience**:

- Type-safe API definitions
- Clear separation of concerns
- Consistent async/await patterns

### Implementation

```typescript
// preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  createActivityData: (data) => ipcRenderer.invoke('activity-data:create', data),
  // ... other APIs
});
```

### Consequences

- Enhanced security posture
- Additional abstraction layer to maintain
- Clear API boundaries between processes

---

## ADR-005: License System Architecture

**Date**: 2024-10-27  
**Status**: Accepted  

### Context

Need a flexible license system supporting demo, trial, standard, and enterprise tiers.

### Decision

Implemented **client-side license validation** with **cryptographic checksums** and **hardware fingerprinting**.

### Rationale

**Design Principles**:

- Offline validation capability (7-day grace period)
- Hardware binding for security
- Multiple license types with feature flags
- Demo-friendly for evaluation

**License Key Format**: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`

- Product code (2) + Version (2) + Type (2) + Customer Hash (4) + Features (4) + Expiration (4) + Salt (4) + Checksum (2)

### Implementation Highlights

- SHA-256 checksums prevent tampering
- Base32 encoding for human readability
- Feature flag system for granular control
- Graceful degradation when offline

### Consequences

- Flexible licensing model supports business needs
- Client-side validation enables offline usage
- Future server-side validation can be added
- Demo keys facilitate easy evaluation

---

## ADR-006: AI-Optional Framework Design

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Enterprise customers need control over AI feature usage due to privacy, compliance, and policy requirements.

### Decision

Implemented **AI-Optional Operation Framework** with 5 operation modes and 14 granular AI features.

### Rationale

**Business Requirements**:

- Complete manual alternatives for all AI features
- Granular control over individual AI capabilities
- Audit trail for AI usage decisions
- Policy enforcement mechanisms

**Operation Modes**:

1. **Full AI**: All AI features enabled
2. **Selective AI**: Choose specific features
3. **Manual Only**: No AI features
4. **Assistant Mode**: AI suggestions with manual approval
5. **Background AI**: AI runs but doesn't affect UI

### Technical Implementation

- Feature gate system with runtime toggles
- Fallback mechanisms for each AI component
- Configuration-driven workflows
- Policy management infrastructure

### Consequences

- Addresses enterprise compliance requirements
- Increased code complexity with dual pathways
- Competitive advantage in regulated industries
- Future-proof architecture for AI evolution

---

## ADR-007: Build System and Bundling Strategy

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need efficient build system for Electron app with main and renderer processes.

### Decision

Use **Webpack** with separate configurations for main and renderer processes.

### Configuration Strategy

- `webpack.main.config.js`: Node.js-targeted build for main process
- `webpack.renderer.config.js`: Browser-targeted build for renderer
- TypeScript compilation integrated into Webpack pipeline

### Rationale

**Benefits**:

- Separate optimization strategies for each process
- Tree-shaking and code splitting capabilities
- Development and production build variants
- Asset processing and optimization

**Alternatives Considered**:

- **Vite**: Newer but less mature Electron support
- **esbuild**: Very fast but less plugin ecosystem
- **Raw TypeScript**: No bundling or optimization

### Consequences

- Complex build configuration to maintain
- Excellent optimization and development experience
- Clear separation between main and renderer builds

---

## ADR-008: State Management Strategy

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need state management for complex application workflows and data flows.

### Decision

Use **React Context API** with **localStorage persistence** for client state.

### Implementation Pattern

```typescript
// Theme context example
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  setThemeMode: () => {},
});
```

### Rationale

**Context API Benefits**:

- Native React solution
- Sufficient for current complexity
- Easy to understand and debug
- Good TypeScript integration

**localStorage Integration**:

- Persistence across sessions
- Simple implementation
- Synchronous API suitable for desktop app

### When to Consider Alternatives

- If state becomes deeply nested (>3 levels)
- If performance issues emerge with frequent updates
- If complex state synchronization needed

### Consequences

- Simple, maintainable state management
- Potential performance concerns with large contexts
- Easy debugging and testing

---

## ADR-009: Error Handling and Logging Strategy

**Date**: 2024-10-XX  
**Status**: Accepted  

### Context

Need consistent error handling across main and renderer processes.

### Decision

Implement **structured error handling** with **console-based logging** and **user-friendly error messages**.

### Implementation

- Try-catch blocks around async operations
- Structured error objects with context
- User-facing error messages in UI
- Console logging for debugging

### Rationale

**Desktop App Considerations**:

- No centralized logging service needed
- Users can access DevTools for debugging
- Local file logging adds complexity
- Console logging sufficient for development

### Error Categories

1. **User Errors**: Validation, input errors → UI feedback
2. **System Errors**: Database, file system → Graceful degradation
3. **Developer Errors**: Programming bugs → Console logging

### Consequences

- Simple, effective error handling
- Good developer debugging experience
- No external dependencies for logging
- Limited production error tracking (acceptable for desktop app)

---

## ADR-010: Security Model

**Date**: 2024-10-27  
**Status**: Accepted  

### Context

Desktop application needs appropriate security measures without over-engineering.

### Decision

Implement **defense-in-depth** with **contextBridge isolation**, **input validation**, and **secure defaults**.

### Security Measures

1. **Process Isolation**: Main/renderer separation with contextBridge
2. **Input Validation**: All user inputs validated and sanitized
3. **Secure Defaults**: nodeIntegration: false, contextIsolation: true
4. **License Security**: Cryptographic checksums, hardware binding
5. **Data Protection**: Local SQLite with file system permissions

### Threat Model

**In Scope**:

- Code injection through renderer process
- License key tampering or sharing
- Data corruption or unauthorized access
- Malicious input processing

**Out of Scope** (Desktop App Characteristics):

- Network-based attacks (minimal network usage)
- Multi-user access control (single-user app)
- Advanced persistent threats (not a server)

### Consequences

- Appropriate security for desktop application
- Balanced security without performance impact
- Clear security boundaries and responsibilities

---

## Decision Process

### How ADRs are Created

1. **Problem Identification**: Technical decision required
2. **Research Phase**: Evaluate alternatives
3. **Team Discussion**: Collaborative decision making
4. **Documentation**: Record decision and rationale
5. **Review**: Periodic evaluation of decisions

### ADR Lifecycle

- **Proposed**: Under consideration
- **Accepted**: Decision made and implemented
- **Deprecated**: No longer recommended
- **Superseded**: Replaced by newer decision

---

**Last Updated**: October 27, 2025  
**ADR Count**: 10 decisions documented
