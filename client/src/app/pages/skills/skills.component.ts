import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Skill {
  name: string;
  level: string;
  progress: number;
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="skills-container">
      <header class="page-header">
        <button class="back-button" routerLink="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>My Skills</h1>
        <button class="edit-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </header>

      <div class="content">
        <div class="tabs">
          <button
            class="tab"
            [class.active]="activeTab === 'technical'"
            (click)="activeTab = 'technical'">
            Technical
          </button>
          <button
            class="tab"
            [class.active]="activeTab === 'soft'"
            (click)="activeTab = 'soft'">
            Soft Skills
          </button>
        </div>

        <div *ngIf="activeTab === 'technical'">
          <section class="skill-category">
            <h2 class="category-title">Programming Languages</h2>

            <div class="skill-item" *ngFor="let skill of programmingLanguages">
              <div class="skill-header">
                <div class="skill-info">
                  <div class="skill-icon" [style.background]="skill.icon === 'python' ? '#ff6b35' : '#f7df1e'">
                    {{ skill.icon === 'python' ? '{  }' : 'JS' }}
                  </div>
                  <div>
                    <h3 class="skill-name">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>
                <span class="skill-progress-text">{{ skill.progress }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="skill.progress"></div>
              </div>
            </div>
          </section>

          <section class="skill-category">
            <h2 class="category-title">Frameworks & Libraries</h2>

            <div class="skill-item" *ngFor="let skill of frameworks">
              <div class="skill-header">
                <div class="skill-info">
                  <div class="skill-icon" [style.background]="getFrameworkColor(skill.icon)">
                    {{ getFrameworkLabel(skill.icon) }}
                  </div>
                  <div>
                    <h3 class="skill-name">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>
                <span class="skill-progress-text">{{ skill.progress }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="skill.progress"></div>
              </div>
            </div>
          </section>

          <section class="skill-category">
            <h2 class="category-title">Design Tools</h2>

            <div class="skill-item" *ngFor="let skill of designTools">
              <div class="skill-header">
                <div class="skill-info">
                  <div class="skill-icon" style="background: #a259ff;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 class="skill-name">{{ skill.name }}</h3>
                    <p class="skill-level">{{ skill.level }}</p>
                  </div>
                </div>
                <span class="skill-progress-text">{{ skill.progress }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="skill.progress"></div>
              </div>
            </div>
          </section>
        </div>

        <div *ngIf="activeTab === 'soft'" class="soft-skills">
          <div class="soft-skill-card" *ngFor="let skill of softSkills">
            <h3>{{ skill.name }}</h3>
            <p>{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-container {
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

    .back-button, .edit-button {
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

    .back-button:hover, .edit-button:hover {
      opacity: 0.7;
    }

    .content {
      padding: 0 24px;
    }

    .tabs {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      background: #0f1419;
      padding: 6px;
      border-radius: 12px;
    }

    .tab {
      flex: 1;
      padding: 12px;
      background: transparent;
      border: none;
      color: #64748b;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab.active {
      background: #2d3548;
      color: white;
    }

    .skill-category {
      margin-bottom: 48px;
    }

    .category-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 24px;
    }

    .skill-item {
      margin-bottom: 28px;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .skill-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .skill-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      color: white;
    }

    .skill-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 4px;
      color: white;
    }

    .skill-level {
      font-size: 14px;
      color: #94a3b8;
      margin: 0;
    }

    .skill-progress-text {
      font-size: 18px;
      font-weight: 600;
      color: white;
    }

    .progress-bar {
      height: 8px;
      background: #2d3548;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 4px;
      transition: width 0.5s ease;
    }

    .soft-skills {
      display: grid;
      gap: 16px;
    }

    .soft-skill-card {
      background: #2d3548;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #374151;
    }

    .soft-skill-card h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px;
      color: white;
    }

    .soft-skill-card p {
      font-size: 14px;
      line-height: 1.5;
      color: #cbd5e1;
      margin: 0;
    }
  `]
})
export class SkillsComponent {
  activeTab: 'technical' | 'soft' = 'technical';

  programmingLanguages: Skill[] = [
    { name: 'Python', level: 'Advanced', progress: 90, icon: 'python' },
    { name: 'JavaScript', level: 'Advanced', progress: 85, icon: 'js' }
  ];

  frameworks: Skill[] = [
    { name: 'React', level: 'Advanced', progress: 80, icon: 'react' },
    { name: 'Node.js', level: 'Intermediate', progress: 70, icon: 'node' }
  ];

  designTools: Skill[] = [
    { name: 'Figma', level: 'Expert', progress: 95, icon: 'figma' }
  ];

  softSkills = [
    { name: 'Communication', description: 'Clear and effective verbal and written communication with team members and stakeholders.' },
    { name: 'Problem Solving', description: 'Analytical thinking and creative approaches to complex challenges.' },
    { name: 'Team Collaboration', description: 'Working effectively in cross-functional teams to achieve common goals.' },
    { name: 'Time Management', description: 'Prioritizing tasks and managing multiple projects efficiently.' }
  ];

  getFrameworkColor(icon: string): string {
    const colors: Record<string, string> = {
      'react': '#61dafb',
      'node': '#68a063'
    };
    return colors[icon] || '#3b82f6';
  }

  getFrameworkLabel(icon: string): string {
    const labels: Record<string, string> = {
      'react': 'JS',
      'node': 'N'
    };
    return labels[icon] || 'JS';
  }
}
