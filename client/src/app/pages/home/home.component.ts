import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="home-container">
      <div class="profile-section">
        <div class="profile-image">
          <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" alt="Sample profile picture">
        </div>

        <h1 class="name">Find your next role</h1>
        <p class="title">Search curated tech and design jobs</p>

        <p class="bio">
          This is an example job search experience for demonstration. Browse roles, filter by type, and view role details you can adapt to your own platform.
        </p>

        <div class="search-hero">
          <div class="search-field">
            <input
              class="search-input"
              placeholder="Job title, keyword (e.g., Frontend, UX)"
              [(ngModel)]="keyword"
              (input)="onKeywordInput()"
              (focus)="onKeywordInput()"
              (blur)="hideSuggestionsDelayed()" />
            <div class="suggestions" *ngIf="showSuggestions && filteredSuggestions.length">
              <button
                class="suggestion-item"
                *ngFor="let s of filteredSuggestions"
                type="button"
                (mousedown)="selectSuggestion(s)">
                {{ s }}
              </button>
            </div>
          </div>
          <input
            class="search-input"
            placeholder="Location (e.g., Remote, Berlin)"
            [(ngModel)]="location"
            (keyup.enter)="noop()" />
          <button class="cta-button search-btn" routerLink="/jobs">Search Jobs</button>
        </div>

        <div class="cta-row">
          <button class="cta-button" routerLink="/jobs">Browse Jobs</button>
          <button class="cta-button outline" routerLink="/skills">Job Categories</button>
        </div>

        <div class="quick-row">
          <div class="quick-chips">
            <span class="quick-label">Trending:</span>
            <button class="chip interactive" type="button" (click)="setKeyword('Frontend Engineer')">Frontend Engineer</button>
            <button class="chip interactive" type="button" (click)="setKeyword('Product Designer')">Product Designer</button>
            <button class="chip interactive" type="button" (click)="setKeyword('UX Researcher')">UX Researcher</button>
          </div>
          <div class="toggle">
            <label class="switch">
              <input type="checkbox" [(ngModel)]="remoteOnly" />
              <span class="slider"></span>
            </label>
            <span class="toggle-text">Remote only</span>
          </div>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">{{ displayedJobs }}</div>
            <div class="stat-label">open roles (example)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">new this week (example)</div>
          </div>
        </div>

        <div class="social-links">
          <a class="social-item" href="https://www.linkedin.com" target="_blank" rel="noopener">
            <div class="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <span>LinkedIn</span>
          </a>

          <a class="social-item" href="https://github.com" target="_blank" rel="noopener">
            <div class="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <span>GitHub</span>
          </a>

          <a class="social-item" href="https://dribbble.com" target="_blank" rel="noopener">
            <div class="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="2" x2="12" y2="9"></line>
                <line x1="12" y1="15" x2="12" y2="22"></line>
              </svg>
            </div>
            <span>Dribbble</span>
          </a>
        </div>
      </div>

      <section class="selected-work">
        <h2 class="section-heading">Selected Work (Examples)</h2>
        <div class="cards">
          <a class="card" routerLink="/jobs">
            <div class="thumb" style="background-image: url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop')"></div>
            <div class="card-body">
              <h3 class="card-title">Frontend Engineer</h3>
              <p class="card-text">Example role focusing on building accessible UI and performance.</p>
              <div class="chips">
                <span class="chip">Example</span>
                <span class="chip">Full-time</span>
              </div>
            </div>
          </a>
          <a class="card" routerLink="/jobs">
            <div class="thumb" style="background-image: url('https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop')"></div>
            <div class="card-body">
              <h3 class="card-title">Product Designer</h3>
              <p class="card-text">Example role emphasizing design systems and user research.</p>
              <div class="chips">
                <span class="chip">Example</span>
                <span class="chip">Remote</span>
              </div>
            </div>
          </a>
        </div>
        <div class="more-row">
          <a routerLink="/jobs" class="more-link">Browse all example jobs</a>
        </div>
      </section>

      <nav class="bottom-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </a>

        <a routerLink="/jobs" routerLinkActive="active" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Jobs</span>
        </a>

        <a routerLink="/contact" routerLinkActive="active" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Contact</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: #1a1f2e;
      color: white;
      padding: 60px 24px 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .profile-section {
      max-width: 600px;
      width: 100%;
      text-align: center;
    }

    .profile-image {
      width: 200px;
      height: 200px;
      margin: 0 auto 32px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 4px;
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-size: 42px;
      font-weight: 700;
      margin: 0 0 12px;
      color: white;
    }

    .title {
      font-size: 18px;
      color: #94a3b8;
      margin: 0 0 32px;
      font-weight: 400;
    }

    .bio {
      font-size: 16px;
      line-height: 1.6;
      color: #cbd5e1;
      margin: 0 0 40px;
    }

    .search-hero {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 12px;
      max-width: 720px;
      margin: 0 auto 16px;
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 12px;
      padding: 12px;
      align-items: center;
    }

    .search-field {
      position: relative;
    }

    .search-input {
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 10px;
      padding: 14px 12px;
      color: white;
      font-size: 15px;
      outline: none;
    }

    .search-input::placeholder {
      color: #64748b;
    }

    .search-hero .search-btn {
      height: 100%;
      min-height: 52px;
      padding: 0 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }

    .suggestions {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 6px);
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 10px;
      padding: 6px;
      display: grid;
      gap: 4px;
      z-index: 5;
    }

    .suggestion-item {
      text-align: left;
      background: transparent;
      color: #cbd5e1;
      border: none;
      padding: 10px 8px;
      border-radius: 8px;
      cursor: pointer;
    }

    .suggestion-item:hover {
      background: #1a2230;
    }

    .cta-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      max-width: 400px;
      margin: 0 auto;
    }

    .cta-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 16px 48px;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      max-width: none;
    }

    .cta-button:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }

    .cta-button.outline {
      background: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .cta-button.outline:hover {
      background: rgba(59, 130, 246, 0.1);
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 64px;
    }

    .social-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: transform 0.3s ease;
      text-decoration: none;
    }

    .social-item:hover {
      transform: translateY(-4px);
    }

    .social-icon {
      width: 64px;
      height: 64px;
      background: #2d3548;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      transition: all 0.3s ease;
    }

    .social-item:hover .social-icon {
      background: #374151;
      color: #3b82f6;
    }

    .social-item span {
      font-size: 14px;
      color: #94a3b8;
    }

    .selected-work {
      width: 100%;
      max-width: 960px;
      margin-top: 56px;
    }

    .quick-row {
      max-width: 720px;
      margin: 8px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .quick-chips {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .quick-label {
      color: #94a3b8;
      font-size: 14px;
    }

    .chip.interactive {
      cursor: pointer;
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #2d3548;
      transition: .2s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: #3b82f6;
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .stats {
      max-width: 720px;
      margin: 16px auto 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .stat-card {
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .stat-number {
      font-size: 28px;
      font-weight: 800;
    }

    .stat-label {
      color: #94a3b8;
      font-size: 13px;
    }

    .section-heading {
      font-size: 22px;
      font-weight: 700;
      margin: 0 0 16px;
    }

    .cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .card {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 16px;
      padding: 12px;
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 12px;
      color: inherit;
      text-decoration: none;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      border-color: #3b82f6;
    }

    .thumb {
      width: 120px;
      height: 90px;
      border-radius: 8px;
      background-size: cover;
      background-position: center;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 6px;
    }

    .card-text {
      font-size: 14px;
      color: #cbd5e1;
      margin: 0 0 8px;
    }

    .chips {
      display: flex;
      gap: 8px;
    }

    .chip {
      padding: 4px 10px;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 999px;
      font-size: 12px;
      color: #94a3b8;
    }

    .more-row {
      margin-top: 12px;
      text-align: right;
    }

    .more-link {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .search-hero {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .search-hero .search-btn {
        width: 100%;
        min-height: 48px;
      }

      .cta-row {
        grid-template-columns: 1fr;
        max-width: 100%;
      }

      .stats {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 540px) {
      .profile-section {
        text-align: left;
      }

      .name {
        font-size: 32px;
      }

      .search-hero {
        margin-left: 0;
        margin-right: 0;
      }

      .quick-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #1a1f2e;
      border-top: 1px solid #2d3548;
      display: flex;
      justify-content: space-around;
      padding: 12px 0;
      z-index: 100;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: #64748b;
      text-decoration: none;
      padding: 8px 24px;
      transition: color 0.3s ease;
      font-size: 14px;
    }

    .nav-item.active {
      color: #3b82f6;
    }

    .nav-item svg {
      width: 24px;
      height: 24px;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  keyword = '';
  location = '';
  remoteOnly = false;
  suggestions = [
    'Frontend Engineer',
    'Product Designer',
    'UX Researcher',
    'Data Visualization Engineer',
    'Mobile Developer',
    'Full-stack Engineer'
  ];
  filteredSuggestions: string[] = [];
  showSuggestions = false;
  displayedJobs = 0;
  private countTimer: any;
  private hideTimer: any;

  ngOnInit(): void {
    const target = 128;
    const steps = 20;
    const increment = Math.ceil(target / steps);
    this.countTimer = setInterval(() => {
      this.displayedJobs = Math.min(target, this.displayedJobs + increment);
      if (this.displayedJobs >= target) {
        clearInterval(this.countTimer);
      }
    }, 40);
  }

  ngOnDestroy(): void {
    if (this.countTimer) {
      clearInterval(this.countTimer);
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }

  onKeywordInput(): void {
    const q = this.keyword.trim().toLowerCase();
    this.filteredSuggestions = q
      ? this.suggestions.filter(s => s.toLowerCase().includes(q)).slice(0, 6)
      : this.suggestions.slice(0, 6);
    this.showSuggestions = true;
  }

  hideSuggestionsDelayed(): void {
    this.hideTimer = setTimeout(() => {
      this.showSuggestions = false;
    }, 150);
  }

  selectSuggestion(s: string): void {
    this.keyword = s;
    this.showSuggestions = false;
  }

  setKeyword(s: string): void {
    this.keyword = s;
    this.onKeywordInput();
  }

  noop(): void {}
}
