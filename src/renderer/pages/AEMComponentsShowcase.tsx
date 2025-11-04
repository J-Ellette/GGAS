import React, { useState } from 'react';
import { Dashboard, Settings, CheckCircle } from '@mui/icons-material';
import AEMBreadcrumb from '../components/AEMBreadcrumb';
import AEMCard from '../components/AEMCard';
import AEMPanel from '../components/AEMPanel';
import AEMButton from '../components/AEMButton';
import AEMStatusBadge from '../components/AEMStatusBadge';
import AEMWorkflowTimeline, { WorkflowStep } from '../components/AEMWorkflowTimeline';
import AEMAssetGrid from '../components/AEMAssetGrid';
import AEMSlidingPanel from '../components/AEMSlidingPanel';

const AEMComponentsShowcase: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);

  const workflowSteps: WorkflowStep[] = [
    {
      id: '1',
      label: 'Data Collection',
      status: 'completed',
      timestamp: '2024-01-15 09:00 AM',
      description: 'All emission data collected from monitoring stations',
      assignedTo: 'John Doe',
    },
    {
      id: '2',
      label: 'Data Validation',
      status: 'completed',
      timestamp: '2024-01-15 11:30 AM',
      description: 'Data quality checks completed successfully',
      assignedTo: 'Jane Smith',
    },
    {
      id: '3',
      label: 'Report Generation',
      status: 'active',
      timestamp: '2024-01-15 02:00 PM',
      description: 'Generating compliance report',
      assignedTo: 'Bob Wilson',
    },
    {
      id: '4',
      label: 'Management Review',
      status: 'pending',
      description: 'Awaiting management approval',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '5',
      label: 'Submission',
      status: 'pending',
      description: 'Submit to regulatory authority',
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <AEMBreadcrumb
        items={[
          { label: 'Home', onClick: () => console.log('Home') },
          { label: 'Components', onClick: () => console.log('Components') },
          { label: 'Showcase' },
        ]}
      />

      <div style={{ marginTop: 'var(--aem-spacing-lg)' }}>
        <h1 style={{ 
          fontSize: 'var(--aem-font-size-3xl)',
          fontWeight: 'var(--aem-font-weight-bold)',
          color: 'var(--aem-text-primary)',
          marginBottom: 'var(--aem-spacing-md)',
        }}>
          AEM Design System Showcase
        </h1>
        <p style={{ 
          fontSize: 'var(--aem-font-size-md)',
          color: 'var(--aem-text-secondary)',
          marginBottom: 'var(--aem-spacing-xl)',
        }}>
          Demonstrating Adobe Experience Manager-inspired design components
        </p>

        {/* Buttons Section */}
        <AEMCard title="Buttons" headerIcon={<Settings />} style={{ marginBottom: 'var(--aem-spacing-lg)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--aem-spacing-md)' }}>
            <AEMButton variant="primary">Primary Button</AEMButton>
            <AEMButton variant="secondary">Secondary Button</AEMButton>
            <AEMButton variant="ghost">Ghost Button</AEMButton>
            <AEMButton variant="danger">Danger Button</AEMButton>
            <AEMButton variant="primary" size="small">Small</AEMButton>
            <AEMButton variant="primary" size="large">Large</AEMButton>
            <AEMButton variant="primary" disabled>Disabled</AEMButton>
            <AEMButton variant="primary" icon={<CheckCircle />}>With Icon</AEMButton>
          </div>
        </AEMCard>

        {/* Status Badges */}
        <AEMCard title="Status Badges" style={{ marginBottom: 'var(--aem-spacing-lg)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--aem-spacing-md)' }}>
            <AEMStatusBadge status="success" label="Completed" />
            <AEMStatusBadge status="error" label="Failed" />
            <AEMStatusBadge status="warning" label="Warning" />
            <AEMStatusBadge status="info" label="In Progress" />
            <AEMStatusBadge status="in-progress" label="Processing" />
            <AEMStatusBadge status="neutral" label="Pending" />
            <AEMStatusBadge status="success" label="Small" size="small" />
          </div>
        </AEMCard>

        {/* Grid Layout with Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--aem-spacing-md)',
          marginBottom: 'var(--aem-spacing-lg)',
        }}>
          <AEMCard 
            title="Total Emissions" 
            headerIcon={<Dashboard />}
            hoverable
          >
            <div style={{ fontSize: 'var(--aem-font-size-3xl)', fontWeight: 'var(--aem-font-weight-bold)', color: 'var(--aem-blue-primary)' }}>
              12,543
            </div>
            <div style={{ color: 'var(--aem-text-secondary)', marginTop: 'var(--aem-spacing-xs)' }}>
              tons CO₂e this month
            </div>
            <div style={{ marginTop: 'var(--aem-spacing-md)' }}>
              <AEMStatusBadge status="success" label="↓ 8% vs last month" />
            </div>
          </AEMCard>

          <AEMCard 
            title="Data Quality" 
            headerIcon={<CheckCircle />}
            hoverable
          >
            <div style={{ fontSize: 'var(--aem-font-size-3xl)', fontWeight: 'var(--aem-font-weight-bold)', color: 'var(--aem-green)' }}>
              98.5%
            </div>
            <div style={{ color: 'var(--aem-text-secondary)', marginTop: 'var(--aem-spacing-xs)' }}>
              validated data points
            </div>
            <div style={{ marginTop: 'var(--aem-spacing-md)' }}>
              <AEMStatusBadge status="success" label="Above target" />
            </div>
          </AEMCard>

          <AEMCard 
            title="Pending Approvals"
            hoverable
          >
            <div style={{ fontSize: 'var(--aem-font-size-3xl)', fontWeight: 'var(--aem-font-weight-bold)', color: 'var(--aem-orange)' }}>
              5
            </div>
            <div style={{ color: 'var(--aem-text-secondary)', marginTop: 'var(--aem-spacing-xs)' }}>
              reports awaiting review
            </div>
            <div style={{ marginTop: 'var(--aem-spacing-md)' }}>
              <AEMButton variant="primary" size="small" fullWidth>
                Review Now
              </AEMButton>
            </div>
          </AEMCard>
        </div>

        {/* Panels */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: 'var(--aem-spacing-md)',
          marginBottom: 'var(--aem-spacing-lg)',
        }}>
          <AEMPanel title="Workflow Timeline">
            <AEMWorkflowTimeline steps={workflowSteps} />
          </AEMPanel>

          <AEMPanel title="Quick Actions" collapsible>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aem-spacing-sm)' }}>
              <AEMButton variant="primary" fullWidth>New Report</AEMButton>
              <AEMButton variant="secondary" fullWidth>Export Data</AEMButton>
              <AEMButton variant="ghost" fullWidth>View Settings</AEMButton>
              <AEMButton variant="ghost" fullWidth onClick={() => setShowPanel(true)}>
                Open Side Panel
              </AEMButton>
            </div>
          </AEMPanel>
        </div>

        {/* Asset Management */}
        <AEMAssetGrid />
      </div>

      {/* Sliding Panel Example */}
      <AEMSlidingPanel
        isOpen={showPanel}
        onClose={() => setShowPanel(false)}
        title="Properties Panel"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aem-spacing-md)' }}>
          <div>
            <label style={{ 
              display: 'block',
              marginBottom: 'var(--aem-spacing-xs)',
              fontSize: 'var(--aem-font-size-sm)',
              fontWeight: 'var(--aem-font-weight-medium)',
              color: 'var(--aem-text-primary)',
            }}>
              Report Name
            </label>
            <input
              type="text"
              defaultValue="Monthly Emissions Report"
              style={{
                width: '100%',
                padding: 'var(--aem-spacing-sm)',
                backgroundColor: 'var(--aem-gray-800)',
                border: '1px solid var(--aem-border)',
                borderRadius: 'var(--aem-radius-sm)',
                color: 'var(--aem-text-primary)',
                fontSize: 'var(--aem-font-size-base)',
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block',
              marginBottom: 'var(--aem-spacing-xs)',
              fontSize: 'var(--aem-font-size-sm)',
              fontWeight: 'var(--aem-font-weight-medium)',
              color: 'var(--aem-text-primary)',
            }}>
              Status
            </label>
            <select
              defaultValue="draft"
              style={{
                width: '100%',
                padding: 'var(--aem-spacing-sm)',
                backgroundColor: 'var(--aem-gray-800)',
                border: '1px solid var(--aem-border)',
                borderRadius: 'var(--aem-radius-sm)',
                color: 'var(--aem-text-primary)',
                fontSize: 'var(--aem-font-size-base)',
              }}
            >
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div style={{ marginTop: 'var(--aem-spacing-lg)' }}>
            <AEMButton variant="primary" fullWidth>Save Changes</AEMButton>
          </div>
        </div>
      </AEMSlidingPanel>
    </div>
  );
};

export default AEMComponentsShowcase;
