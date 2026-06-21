import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-container">
      <header class="page-header">
        <button class="back-button" routerLink="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>About Me</h1>
        <button class="share-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
      </header>

      <div class="content">
        <div class="profile-section">
          <div class="profile-image">
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" alt="Alex Doe">
          </div>
          <h2 class="name">Alex Doe</h2>
          <p class="title">UX Designer & Student</p>
          <p class="bio">Passionate about creating intuitive and beautiful user experiences that solve real-world problems.</p>
        </div>

        <section class="section">
          <h2 class="section-title">Experience</h2>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <p class="period">MAY 2022 - PRESENT</p>
              <h3 class="job-title">Senior UX Designer</h3>
              <p class="company">Innovate Inc.</p>
              <p class="description">Led the redesign of the main dashboard, improving user engagement by 20%.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <p class="period">JUN 2020 - MAY 2022</p>
              <h3 class="job-title">UX/UI Designer</h3>
              <p class="company">Creative Solutions</p>
              <p class="description">Developed wireframes and prototypes for over 15+ mobile and web applications.</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">My Aspirations</h2>
          <div class="aspirations">
            <span class="aspiration-tag">Machine Learning</span>
            <span class="aspiration-tag">Public Speaking</span>
            <span class="aspiration-tag">Design Systems</span>
            <span class="aspiration-tag">Product Strategy</span>
            <span class="aspiration-tag">Accessibility</span>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Education</h2>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <p class="period">2018 - 2022</p>
              <h3 class="degree">B.Sc. in Human-Computer Interaction</h3>
              <p class="institution">University of Design & Technology</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <p class="period">2021</p>
              <h3 class="degree">Certified UX Professional</h3>
              <p class="institution">Design Institute</p>
            </div>
          </div>
        </section>

        <button class="contact-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Contact Me
        </button>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
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

    .back-button, .share-button {
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

    .back-button:hover, .share-button:hover {
      opacity: 0.7;
    }

    .content {
      padding: 0 24px;
    }

    .profile-section {
      text-align: center;
      padding: 24px 0 40px;
    }

    .profile-image {
      width: 160px;
      height: 160px;
      margin: 0 auto 20px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
      padding: 4px;
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px;
    }

    .title {
      font-size: 16px;
      color: #94a3b8;
      margin: 0 0 16px;
    }

    .bio {
      font-size: 15px;
      line-height: 1.5;
      color: #cbd5e1;
      max-width: 500px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 48px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 24px;
    }

    .timeline-item {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      position: relative;
    }

    .timeline-item:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 11px;
      top: 32px;
      bottom: -32px;
      width: 2px;
      background: #2d3548;
    }

    .timeline-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #3b82f6;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .timeline-content {
      flex: 1;
    }

    .period {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 8px;
      font-weight: 600;
    }

    .job-title, .degree {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 4px;
      color: white;
    }

    .company, .institution {
      font-size: 15px;
      color: #94a3b8;
      margin: 0 0 8px;
    }

    .description {
      font-size: 14px;
      line-height: 1.5;
      color: #cbd5e1;
      margin: 0;
    }

    .aspirations {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .aspiration-tag {
      padding: 10px 20px;
      background: #2d3548;
      border-radius: 8px;
      font-size: 14px;
      color: #cbd5e1;
      border: 1px solid #374151;
    }

    .contact-button {
      width: 100%;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;
      transition: all 0.3s ease;
    }

    .contact-button:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }
  `]
})
export class AboutComponent {}
