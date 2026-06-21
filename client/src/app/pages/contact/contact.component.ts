import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="contact-container">
      <header class="page-header">
        <button class="back-button" routerLink="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>Get in Touch</h1>
        <div style="width: 40px;"></div>
      </header>

      <div class="content">
        <div class="profile-section">
          <div class="profile-image">
            <img src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" alt="Jane Doe">
          </div>
          <h2 class="name">Jane Doe</h2>
          <p class="tagline">Have a question or want to work together? Drop me a line.</p>
        </div>

        <form class="contact-form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your name"
              [(ngModel)]="formData.fullName"
              name="fullName"
              required>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              [(ngModel)]="formData.email"
              name="email"
              required>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Inquiry about..."
              [(ngModel)]="formData.subject"
              name="subject"
              required>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              [(ngModel)]="formData.message"
              name="message"
              rows="5"
              required></textarea>
          </div>

          <button type="submit" class="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
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
      max-width: 600px;
      margin: 0 auto;
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
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 12px;
    }

    .tagline {
      font-size: 16px;
      line-height: 1.5;
      color: #94a3b8;
      margin: 0;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }

    .form-group input,
    .form-group textarea {
      background: #0f1419;
      border: 1px solid #2d3548;
      border-radius: 12px;
      padding: 14px 16px;
      font-size: 15px;
      color: white;
      outline: none;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: #64748b;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #3b82f6;
      background: #1a1f2e;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-button {
      width: 100%;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 8px;
    }

    .submit-button:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }

    .submit-button:active {
      transform: translateY(0);
    }
  `]
})
export class ContactComponent {
  formData = {
    fullName: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Thank you for your message! I will get back to you soon.');
    this.formData = {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
