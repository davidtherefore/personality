-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update blog_posts table with additional CMS fields
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES authors(id);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image_url VARCHAR(500);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image_alt VARCHAR(255);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS reading_time INTEGER;

-- Create post_tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create admin_users table for CMS authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO authors (name, email, bio) VALUES
('Dr. Sarah Chen', 'sarah.chen@example.com', 'Neuroscientist and leadership researcher at Stanford University'),
('Michael Rodriguez', 'michael.rodriguez@example.com', 'Organizational psychologist and workplace trends researcher'),
('Dr. Amanda Foster', 'amanda.foster@example.com', 'Leadership psychologist at the Center for Executive Development'),
('Dr. James Liu', 'james.liu@example.com', 'Organizational psychologist at Stanford Virtual Human Interaction Lab');

INSERT INTO categories (name, slug, description, color) VALUES
('Leadership', 'leadership', 'Articles about leadership development and psychology', '#8B5CF6'),
('Assessment', 'assessment', 'Personality assessment trends and methodologies', '#06B6D4'),
('Workplace Psychology', 'workplace-psychology', 'Psychology in professional environments', '#10B981'),
('Technology', 'technology', 'AI and technology in professional development', '#F59E0B'),
('Research', 'research', 'Latest research in personality and organizational psychology', '#EF4444');

INSERT INTO tags (name, slug) VALUES
('Neuroscience', 'neuroscience'),
('AI', 'ai'),
('Remote Work', 'remote-work'),
('Emotional Intelligence', 'emotional-intelligence'),
('Team Dynamics', 'team-dynamics'),
('Stress Management', 'stress-management'),
('Decision Making', 'decision-making'),
('Professional Development', 'professional-development');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag_id ON post_tags(tag_id);
