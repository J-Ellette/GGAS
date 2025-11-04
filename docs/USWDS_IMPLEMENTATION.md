# USWDS Implementation Guide

## Overview

This document describes the implementation of the U.S. Web Design System (USWDS) in the Green Country GGAS application. The implementation provides accessible, user-friendly, and government-standard compliant UI components while maintaining the existing Material-UI (MUI) components for backward compatibility.

## Architecture

### Hybrid Approach

The implementation uses a hybrid approach that allows both USWDS and Material-UI components to coexist:

1. **USWDS Core**: Provides the foundation with typography, colors, spacing, and utility classes
2. **Custom Components**: USWDS-wrapped React components for common patterns
3. **Material-UI Compatibility**: Existing MUI components continue to work alongside USWDS

### File Structure

```
src/renderer/
├── components/
│   ├── USWDSHeader.tsx      # USWDS header component
│   ├── USWDSFooter.tsx      # USWDS footer component
│   ├── USWDSButton.tsx      # USWDS button component
│   ├── USWDSInput.tsx       # USWDS input/form component
│   ├── USWDSAlert.tsx       # USWDS alert/notification component
│   ├── USWDSCard.tsx        # USWDS card component
│   ├── USWDSTable.tsx       # USWDS table component
│   ├── USWDSSearch.tsx      # USWDS search component
│   └── USWDSSidebar.tsx     # USWDS sidebar navigation
├── pages/
│   ├── DashboardUSWDS.tsx   # USWDS-enhanced dashboard
│   └── LicenseKeyDialogUSWDS.tsx  # USWDS license dialog
└── styles/
    ├── uswds-theme.scss     # USWDS theme configuration
    ├── uswds-custom.scss    # Custom USWDS overrides
    └── ggas-uswds.css       # GGAS-specific USWDS styles
```

## Components

### USWDSButton

A flexible button component supporting USWDS button variants:

```tsx
import USWDSButton from '../components/USWDSButton';

<USWDSButton variant="primary" size="big" onClick={handleClick}>
  Click Me
</USWDSButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'accent-cool' | 'accent-warm' | 'base' | 'outline' | 'unstyled'
- `size`: 'default' | 'big'
- `inverse`: boolean
- `fullWidth`: boolean

### USWDSInput

Form input component with built-in validation and accessibility:

```tsx
import USWDSInput from '../components/USWDSInput';

<USWDSInput
  label="Email Address"
  hint="We'll never share your email"
  error={errorMessage}
  required
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### USWDSAlert

Alert component for notifications and messages:

```tsx
import USWDSAlert from '../components/USWDSAlert';

<USWDSAlert type="success" heading="Success!">
  Your changes have been saved.
</USWDSAlert>
```

**Types:** 'info' | 'warning' | 'error' | 'success' | 'emergency'

### USWDSCard

Card component for displaying content in containers:

```tsx
import USWDSCard, { USWDSCardGroup } from '../components/USWDSCard';

<USWDSCardGroup>
  <USWDSCard title="Card Title">
    Card content goes here
  </USWDSCard>
</USWDSCardGroup>
```

### USWDSTable

Data table component with sorting and responsive features:

```tsx
import USWDSTable from '../components/USWDSTable';

const columns = [
  { header: 'Name', accessor: 'name', sortable: true },
  { header: 'Email', accessor: 'email' }
];

<USWDSTable
  columns={columns}
  data={data}
  striped
  bordered
  scrollable
/>
```

### USWDSSearch

Search component following USWDS patterns:

```tsx
import USWDSSearch from '../components/USWDSSearch';

<USWDSSearch
  onSearch={handleSearch}
  placeholder="Search emissions data"
  size="big"
/>
```

### USWDSHeader & USWDSFooter

Header and footer components for page layout:

```tsx
import USWDSHeader from '../components/USWDSHeader';
import USWDSFooter from '../components/USWDSFooter';

<USWDSHeader
  title="Green Country GGAS"
  subtitle="Greenhouse Gas Accounting Software"
  onMenuClick={toggleMenu}
/>

<USWDSFooter
  appName="Green Country GGAS"
  year={2024}
/>
```

## Utility Classes

USWDS provides a comprehensive set of utility classes for styling:

### Layout
- `grid-container`: Container with max-width
- `grid-row`: Row container for grid columns
- `grid-col-*`: Column sizing (e.g., `tablet:grid-col-6`)
- `grid-gap`: Add gaps between grid items

### Spacing
- `margin-*`: Margin utilities (e.g., `margin-top-2`, `margin-bottom-4`)
- `padding-*`: Padding utilities (e.g., `padding-x-3`, `padding-y-2`)

### Typography
- `font-heading-*`: Heading font sizes (xl, lg, md, sm)
- `font-sans-*`: Sans-serif font sizes (3xl, 2xl, xl, lg, md, sm, xs)
- `text-*`: Text alignment and styling
- `text-bold`: Bold text weight

### Colors
- `bg-*`: Background colors (e.g., `bg-base-lightest`, `bg-primary`)
- `text-*`: Text colors (e.g., `text-primary`, `text-base-dark`)
- `border-*`: Border colors

### Display
- `display-flex`: Flexbox display
- `flex-justify-center`: Center flex items horizontally
- `flex-align-center`: Center flex items vertically

## Accessibility Features

The USWDS implementation includes several accessibility enhancements:

1. **Skip Navigation**: Allows keyboard users to skip to main content
2. **ARIA Labels**: All interactive elements have proper ARIA labels
3. **Focus Management**: Clear focus indicators for keyboard navigation
4. **Screen Reader Support**: Hidden labels for screen readers (`usa-sr-only`)
5. **Contrast Compliance**: WCAG 2.1 AA contrast ratios
6. **Responsive Tables**: Tables include `data-label` for mobile stacking
7. **Form Validation**: Clear error messages linked to inputs

### Example: Accessible Form

```tsx
<form className="usa-form" role="form" aria-label="Contact form">
  <USWDSInput
    label="Full Name"
    hint="First and last name"
    required
    error={errors.name}
    aria-describedby="name-hint"
  />
  
  <USWDSButton type="submit" variant="primary">
    Submit
  </USWDSButton>
</form>
```

## Theming

### Green Country Branding

The implementation uses Green Country's brand colors:

```css
:root {
  --ggas-primary: #2e7d32;
  --ggas-primary-dark: #1b5e20;
  --ggas-primary-light: #4caf50;
}
```

### Custom Overrides

Custom styles can be added in `ggas-uswds.css`:

```css
.usa-button--primary {
  background-color: var(--ggas-primary);
}

.usa-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

## Migration Guide

### Converting Existing Components

To convert an existing Material-UI component to USWDS:

1. **Identify the equivalent USWDS component**
2. **Replace MUI imports with USWDS imports**
3. **Update props to match USWDS API**
4. **Apply USWDS utility classes**
5. **Test accessibility with keyboard and screen reader**

### Example Migration

**Before (Material-UI):**
```tsx
import { Button, TextField, Alert } from '@mui/material';

<Button variant="contained" color="primary">
  Save
</Button>
```

**After (USWDS):**
```tsx
import USWDSButton from '../components/USWDSButton';

<USWDSButton variant="primary">
  Save
</USWDSButton>
```

## Best Practices

1. **Use Semantic HTML**: Always use proper HTML elements (e.g., `<main>`, `<nav>`, `<header>`)
2. **Grid System**: Use USWDS grid classes for responsive layouts
3. **Utility Classes**: Prefer USWDS utility classes over custom CSS
4. **Accessibility First**: Test with keyboard navigation and screen readers
5. **Progressive Enhancement**: Ensure functionality works without JavaScript
6. **Performance**: Use USWDS minified CSS for production
7. **Consistency**: Follow USWDS design patterns from designsystem.digital.gov

## Testing

### Accessibility Testing

```bash
# Use keyboard navigation
Tab - Navigate forward
Shift+Tab - Navigate backward
Enter/Space - Activate buttons
Arrow Keys - Navigate within menus
```

### Screen Reader Testing

Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS)

### Browser Testing

Ensure compatibility with:
- Chrome/Edge (Chromium)
- Firefox
- Safari

## Resources

- [USWDS Documentation](https://designsystem.digital.gov/)
- [USWDS Components](https://designsystem.digital.gov/components/)
- [USWDS Utilities](https://designsystem.digital.gov/utilities/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility Checklist](https://www.a11yproject.com/checklist/)

## Future Enhancements

1. **Dark Mode Support**: Implement USWDS dark theme variant
2. **Custom Theme Builder**: Allow theme customization through admin panel
3. **Component Library**: Expand USWDS component library
4. **Animation System**: Add USWDS-compliant animations
5. **Print Styles**: Optimize print styles for reports
6. **i18n Support**: Internationalization for USWDS components
