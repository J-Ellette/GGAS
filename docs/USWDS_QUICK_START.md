# USWDS Integration Quick Start

## What's Been Implemented

The Green Country GGAS application now includes full USWDS (U.S. Web Design System) theming support. This provides:

1. **Accessible, government-standard UI components**
2. **WCAG 2.1 AA compliant design**
3. **Responsive, mobile-first layouts**
4. **Professional, consistent design matching designsystem.digital.gov**

## Quick Start

### Using USWDS Components

#### Import Components
```tsx
import USWDSButton from '../components/USWDSButton';
import USWDSInput from '../components/USWDSInput';
import USWDSAlert from '../components/USWDSAlert';
import USWDSCard from '../components/USWDSCard';
import USWDSTable from '../components/USWDSTable';
```

#### Example Page Layout
```tsx
import React from 'react';
import USWDSAlert from '../components/USWDSAlert';
import USWDSButton from '../components/USWDSButton';

const MyPage: React.FC = () => {
  return (
    <main id="main-content" className="ggas-uswds-wrapper">
      <div className="usa-section">
        <div className="grid-container">
          <h1 className="margin-top-0">Page Title</h1>
          <p className="usa-intro">Page introduction text</p>
          
          <USWDSAlert type="info" heading="Information">
            Important information for users
          </USWDSAlert>

          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-6">
              <USWDSButton variant="primary">
                Primary Action
              </USWDSButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
```

## USWDS Examples Included

### 1. DashboardUSWDS
Location: `src/renderer/pages/DashboardUSWDS.tsx`

A complete dashboard implementation using USWDS components:
- Grid layout with responsive columns
- Statistics cards
- Data visualization charts
- Accessible tables
- USWDS alerts

### 2. LicenseKeyDialogUSWDS  
Location: `src/renderer/components/LicenseKeyDialogUSWDS.tsx`

Authentication page using USWDS:
- Form input with validation
- Primary and secondary buttons
- Alert messages
- Card layout
- Responsive design

## Using USWDS in Your Pages

### Step 1: Add Main Content Wrapper
```tsx
<main id="main-content" className="ggas-uswds-wrapper">
  {/* Your content */}
</main>
```

### Step 2: Use USWDS Grid System
```tsx
<div className="usa-section">
  <div className="grid-container">
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6">Column 1</div>
      <div className="tablet:grid-col-6">Column 2</div>
    </div>
  </div>
</div>
```

### Step 3: Apply USWDS Utility Classes
```tsx
<h1 className="margin-top-0 margin-bottom-2">Title</h1>
<p className="text-base-dark font-sans-md">Description text</p>
<div className="padding-3 bg-base-lightest border-radius-md">
  Card content
</div>
```

## Common USWDS Patterns

### Button Group
```tsx
<div className="grid-row grid-gap-sm">
  <div className="grid-col-auto">
    <USWDSButton variant="primary">Save</USWDSButton>
  </div>
  <div className="grid-col-auto">
    <USWDSButton variant="secondary">Cancel</USWDSButton>
  </div>
</div>
```

### Form with Validation
```tsx
<form className="usa-form">
  <USWDSInput
    label="Email Address"
    type="email"
    hint="We'll never share your email"
    error={errors.email}
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  
  <USWDSButton type="submit" variant="primary">
    Submit
  </USWDSButton>
</form>
```

### Alert Messages
```tsx
{/* Success */}
<USWDSAlert type="success" heading="Success!">
  Your changes have been saved.
</USWDSAlert>

{/* Error */}
<USWDSAlert type="error" heading="Error">
  Please correct the errors below.
</USWDSAlert>

{/* Info */}
<USWDSAlert type="info" heading="Note" slim>
  This is an informational message.
</USWDSAlert>
```

### Data Table
```tsx
const columns = [
  { header: 'Date', accessor: 'date' },
  { header: 'Emissions', accessor: 'emissions' },
  { header: 'Source', accessor: 'source' }
];

<USWDSTable
  columns={columns}
  data={tableData}
  striped
  bordered
  caption="Recent emissions data"
/>
```

### Statistics Cards
```tsx
<div className="grid-row grid-gap">
  <div className="tablet:grid-col-4">
    <div className="usa-card">
      <div className="usa-card__container">
        <div className="usa-card__header">
          <h3 className="usa-card__heading">Total Emissions</h3>
        </div>
        <div className="usa-card__body">
          <p className="font-sans-3xl text-bold text-primary margin-0">
            12,450
          </p>
          <p className="text-base margin-top-1">kg CO2e</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Accessibility Features

All USWDS components include:

1. **Keyboard Navigation**: Full keyboard support with visible focus indicators
2. **Screen Reader Support**: ARIA labels and landmarks
3. **Color Contrast**: WCAG 2.1 AA compliant color ratios
4. **Skip Navigation**: Skip to main content link for keyboard users
5. **Form Labels**: Proper label associations and error messages
6. **Semantic HTML**: Use of proper HTML5 elements

### Testing Accessibility

```bash
# Keyboard Navigation
Tab - Move forward
Shift+Tab - Move backward  
Enter/Space - Activate
Arrow Keys - Navigate lists/menus
Esc - Close dialogs

# Screen Readers
# Test with NVDA, JAWS, or VoiceOver
```

## Migration from Material-UI

The application supports both Material-UI and USWDS components. You can migrate gradually:

1. **Keep existing MUI components** - They will continue to work
2. **Use USWDS for new features** - Build new pages with USWDS
3. **Migrate incrementally** - Convert one page at a time
4. **Test thoroughly** - Ensure accessibility standards are met

## Color Palette

Green Country branded colors:
- Primary: `#2e7d32` (Green)
- Primary Dark: `#1b5e20`
- Primary Light: `#4caf50`

USWDS utility classes:
- `bg-primary` - Primary background color
- `text-primary` - Primary text color
- `border-primary` - Primary border color

## Grid Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Responsive classes:
- `mobile-lg:grid-col-6` - 6 columns on mobile-large and up
- `tablet:grid-col-4` - 4 columns on tablet and up
- `desktop:grid-col-3` - 3 columns on desktop and up

## Resources

- **Full Documentation**: See `docs/USWDS_IMPLEMENTATION.md`
- **USWDS Docs**: https://designsystem.digital.gov/
- **Components**: https://designsystem.digital.gov/components/
- **Utilities**: https://designsystem.digital.gov/utilities/
- **Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/

## Support

For questions or issues:
1. Check the USWDS documentation
2. Review example implementations (DashboardUSWDS, LicenseKeyDialogUSWDS)
3. Refer to the comprehensive guide in `docs/USWDS_IMPLEMENTATION.md`

## Next Steps

1. Review the example pages to see USWDS in action
2. Start building new features with USWDS components
3. Test accessibility with keyboard and screen reader
4. Gradually migrate existing pages to USWDS patterns
