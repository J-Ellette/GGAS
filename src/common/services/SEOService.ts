/**
 * SEO Service - Provides SEO tools and metadata management
 * 
 * Features:
 * - Meta tag management for documentation pages
 * - Sitemap generation for documentation structure
 * - URL optimization helpers
 * - Content indexing for search
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  canonicalUrl?: string;
  lastModified?: string;
}

export interface SitemapEntry {
  url: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified: string;
}

export class SEOService {
  private metadata: Map<string, SEOMetadata> = new Map();
  private sitemap: SitemapEntry[] = [];

  /**
   * Set metadata for a page or section
   */
  setMetadata(path: string, metadata: SEOMetadata): void {
    this.metadata.set(path, metadata);
  }

  /**
   * Get metadata for a page
   */
  getMetadata(path: string): SEOMetadata | undefined {
    return this.metadata.get(path);
  }

  /**
   * Generate optimized URL slug from title
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/--+/g, '-')      // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
  }

  /**
   * Add entry to sitemap
   */
  addToSitemap(entry: SitemapEntry): void {
    // Remove existing entry with same URL
    this.sitemap = this.sitemap.filter(e => e.url !== entry.url);
    this.sitemap.push(entry);
    // Sort by priority (highest first)
    this.sitemap.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Get full sitemap
   */
  getSitemap(): SitemapEntry[] {
    return [...this.sitemap];
  }

  /**
   * Generate sitemap XML
   */
  generateSitemapXML(baseUrl: string = ''): string {
    const entries = this.sitemap.map(entry => `
  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(baseUrl: string = ''): string {
    return `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml

# GGAS - Greenhouse Gas Accounting Software
# Documentation and resources for emissions tracking`;
  }

  /**
   * Extract keywords from content
   */
  extractKeywords(content: string, limit: number = 10): string[] {
    // Remove common stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);

    // Extract words
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    // Count frequency
    const frequency: Map<string, number> = new Map();
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });

    // Sort by frequency and return top keywords
    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word]) => word);
  }

  /**
   * Generate meta description from content
   */
  generateDescription(content: string, maxLength: number = 160): string {
    // Remove markdown/HTML
    const cleaned = content
      .replace(/#{1,6}\s+/g, '')  // Remove markdown headers
      .replace(/<[^>]*>/g, '')     // Remove HTML tags
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Remove markdown links
      .replace(/\s+/g, ' ')        // Normalize whitespace
      .trim();

    // Truncate to max length
    if (cleaned.length <= maxLength) {
      return cleaned;
    }

    // Find last complete sentence within limit
    const truncated = cleaned.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    if (lastPeriod > maxLength * 0.7) {
      return truncated.substring(0, lastPeriod + 1);
    }

    // Otherwise, truncate at last space and add ellipsis
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
  }

  /**
   * Validate URL structure
   */
  validateUrl(url: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check length
    if (url.length > 100) {
      issues.push('URL is too long (should be under 100 characters)');
    }

    // Check for special characters
    if (/[^a-z0-9\-\/]/.test(url)) {
      issues.push('URL contains invalid characters (use only lowercase letters, numbers, hyphens, and slashes)');
    }

    // Check for multiple consecutive hyphens
    if (/--/.test(url)) {
      issues.push('URL contains multiple consecutive hyphens');
    }

    // Check for trailing/leading hyphens
    if (/^-|-$/.test(url.replace(/\//g, ''))) {
      issues.push('URL segments should not start or end with hyphens');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Initialize default sitemap entries for GGAS app
   */
  initializeDefaultSitemap(): void {
    const now = new Date().toISOString();

    const defaultEntries: SitemapEntry[] = [
      {
        url: '/dashboard',
        title: 'Dashboard',
        description: 'Overview of emissions data and analytics',
        priority: 1.0,
        changeFrequency: 'daily',
        lastModified: now
      },
      {
        url: '/activity-data',
        title: 'Activity Data Management',
        description: 'Manage emissions-related activity data',
        priority: 0.9,
        changeFrequency: 'daily',
        lastModified: now
      },
      {
        url: '/emission-factors',
        title: 'Emission Factors',
        description: 'Browse and manage emission factors',
        priority: 0.8,
        changeFrequency: 'weekly',
        lastModified: now
      },
      {
        url: '/calculations',
        title: 'Emissions Calculations',
        description: 'Calculate GHG emissions from activity data',
        priority: 0.9,
        changeFrequency: 'daily',
        lastModified: now
      },
      {
        url: '/documentation',
        title: 'Documentation',
        description: 'Complete guide to GGAS features and phases',
        priority: 0.7,
        changeFrequency: 'weekly',
        lastModified: now
      }
    ];

    defaultEntries.forEach(entry => this.addToSitemap(entry));
  }
}

export const seoService = new SEOService();

// Initialize default sitemap
seoService.initializeDefaultSitemap();
