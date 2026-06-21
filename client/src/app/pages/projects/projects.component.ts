import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  details: {
    role: string;
    platform: 'Onsite' | 'Remote' | 'Hybrid';
    responsibilities: string[];
    technologies: string[];
    outcomes: string;
    link?: string;
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="projects-container">
      <header class="page-header">
        <button class="back-button" routerLink="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>Jobs</h1>
        <div style="width: 40px;"></div>
      </header>

      <div class="content">
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search projects or skills..."
            [(ngModel)]="searchQuery">
        </div>

        <div class="filter-tabs">
          <button
            class="filter-tab"
            [class.active]="activeFilter === 'All'"
            (click)="setFilter('All')">All</button>
          <button
            class="filter-tab"
            [class.active]="activeFilter === 'Full-time'"
            (click)="setFilter('Full-time')">Full-time</button>
          <button
            class="filter-tab"
            [class.active]="activeFilter === 'Part-time'"
            (click)="setFilter('Part-time')">Part-time</button>
          <button
            class="filter-tab"
            [class.active]="activeFilter === 'Remote'"
            (click)="setFilter('Remote')">Remote</button>
          <button
            class="filter-tab"
            [class.active]="activeFilter === 'Contract'"
            (click)="setFilter('Contract')">Contract</button>
        </div>

        <div class="projects-grid">
          <div class="project-card" *ngFor="let project of filteredProjects(); let i = index">
            <div class="project-image">
              <img [src]="project.image" [alt]="project.title">
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span class="tag" *ngFor="let tag of project.tags">{{ tag }}</span>
              </div>
              <div class="meta-row">
                <span class="chip">{{ project.category }}</span>
                <span class="chip secondary">{{ project.details.platform }}</span>
              </div>
              <button class="learn-more" (click)="toggleExpand(i)" type="button">
                {{ expandedIndex === i ? 'Hide Details' : 'Learn More' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <div class="details-panel" *ngIf="expandedIndex === i">
                <div class="details-row">
                  <strong>Role:</strong> <span>{{ project.details.role }}</span>
                </div>
                <div class="details-row">
                  <strong>Responsibilities:</strong>
                  <ul>
                    <li *ngFor="let r of project.details.responsibilities">{{ r }}</li>
                  </ul>
                </div>
                <div class="details-row">
                  <strong>Requirements/Tech:</strong>
                  <div class="stack">
                    <span class="stack-chip" *ngFor="let t of project.details.technologies">{{ t }}</span>
                  </div>
                </div>
                <div class="details-row">
                  <strong>Notes:</strong> <span>{{ project.details.outcomes }}</span>
                </div>
                <a *ngIf="project.details.link" [href]="project.details.link" target="_blank" rel="noopener" class="visit-link">
                  Visit project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      min-height: 100vh;
      background: #1a1f2e;
      color: white;
      padding-bottom: 40px;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: #1a1f2e;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .page-header h1 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .back-button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
    }

    .back-button:hover {
      opacity: 0.7;
    }

    .content {
      padding: 0 24px;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #0f1419;
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 24px;
      border: 1px solid #2d3548;
    }

    .search-bar svg {
      color: #64748b;
      flex-shrink: 0;
    }

    .search-bar input {
      flex: 1;
      background: transparent;
      border: none;
      color: white;
      font-size: 15px;
      outline: none;
    }

    .search-bar input::placeholder {
      color: #64748b;
    }

    .filter-tabs {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      margin-bottom: 32px;
      padding-bottom: 4px;
    }

    .filter-tabs::-webkit-scrollbar {
      display: none;
    }

    .filter-tab {
      padding: 10px 20px;
      background: #2d3548;
      border: 1px solid #374151;
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    .filter-tab.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    .filter-tab:hover:not(.active) {
      background: #374151;
    }

    .projects-grid {
      display: grid;
      gap: 24px;
    }

    .project-card {
      background: #0f1419;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #2d3548;
      transition: all 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      border-color: #3b82f6;
    }

    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .project-content {
      padding: 20px;
    }

    .project-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 8px;
      color: white;
    }

    .project-description {
      font-size: 14px;
      line-height: 1.5;
      color: #cbd5e1;
      margin: 0 0 16px;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .tag {
      padding: 6px 12px;
      background: #2d3548;
      border-radius: 6px;
      font-size: 12px;
      color: #3b82f6;
      font-weight: 500;
    }

    .meta-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .chip {
      padding: 6px 10px;
      background: #2d3548;
      border: 1px solid #374151;
      border-radius: 999px;
      font-size: 12px;
      color: #cbd5e1;
    }

    .chip.secondary {
      color: #94a3b8;
      background: #1c2533;
    }

    .learn-more {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #3b82f6;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: gap 0.3s ease;
      padding: 0;
    }

    .learn-more:hover {
      gap: 10px;
    }

    .details-panel {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #2d3548;
      display: grid;
      gap: 12px;
    }

    .details-row strong {
      color: #e2e8f0;
      margin-right: 6px;
    }

    .details-row ul {
      margin: 6px 0 0 18px;
      padding: 0;
      color: #cbd5e1;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }

    .stack-chip {
      padding: 6px 10px;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 8px;
      font-size: 12px;
      color: #cbd5e1;
    }

    .visit-link {
      display: inline-block;
      margin-top: 8px;
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class ProjectsComponent {
  searchQuery = '';
  activeFilter: 'All' | 'Full-time' | 'Part-time' | 'Remote' | 'Contract' = 'All';
  expandedIndex: number | null = null;

  projects: Project[] = [
    {
      title: 'Frontend Engineer',
      description: 'Build and maintain accessible UI components and frontend architecture.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Angular', 'TypeScript', 'Accessibility'],
      category: 'Full-time',
      details: {
        role: 'Frontend Engineer',
        platform: 'Hybrid',
        responsibilities: [
          'Implement design system components',
          'Optimize performance and a11y',
          'Collaborate with design and backend'
        ],
        technologies: ['Angular', 'RxJS', 'Jest'],
        outcomes: 'Example: clear component patterns and improved UX',
        link: 'https://example.com/job/frontend'
      }
    },
    {
      title: 'Product Designer',
      description: 'Shape end-to-end product experiences from research to high-fidelity.',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Figma', 'User Research', 'Design Systems'],
      category: 'Remote',
      details: {
        role: 'Product Designer',
        platform: 'Remote',
        responsibilities: [
          'Run discovery and usability tests',
          'Create flows, wireframes, and prototypes',
          'Contribute to design system'
        ],
        technologies: ['Figma', 'FigJam', 'Maze'],
        outcomes: 'Example: clearer onboarding and consistent UI',
        link: 'https://example.com/job/designer'
      }
    },
    {
      title: 'Data Visualization Engineer',
      description: 'Build interactive dashboards and data exploration features.',
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['D3.js', 'SQL', 'Python'],
      category: 'Contract',
      details: {
        role: 'Visualization Engineer',
        platform: 'Onsite',
        responsibilities: [
          'Create reusable chart components',
          'Model datasets for efficient queries',
          'Collaborate on KPI definitions'
        ],
        technologies: ['Angular', 'D3.js', 'FastAPI', 'PostgreSQL'],
        outcomes: 'Example: easier trend exploration and reporting'
      }
    },
    {
      title: 'UX Researcher',
      description: 'Plan and conduct studies to inform product strategy.',
      image: 'https://images.pexels.com/photos/7948047/pexels-photo-7948047.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      tags: ['Interviews', 'Surveys', 'Analysis'],
      category: 'Part-time',
      details: {
        role: 'UX Researcher',
        platform: 'Remote',
        responsibilities: [
          'Define research plans and screeners',
          'Synthesize findings into insights',
          'Advise product and design'
        ],
        technologies: ['Dovetail', 'Lookback', 'Google Sheets'],
        outcomes: 'Example: clearer user needs and prioritized opportunities'
      }
    }
  ];

  setFilter(filter: 'All' | 'Full-time' | 'Part-time' | 'Remote' | 'Contract') {
    this.activeFilter = filter;
    this.expandedIndex = null;
  }

  filteredProjects(): Project[] {
    const query = this.searchQuery.trim().toLowerCase();
    return this.projects.filter(p => {
      const matchesFilter = this.activeFilter === 'All' ? true : p.category === this.activeFilter;
      const haystack = [
        p.title,
        p.description,
        p.category,
        p.details.platform,
        ...p.tags,
        ...p.details.technologies,
        ...p.details.responsibilities
      ].join(' ').toLowerCase();
      const matchesQuery = query.length === 0 ? true : haystack.includes(query);
      return matchesFilter && matchesQuery;
    });
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
