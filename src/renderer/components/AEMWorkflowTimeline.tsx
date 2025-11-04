import React from 'react';
import AEMStatusBadge from './AEMStatusBadge';

export interface WorkflowStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  timestamp?: string;
  description?: string;
  assignedTo?: string;
}

interface AEMWorkflowTimelineProps {
  steps: WorkflowStep[];
}

const AEMWorkflowTimeline: React.FC<AEMWorkflowTimelineProps> = ({ steps }) => {
  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'in-progress';
      case 'error':
        return 'error';
      case 'pending':
      default:
        return 'neutral';
    }
  };

  return (
    <div className="aem-workflow-timeline">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`aem-workflow-step ${step.status}`}
        >
          <div style={{ marginBottom: 'var(--aem-spacing-xs)' }}>
            <strong style={{ 
              color: step.status === 'active' ? 'var(--aem-blue-primary)' : 'var(--aem-text-primary)',
              fontSize: 'var(--aem-font-size-base)',
            }}>
              {step.label}
            </strong>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-sm)', marginBottom: 'var(--aem-spacing-xs)' }}>
            <AEMStatusBadge 
              status={getStepStatus(step.status) as any}
              label={step.status.charAt(0).toUpperCase() + step.status.slice(1)}
              size="small"
            />
            {step.timestamp && (
              <span style={{ 
                fontSize: 'var(--aem-font-size-xs)', 
                color: 'var(--aem-text-secondary)' 
              }}>
                {step.timestamp}
              </span>
            )}
          </div>

          {step.description && (
            <p style={{ 
              margin: '0 0 var(--aem-spacing-xs) 0',
              color: 'var(--aem-text-secondary)',
              fontSize: 'var(--aem-font-size-sm)',
            }}>
              {step.description}
            </p>
          )}

          {step.assignedTo && (
            <span style={{ 
              fontSize: 'var(--aem-font-size-xs)',
              color: 'var(--aem-text-disabled)',
            }}>
              Assigned to: {step.assignedTo}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AEMWorkflowTimeline;
