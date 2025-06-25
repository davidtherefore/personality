import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Target,
  Heart,
  Users,
  FileText,
  Download,
  Star,
  Quote,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Award,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-75"></div>
              <div className="relative bg-white p-2 rounded-xl">
                <Brain className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              AssessmentPro
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#benefits" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
              Benefits
            </Link>
            <Link
              href="#how-it-works"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link href="/blog" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
              Blog
            </Link>
            <Button
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/assessment">
                <FileText className="w-4 h-4 mr-2" />
                Try Free Assessment
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-200/30 to-primary-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border-primary-200 px-4 py-2 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Professional Self-Assessment Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Unlock Your
            </span>
            <br />
            <span className="text-neutral-800">Professional Potential</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover how your brain drives your behavior with our comprehensive assessment. Get a detailed PDF report
            with personalized insights and actionable recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/assessment">
                <FileText className="w-5 h-5 mr-3" />
                Try Free Assessment
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-neutral-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-neutral-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-accent-500" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-secondary-500" />
              15-20 Minutes
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary-500" />
              Professional Grade
            </div>
          </div>
        </div>
      </section>

      {/* Why Take This Assessment Section */}
      <section id="benefits" className="py-20 px-4 bg-gradient-to-r from-neutral-50 to-primary-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800">Why Take This Assessment?</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Unlock deep insights into your personality, leadership style, and professional strengths with our
              scientifically-backed assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-primary-50/50 border-primary-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
                  Discover Your Brain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Understand how your brain drives your behavior, decision-making patterns, and natural responses to
                  challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-secondary-50/50 border-secondary-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-800 group-hover:text-secondary-600 transition-colors">
                  Improve Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Enhance your leadership effectiveness and learn how to make better decisions that align with your
                  natural strengths.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-accent-50/50 border-accent-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-800 group-hover:text-accent-600 transition-colors">
                  Emotional Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Strengthen your emotional intelligence and learn to navigate workplace relationships more effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-primary-50/50 border-primary-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
                  Understand Perceptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 text-center leading-relaxed">
                  Learn how others perceive your strengths and discover blind spots that may be limiting your potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800">How It Works</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get professional insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Take Assessment</h3>
              <p className="text-neutral-600 leading-relaxed">
                Complete our comprehensive 60-question assessment. It takes 15-20 minutes and covers thinking, feeling,
                sensing, and intuiting patterns.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Target className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Get Results</h3>
              <p className="text-neutral-600 leading-relaxed">
                Receive instant results showing your dominant style and supporting traits with detailed explanations and
                insights.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Download className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Download Report</h3>
              <p className="text-neutral-600 leading-relaxed">
                Get your detailed PDF report with charts, insights, and personalized recommendations for professional
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary-50/50 to-accent-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800">What Professionals Say</h2>
            <p className="text-xl text-neutral-600">Trusted by leaders and professionals worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary-400 mb-4" />
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "This assessment gave me incredible insights into my leadership style. The recommendations were
                  spot-on and actionable."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">Sarah Mitchell</p>
                    <p className="text-sm text-neutral-600">VP of Operations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-secondary-400 mb-4" />
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "The detailed PDF report helped me understand my blind spots and gave me a clear path for professional
                  development."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    JC
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">James Chen</p>
                    <p className="text-sm text-neutral-600">Team Lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-neutral-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-accent-400 mb-4" />
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "Quick, professional, and incredibly insightful. This assessment is worth every penny for career
                  growth."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    AR
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">Alex Rodriguez</p>
                    <p className="text-sm text-neutral-600">Project Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800">Latest Insights</h2>
            <p className="text-xl text-neutral-600">
              Expert articles on personality assessment and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary-400 to-secondary-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Leadership</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-neutral-800 group-hover:text-primary-600 transition-colors">
                  The Neuroscience Revolution in Leadership Assessment
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Discover how modern neuroscience is transforming the way we understand and develop leadership
                  capabilities.
                </p>
                <Link
                  href="/blog/neuroscience-leadership-assessment-2025"
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-secondary-400 to-accent-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">AI & Technology</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-neutral-800 group-hover:text-secondary-600 transition-colors">
                  The AI Revolution in Personality Assessment
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Explore how artificial intelligence is revolutionizing personality assessment and professional
                  development.
                </p>
                <Link
                  href="/blog/ai-personality-assessment-future-2025"
                  className="text-secondary-600 hover:text-secondary-700 font-semibold flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-accent-400 to-primary-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Emotional Intelligence</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-neutral-800 group-hover:text-accent-600 transition-colors">
                  Emotional Intelligence as Leadership Currency
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Learn why emotional intelligence has become the most valuable currency in modern leadership.
                </p>
                <Link
                  href="/blog/emotional-intelligence-leadership-2025"
                  className="text-accent-600 hover:text-accent-700 font-semibold flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-primary-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
            >
              <Link href="/blog">
                <BookOpen className="w-5 h-5 mr-2" />
                View All Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-50/50 to-secondary-50/50">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-neutral-200">
            <TrendingUp className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800">Stay Ahead of the Curve</h2>
            <p className="text-xl text-neutral-600 mb-8">
              Get the latest insights on professional development, leadership trends, and personality assessment
              delivered to your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-white p-2 rounded-xl">
                    <Brain className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <span className="text-xl font-bold">AssessmentPro</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Professional self-assessment platform helping individuals unlock their potential through science-backed
                insights.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>
                  <Link href="#benefits" className="hover:text-primary-400 transition-colors">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-primary-400 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary-400 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>
                  <Link href="/contact" className="hover:text-primary-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Connect</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-700 pt-8 text-center">
            <p className="text-neutral-400">
              &copy; 2024 AssessmentPro. All rights reserved. Made with ❤️ for professional growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
