# AssessmentPro - Professional Self-Assessment Platform

A comprehensive Next.js application for professional self-assessment with Stripe integration, PDF report generation, and blog system.

## Features

- 🏠 **Landing Page** with product description and pricing
- 💳 **Stripe Checkout** integration for secure payments
- 📧 **Email-based Access** with secure assessment links
- 📝 **Assessment Form** with multiple-choice and Likert scale questions
- 📊 **PDF Report Generation** with charts and analysis
- 📰 **Blog/CMS System** with markdown support
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui
- 🔐 **Authentication & Authorization** for paying users
- 📱 **Responsive Design** for all devices
- 🔍 **SEO Optimized** with proper meta tags

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Supabase recommended)
- **Payments**: Stripe
- **Email**: Resend
- **PDF Generation**: Puppeteer
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Email service account (Resend recommended)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd assessment-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables in \`.env.local\`.

4. Set up the database:
\`\`\`bash
# Run the database setup script
psql -d your_database_url -f scripts/setup-database.sql
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`DATABASE_URL\` | PostgreSQL connection string | Yes |
| \`STRIPE_SECRET_KEY\` | Stripe secret key | Yes |
| \`STRIPE_PUBLISHABLE_KEY\` | Stripe publishable key | Yes |
| \`STRIPE_WEBHOOK_SECRET\` | Stripe webhook secret | Yes |
| \`RESEND_API_KEY\` | Resend API key for emails | Yes |
| \`NEXT_PUBLIC_BASE_URL\` | Base URL of your application | Yes |
| \`NEXTAUTH_SECRET\` | NextAuth secret key | Yes |

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add all required environment variables
4. Deploy!

The application will be automatically deployed with each push to your main branch.

### Database Setup

1. Create a PostgreSQL database (Supabase recommended)
2. Run the setup script: \`scripts/setup-database.sql\`
3. Update your \`DATABASE_URL\` environment variable

### Stripe Configuration

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up a webhook endpoint: \`/api/webhooks/stripe\`
4. Configure webhook events: \`checkout.session.completed\`

## Project Structure

\`\`\`
├── app/
│   ├── api/                 # API routes
│   ├── assessment/          # Assessment pages
│   ├── blog/               # Blog system
│   ├── checkout/           # Checkout page
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Custom components
├── scripts/
│   └── setup-database.sql  # Database setup
└── ...
\`\`\`

## Key Features Explained

### Payment Flow

1. User visits landing page
2. Clicks "Get Started" → Checkout page
3. Enters email and proceeds to Stripe
4. After successful payment, webhook creates assessment token
5. User receives email with secure assessment link

### Assessment Flow

1. User clicks assessment link with token
2. Token is verified against database
3. User completes 50-question assessment
4. Answers are submitted and stored
5. PDF report is generated and emailed

### Blog System

- Markdown-based content management
- SEO-optimized blog posts
- Featured posts and categories
- Responsive design

## Customization

### Adding Questions

Edit the questions array in \`app/assessment/[token]/page.tsx\`:

\`\`\`typescript
const questions = [
  {
    id: "1",
    text: "Your question here",
    type: "likert" | "multiple_choice",
    options: ["Option 1", "Option 2", ...],
    category: "Category Name"
  }
]
\`\`\`

### Styling

The application uses Tailwind CSS with shadcn/ui components. Customize:

- Colors in \`tailwind.config.ts\`
- Components in \`components/ui/\`
- Global styles in \`app/globals.css\`

### PDF Report Generation

Implement PDF generation in \`app/api/submit-assessment/route.ts\`:

\`\`\`typescript
import puppeteer from 'puppeteer'

async function generatePDF(answers) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Generate HTML content based on answers
  const html = generateReportHTML(answers)
  
  await page.setContent(html)
  const pdf = await page.pdf({ format: 'A4' })
  
  await browser.close()
  return pdf
}
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@assessmentpro.com or create an issue in the repository.
