import React, { useState } from 'react';
import { 
  GridView, 
  ViewList, 
  Image,
  VideoLibrary,
  Description,
  Folder,
  MoreVert,
  FileDownload,
  Edit,
  Delete,
  Info,
} from '@mui/icons-material';
import AEMButton from './AEMButton';
import AEMCard from './AEMCard';
import AEMSlidingPanel from './AEMSlidingPanel';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'folder';
  size?: string;
  modified?: string;
  thumbnail?: string;
  tags?: string[];
}

interface AEMAssetGridProps {
  assets?: Asset[];
  viewMode?: 'grid' | 'list';
}

const AEMAssetGrid: React.FC<AEMAssetGridProps> = ({ 
  assets: initialAssets,
  viewMode: initialViewMode = 'grid'
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);

  // Demo assets if none provided
  const demoAssets: Asset[] = initialAssets || [
    { id: '1', name: 'facility-overview.jpg', type: 'image', size: '2.4 MB', modified: '2 hours ago', tags: ['facility', 'overview'] },
    { id: '2', name: 'emissions-report.pdf', type: 'document', size: '450 KB', modified: '1 day ago', tags: ['report', 'emissions'] },
    { id: '3', name: 'drone-survey.mp4', type: 'video', size: '125 MB', modified: '3 days ago', tags: ['survey', 'drone'] },
    { id: '4', name: 'Documents', type: 'folder', modified: '5 days ago' },
    { id: '5', name: 'scope3-data.xlsx', type: 'document', size: '890 KB', modified: '1 week ago', tags: ['scope3', 'data'] },
    { id: '6', name: 'thermal-imaging.jpg', type: 'image', size: '3.1 MB', modified: '2 weeks ago', tags: ['thermal', 'flir'] },
  ];

  const assets = demoAssets;

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image style={{ fontSize: '48px', color: 'var(--aem-blue-primary)' }} />;
      case 'video':
        return <VideoLibrary style={{ fontSize: '48px', color: 'var(--aem-purple)' }} />;
      case 'document':
        return <Description style={{ fontSize: '48px', color: 'var(--aem-orange)' }} />;
      case 'folder':
        return <Folder style={{ fontSize: '48px', color: 'var(--aem-gray-500)' }} />;
      default:
        return <Description style={{ fontSize: '48px', color: 'var(--aem-gray-500)' }} />;
    }
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowPropertiesPanel(true);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--aem-spacing-md)',
        padding: 'var(--aem-spacing-md)',
        backgroundColor: 'var(--aem-bg-secondary)',
        borderRadius: 'var(--aem-radius-md)',
      }}>
        <h2 style={{
          margin: 0,
          fontSize: 'var(--aem-font-size-xl)',
          fontWeight: 'var(--aem-font-weight-semibold)',
          color: 'var(--aem-text-primary)',
        }}>
          Assets
        </h2>
        
        <div style={{ display: 'flex', gap: 'var(--aem-spacing-sm)' }}>
          <AEMButton
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            size="small"
            icon={<GridView />}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </AEMButton>
          <AEMButton
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="small"
            icon={<ViewList />}
            onClick={() => setViewMode('list')}
          >
            List
          </AEMButton>
        </div>
      </div>

      {/* Asset Grid View */}
      {viewMode === 'grid' && (
        <div className="aem-asset-grid">
          {assets.map(asset => (
            <div 
              key={asset.id}
              className="aem-asset-item"
              onClick={() => handleAssetClick(asset)}
            >
              <div className="aem-asset-thumbnail">
                {getAssetIcon(asset.type)}
              </div>
              <div className="aem-asset-info">
                <div className="aem-asset-name" title={asset.name}>
                  {asset.name}
                </div>
                <div className="aem-asset-meta">
                  {asset.size && `${asset.size} • `}{asset.modified}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset List View */}
      {viewMode === 'list' && (
        <div style={{ backgroundColor: 'var(--aem-bg-secondary)', borderRadius: 'var(--aem-radius-md)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--aem-border)' }}>
                <th style={{ padding: 'var(--aem-spacing-md)', textAlign: 'left', fontWeight: 'var(--aem-font-weight-semibold)', color: 'var(--aem-text-primary)' }}>Name</th>
                <th style={{ padding: 'var(--aem-spacing-md)', textAlign: 'left', fontWeight: 'var(--aem-font-weight-semibold)', color: 'var(--aem-text-primary)' }}>Type</th>
                <th style={{ padding: 'var(--aem-spacing-md)', textAlign: 'left', fontWeight: 'var(--aem-font-weight-semibold)', color: 'var(--aem-text-primary)' }}>Size</th>
                <th style={{ padding: 'var(--aem-spacing-md)', textAlign: 'left', fontWeight: 'var(--aem-font-weight-semibold)', color: 'var(--aem-text-primary)' }}>Modified</th>
                <th style={{ padding: 'var(--aem-spacing-md)', textAlign: 'right', fontWeight: 'var(--aem-font-weight-semibold)', color: 'var(--aem-text-primary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr 
                  key={asset.id}
                  style={{ 
                    borderBottom: '1px solid var(--aem-border)',
                    cursor: 'pointer',
                    transition: 'background-color var(--aem-transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--aem-gray-800)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleAssetClick(asset)}
                >
                  <td style={{ padding: 'var(--aem-spacing-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-sm)' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {React.cloneElement(getAssetIcon(asset.type), { style: { fontSize: '24px' } })}
                      </span>
                      <span style={{ color: 'var(--aem-text-primary)', fontWeight: 'var(--aem-font-weight-medium)' }}>
                        {asset.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: 'var(--aem-spacing-md)', color: 'var(--aem-text-secondary)', textTransform: 'capitalize' }}>
                    {asset.type}
                  </td>
                  <td style={{ padding: 'var(--aem-spacing-md)', color: 'var(--aem-text-secondary)' }}>
                    {asset.size || '-'}
                  </td>
                  <td style={{ padding: 'var(--aem-spacing-md)', color: 'var(--aem-text-secondary)' }}>
                    {asset.modified}
                  </td>
                  <td style={{ padding: 'var(--aem-spacing-md)', textAlign: 'right' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--aem-text-secondary)',
                      cursor: 'pointer',
                      padding: 'var(--aem-spacing-xs)',
                    }}>
                      <MoreVert style={{ fontSize: '20px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Properties Panel */}
      <AEMSlidingPanel
        isOpen={showPropertiesPanel}
        onClose={() => setShowPropertiesPanel(false)}
        title="Asset Properties"
      >
        {selectedAsset && (
          <div>
            <div style={{ marginBottom: 'var(--aem-spacing-lg)', textAlign: 'center' }}>
              {getAssetIcon(selectedAsset.type)}
              <h3 style={{ 
                marginTop: 'var(--aem-spacing-md)', 
                fontSize: 'var(--aem-font-size-lg)',
                color: 'var(--aem-text-primary)',
              }}>
                {selectedAsset.name}
              </h3>
            </div>

            <div style={{ marginBottom: 'var(--aem-spacing-lg)' }}>
              <h4 style={{ 
                marginBottom: 'var(--aem-spacing-sm)',
                fontSize: 'var(--aem-font-size-sm)',
                fontWeight: 'var(--aem-font-weight-semibold)',
                color: 'var(--aem-text-secondary)',
                textTransform: 'uppercase',
              }}>
                Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aem-spacing-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--aem-text-secondary)' }}>Type:</span>
                  <span style={{ color: 'var(--aem-text-primary)', textTransform: 'capitalize' }}>{selectedAsset.type}</span>
                </div>
                {selectedAsset.size && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--aem-text-secondary)' }}>Size:</span>
                    <span style={{ color: 'var(--aem-text-primary)' }}>{selectedAsset.size}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--aem-text-secondary)' }}>Modified:</span>
                  <span style={{ color: 'var(--aem-text-primary)' }}>{selectedAsset.modified}</span>
                </div>
              </div>
            </div>

            {selectedAsset.tags && selectedAsset.tags.length > 0 && (
              <div style={{ marginBottom: 'var(--aem-spacing-lg)' }}>
                <h4 style={{ 
                  marginBottom: 'var(--aem-spacing-sm)',
                  fontSize: 'var(--aem-font-size-sm)',
                  fontWeight: 'var(--aem-font-weight-semibold)',
                  color: 'var(--aem-text-secondary)',
                  textTransform: 'uppercase',
                }}>
                  Tags
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--aem-spacing-xs)' }}>
                  {selectedAsset.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '2px var(--aem-spacing-sm)',
                        backgroundColor: 'var(--aem-gray-800)',
                        color: 'var(--aem-text-primary)',
                        borderRadius: 'var(--aem-radius-sm)',
                        fontSize: 'var(--aem-font-size-xs)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aem-spacing-sm)' }}>
              <AEMButton variant="primary" fullWidth icon={<FileDownload />}>
                Download
              </AEMButton>
              <AEMButton variant="ghost" fullWidth icon={<Edit />}>
                Edit
              </AEMButton>
              <AEMButton variant="danger" fullWidth icon={<Delete />}>
                Delete
              </AEMButton>
            </div>
          </div>
        )}
      </AEMSlidingPanel>
    </div>
  );
};

export default AEMAssetGrid;
