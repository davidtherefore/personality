export interface Question {
  id: string
  text: string
  section: "thinking" | "feeling" | "sensing" | "intuiting"
}

export interface AssessmentResponse {
  questionId: string
  score: number
}

export interface SectionScore {
  section: string
  score: number
  percentage: number
}

export interface AssessmentResult {
  responses: AssessmentResponse[]
  sectionScores: SectionScore[]
  dominantStyle: string
  completionDate: string
  userName?: string
}

export const assessmentQuestions: Question[] = [
  // THINKING Section (15 questions)
  { id: "T1", text: "I prefer to analyze problems logically before making decisions", section: "thinking" },
  { id: "T2", text: "I enjoy working with data and statistics to solve problems", section: "thinking" },
  { id: "T3", text: "I like to understand the underlying principles behind concepts", section: "thinking" },
  { id: "T4", text: "I prefer structured, systematic approaches to tasks", section: "thinking" },
  { id: "T5", text: "I value objectivity and impartiality in decision-making", section: "thinking" },
  { id: "T6", text: "I enjoy debating ideas and challenging assumptions", section: "thinking" },
  { id: "T7", text: "I prefer to focus on facts rather than emotions when solving problems", section: "thinking" },
  { id: "T8", text: "I like to create detailed plans before starting projects", section: "thinking" },
  { id: "T9", text: "I enjoy analyzing cause-and-effect relationships", section: "thinking" },
  { id: "T10", text: "I prefer clear, logical explanations over intuitive insights", section: "thinking" },
  { id: "T11", text: "I like to break down complex problems into smaller parts", section: "thinking" },
  { id: "T12", text: "I value efficiency and optimization in processes", section: "thinking" },
  { id: "T13", text: "I prefer to make decisions based on proven methods", section: "thinking" },
  { id: "T14", text: "I enjoy working with abstract concepts and theories", section: "thinking" },
  { id: "T15", text: "I like to evaluate options using criteria and metrics", section: "thinking" },

  // FEELING Section (15 questions)
  { id: "F1", text: "I consider how decisions will affect people's feelings", section: "feeling" },
  { id: "F2", text: "I prefer collaborative approaches to problem-solving", section: "feeling" },
  { id: "F3", text: "I value harmony and consensus in group settings", section: "feeling" },
  { id: "F4", text: "I make decisions based on personal values and beliefs", section: "feeling" },
  { id: "F5", text: "I enjoy helping others develop their potential", section: "feeling" },
  { id: "F6", text: "I prefer to understand people's motivations and emotions", section: "feeling" },
  { id: "F7", text: "I value empathy and compassion in leadership", section: "feeling" },
  { id: "F8", text: "I like to create supportive, inclusive environments", section: "feeling" },
  { id: "F9", text: "I prefer to give feedback in a gentle, constructive way", section: "feeling" },
  { id: "F10", text: "I enjoy building strong personal relationships at work", section: "feeling" },
  { id: "F11", text: "I consider the human impact of organizational changes", section: "feeling" },
  { id: "F12", text: "I prefer to resolve conflicts through dialogue and understanding", section: "feeling" },
  { id: "F13", text: "I value authenticity and genuine connections", section: "feeling" },
  { id: "F14", text: "I like to celebrate team achievements and milestones", section: "feeling" },
  { id: "F15", text: "I prefer to make decisions that align with my personal values", section: "feeling" },

  // SENSING Section (15 questions)
  { id: "S1", text: "I prefer to focus on concrete, practical details", section: "sensing" },
  { id: "S2", text: "I like to work with tangible, measurable outcomes", section: "sensing" },
  { id: "S3", text: "I prefer step-by-step instructions and clear procedures", section: "sensing" },
  { id: "S4", text: "I value hands-on experience over theoretical knowledge", section: "sensing" },
  { id: "S5", text: "I like to see immediate, practical results from my work", section: "sensing" },
  { id: "S6", text: "I prefer to work with established methods and proven techniques", section: "sensing" },
  { id: "S7", text: "I enjoy organizing and maintaining systems and processes", section: "sensing" },
  { id: "S8", text: "I like to focus on present realities rather than future possibilities", section: "sensing" },
  { id: "S9", text: "I prefer detailed, specific information over general concepts", section: "sensing" },
  { id: "S10", text: "I value accuracy and precision in my work", section: "sensing" },
  { id: "S11", text: "I like to follow established timelines and deadlines", section: "sensing" },
  { id: "S12", text: "I prefer to learn through direct observation and practice", section: "sensing" },
  { id: "S13", text: "I enjoy working with tools, equipment, or physical materials", section: "sensing" },
  { id: "S14", text: "I like to maintain consistent routines and procedures", section: "sensing" },
  { id: "S15", text: "I prefer to make decisions based on past experience", section: "sensing" },

  // INTUITING Section (15 questions)
  { id: "I1", text: "I enjoy exploring new possibilities and innovative ideas", section: "intuiting" },
  { id: "I2", text: "I like to see the big picture and long-term vision", section: "intuiting" },
  { id: "I3", text: "I prefer to work on multiple projects simultaneously", section: "intuiting" },
  { id: "I4", text: "I enjoy brainstorming and generating creative solutions", section: "intuiting" },
  { id: "I5", text: "I like to anticipate future trends and opportunities", section: "intuiting" },
  { id: "I6", text: "I prefer flexible approaches that can adapt to change", section: "intuiting" },
  { id: "I7", text: "I enjoy working with abstract concepts and theories", section: "intuiting" },
  { id: "I8", text: "I like to challenge conventional thinking and methods", section: "intuiting" },
  { id: "I9", text: "I prefer to focus on potential rather than current limitations", section: "intuiting" },
  { id: "I10", text: "I enjoy connecting seemingly unrelated ideas and concepts", section: "intuiting" },
  { id: "I11", text: "I like to experiment with new approaches and methods", section: "intuiting" },
  { id: "I12", text: "I prefer to work in environments that encourage innovation", section: "intuiting" },
  { id: "I13", text: "I enjoy strategic planning and visionary thinking", section: "intuiting" },
  { id: "I14", text: "I like to inspire others with new ideas and possibilities", section: "intuiting" },
  { id: "I15", text: "I prefer to make decisions based on intuition and insight", section: "intuiting" },
]

export const sectionDescriptions = {
  thinking: {
    title: "Analytical Thinking",
    description: "Logical, systematic, and objective approach to problem-solving",
    color: "blue",
    icon: "Brain",
  },
  feeling: {
    title: "People-Focused",
    description: "Empathetic, collaborative, and values-driven decision making",
    color: "green",
    icon: "Heart",
  },
  sensing: {
    title: "Practical Implementation",
    description: "Detail-oriented, hands-on, and results-focused approach",
    color: "orange",
    icon: "Target",
  },
  intuiting: {
    title: "Innovative Vision",
    description: "Creative, future-oriented, and possibility-focused thinking",
    color: "purple",
    icon: "Lightbulb",
  },
}
