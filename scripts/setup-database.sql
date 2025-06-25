-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assessment_tokens table
CREATE TABLE IF NOT EXISTS assessment_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token_id INTEGER REFERENCES assessment_tokens(id),
    answers JSONB NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    report_generated BOOLEAN DEFAULT FALSE,
    report_sent BOOLEAN DEFAULT FALSE
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    read_time VARCHAR(50)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'cad',
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, featured, tags, read_time) VALUES
(
    'The Future of Professional Development in 2024',
    'future-professional-development-2024',
    'Explore the latest trends and technologies shaping how professionals grow their careers in the modern workplace.',
    'Professional development has evolved significantly over the past decade, and 2024 marks a pivotal year for how we approach career growth and skill development.',
    'Dr. Sarah Johnson',
    TRUE,
    ARRAY['Career Growth', 'Technology', 'Future of Work'],
    '5 min read'
),
(
    'Understanding Your Professional Strengths',
    'understanding-professional-strengths',
    'Learn how to identify and leverage your unique professional strengths for career advancement.',
    'Every professional has unique strengths that, when properly identified and leveraged, can become powerful drivers of career success.',
    'Michael Chen',
    FALSE,
    ARRAY['Self-Assessment', 'Strengths', 'Career Development'],
    '7 min read'
),
(
    'Building Effective Leadership Skills',
    'building-effective-leadership-skills',
    'Discover the key leadership skills that drive success in today''s dynamic business environment.',
    'Leadership is not just about managing people—it''s about inspiring, guiding, and empowering others to achieve their best.',
    'Dr. Sarah Johnson',
    FALSE,
    ARRAY['Leadership', 'Management', 'Skills Development'],
    '6 min read'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessment_tokens_token ON assessment_tokens(token);
CREATE INDEX IF NOT EXISTS idx_assessment_tokens_email ON assessment_tokens(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
