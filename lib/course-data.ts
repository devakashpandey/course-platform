import { CourseWithModules } from "./types";

// Extended course data with flat lessons (no modules)
export const courses: CourseWithModules[] = [
  {
    id: "intro-ai-bootcamp",
    title: "Introductory AI Bootcamp: 3 Hours!",
    description: "A fast-paced, hands-on workshop to master AI fundamentals and build your transition roadmap in just 3 hours.",
    level: "Beginner",
    duration: "3 Hours",
    price: "Free",
    image: "/ai_bootcamp_course_2_1770441642336.png",
    category: "beginner",
    features: [
      "Introduction to AI/ML concepts",
      "Hands-on coding exercises",
      "Industry career insights",
      "Certificate of completion"
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead"
    },
    lessons: [
      {
        id: "l1-what-is-ai",
        title: "What is Artificial Intelligence?",
        description: "Learn the fundamentals of AI, its history, and how it's transforming industries today.",
        videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
        duration: "15 min",
        order: 1,
        resources: [
          { title: "Introduction to AI PDF", url: "#" },
          { title: "AI History Cheat Sheet", url: "#" }
        ]
      },
      {
        id: "l2-ml-vs-ai",
        title: "Machine Learning vs AI",
        description: "Understand the difference between ML and AI, and when to use each approach.",
        videoUrl: "https://www.youtube.com/embed/4RixMPF4xis",
        duration: "15 min",
        order: 2,
        resources: [
          { title: "ML vs AI Comparison Chart", url: "#" }
        ]
      },
      {
        id: "l3-python-basics",
        title: "Python Basics for ML",
        description: "Quick refresher on Python concepts needed for machine learning.",
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
        duration: "20 min",
        order: 3
      },
      {
        id: "l4-build-model",
        title: "Building Your First Model",
        description: "Hands-on: Build a simple classification model step by step.",
        videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0",
        duration: "25 min",
        order: 4
      },
      {
        id: "l5-industry-apps",
        title: "AI in Industry",
        description: "See how AI is being used in healthcare, finance, retail, and more.",
        videoUrl: "https://www.youtube.com/embed/ad79nYk2keg",
        duration: "20 min",
        order: 5
      }
    ]
  },
  {
    id: "alpha-ml",
    title: "AlphaML: Classical Machine Learning",
    description: "Master the foundations of ML through a highly gamified 2-month program with projects and industry hackathons.",
    level: "Intermediate",
    duration: "8 Weeks",
    price: "₹24,999",
    image: "/classical_ml_course_2_1770441660073.png",
    category: "intermediate",
    features: [
      "Mathematics for ML",
      "Statistical ML fundamentals",
      "Hands-on projects",
      "Industry-grade hackathons",
      "Live mentorship sessions",
      "Career guidance"
    ],
    instructor: {
      name: "Kumar Shikhar",
      role: "ML Engineering Lead"
    },
    lessons: [
      {
        id: "l1-linear-algebra",
        title: "Linear Algebra Fundamentals",
        description: "Vectors, matrices, and linear transformations essential for ML.",
        videoUrl: "https://www.youtube.com/embed/fNk_zzaMoSs",
        duration: "45 min",
        order: 1,
        resources: [
          { title: "Linear Algebra Fundamentals PDF", url: "#" },
          { title: "Matrix Operations Cheat Sheet", url: "#" }
        ]
      },
      {
        id: "l2-calculus",
        title: "Calculus for Optimization",
        description: "Derivatives, gradients, and optimization concepts.",
        videoUrl: "https://www.youtube.com/embed/WUvTyaaNkzM",
        duration: "40 min",
        order: 2,
        resources: [
          { title: "Calculus for ML Notes", url: "#" }
        ]
      },
      {
        id: "l3-probability",
        title: "Probability Theory",
        description: "Understanding probability distributions and Bayes theorem.",
        videoUrl: "https://www.youtube.com/embed/uzkc-qNVoOk",
        duration: "35 min",
        order: 3
      },
      {
        id: "l4-statistics",
        title: "Statistical Inference",
        description: "Hypothesis testing and confidence intervals.",
        videoUrl: "https://www.youtube.com/embed/SzZ6GpcfoQY",
        duration: "40 min",
        order: 4
      },
      {
        id: "l5-logistic",
        title: "Logistic Regression",
        description: "Deep dive into logistic regression for classification.",
        videoUrl: "https://www.youtube.com/embed/yIYKR4sgzI8",
        duration: "50 min",
        order: 5
      },
      {
        id: "l6-svm",
        title: "Support Vector Machines",
        description: "Understanding SVM and kernel methods.",
        videoUrl: "https://www.youtube.com/embed/efR1C6CvhmE",
        duration: "55 min",
        order: 6
      },
      {
        id: "l7-decision-trees",
        title: "Decision Trees",
        description: "Building and understanding decision tree classifiers.",
        videoUrl: "https://www.youtube.com/embed/_L39rN6gz7Y",
        duration: "45 min",
        order: 7
      },
      {
        id: "l8-random-forest",
        title: "Random Forests",
        description: "Ensemble methods with random forests.",
        videoUrl: "https://www.youtube.com/embed/J4Wdy0Wc_xQ",
        duration: "50 min",
        order: 8
      }
    ]
  },
  {
    id: "sigma-ml",
    title: "SigmaML: Deep Learning & AI",
    description: "A comprehensive 12-week deep dive into Computer Vision and NLP using our unique experiential learning format.",
    level: "Advanced",
    duration: "12 Weeks",
    price: "₹39,999",
    image: "/deep_learning_course_1770441585343.png",
    category: "advanced",
    features: [
      "Deep Neural Networks",
      "Computer Vision mastery",
      "NLP & Transformers",
      "Real-world AI projects",
      "1:1 Mentorship",
      "Job placement support"
    ],
    instructor: {
      name: "Dr. Priya Sharma",
      role: "Deep Learning Researcher"
    },
    lessons: [
      {
        id: "l1-perceptron",
        title: "Perceptron & Activation Functions",
        description: "Understanding the building blocks of neural networks.",
        videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
        duration: "60 min",
        order: 1
      },
      {
        id: "l2-backprop",
        title: "Backpropagation",
        description: "How neural networks learn through backpropagation.",
        videoUrl: "https://www.youtube.com/embed/Ilg3gGewQ5U",
        duration: "55 min",
        order: 2
      },
      {
        id: "l3-conv-layers",
        title: "Convolution & Pooling",
        description: "Understanding convolution operations and pooling layers.",
        videoUrl: "https://www.youtube.com/embed/KuXjwB4LzSA",
        duration: "50 min",
        order: 3
      },
      {
        id: "l4-image-classification",
        title: "Image Classification",
        description: "Building image classifiers with CNNs.",
        videoUrl: "https://www.youtube.com/embed/2-Ol7ZB0MmU",
        duration: "65 min",
        order: 4
      },
      {
        id: "l5-attention",
        title: "Attention Mechanism",
        description: "Deep dive into attention and self-attention.",
        videoUrl: "https://www.youtube.com/embed/iDulhoQ2pro",
        duration: "70 min",
        order: 5
      },
      {
        id: "l6-transformer-arch",
        title: "Transformer Architecture",
        description: "Understanding the transformer architecture.",
        videoUrl: "https://www.youtube.com/embed/FWFA4DGuzSc",
        duration: "75 min",
        order: 6
      }
    ]
  },
  {
    id: "generative-ai",
    title: "Generative AI Masterclass",
    description: "Unlock the power of GANs, Diffusion Models, and LLMs to create state-of-the-art AI applications.",
    level: "Advanced",
    duration: "6 Weeks",
    price: "₹29,999",
    image: "/generative_ai_course_1770441602368.png",
    category: "advanced",
    features: [
      "Generative Adversarial Networks",
      "Diffusion Models",
      "Large Language Models",
      "Prompt Engineering",
      "AI Art & Content Generation",
      "Hands-on projects"
    ],
    instructor: {
      name: "Vikram Singh",
      role: "GenAI Specialist"
    },
    lessons: [
      {
        id: "l1-gen-models",
        title: "What are Generative Models?",
        description: "Overview of generative models and their applications.",
        videoUrl: "https://www.youtube.com/embed/AIexMZJEMHE",
        duration: "40 min",
        order: 1
      },
      {
        id: "l2-latent-space",
        title: "Understanding Latent Space",
        description: "Exploring the concept of latent space in generative models.",
        videoUrl: "https://www.youtube.com/embed/dCKbRCUyop8",
        duration: "35 min",
        order: 2
      },
      {
        id: "l3-gan-basics",
        title: "GAN Fundamentals",
        description: "Understanding the generator-discriminator architecture.",
        videoUrl: "https://www.youtube.com/embed/8L11aMN5KY8",
        duration: "55 min",
        order: 3
      },
      {
        id: "l4-dcgan",
        title: "Deep Convolutional GANs",
        description: "Building DCGANs for image generation.",
        videoUrl: "https://www.youtube.com/embed/EYrt7fGyA08",
        duration: "60 min",
        order: 4
      },
      {
        id: "l5-llm-intro",
        title: "Introduction to LLMs",
        description: "Understanding how large language models work.",
        videoUrl: "https://www.youtube.com/embed/zjkBMFhNj_g",
        duration: "50 min",
        order: 5
      },
      {
        id: "l6-prompt-engineering",
        title: "Prompt Engineering",
        description: "Master the art of crafting effective prompts.",
        videoUrl: "https://www.youtube.com/embed/1c9iyoVIwDs",
        duration: "45 min",
        order: 6
      }
    ]
  }
];

// Helper function to get course by ID
export function getCourseById(id: string): CourseWithModules | undefined {
  const staticCourse = courses.find(course => course.id === id);
  if (staticCourse) return staticCourse;

  // Check localStorage for custom courses
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem('coursehub_custom_courses');
    if (stored) {
      const customCourses = JSON.parse(stored);
      return customCourses.find((c: any) => c.id === id);
    }
  }
  return undefined;
}

// Helper function to get first lesson of a course
export function getFirstLesson(courseId: string) {
  const course = getCourseById(courseId);
  if (!course || !course.lessons.length) return null;
  
  return course.lessons.sort((a, b) => a.order - b.order)[0];
}

// Helper function to get lesson by ID
export function getLessonById(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (lesson) return { lesson };
  
  return null;
}

// Helper to get next lesson
export function getNextLesson(courseId: string, currentLessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  const allLessons = course.lessons.sort((a, b) => a.order - b.order);
  
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === allLessons.length - 1) return null;
  
  return allLessons[currentIndex + 1];
}

// Helper to get previous lesson
export function getPreviousLesson(courseId: string, currentLessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  const allLessons = course.lessons.sort((a, b) => a.order - b.order);
  
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex <= 0) return null;
  
  return allLessons[currentIndex - 1];
}

// Get total lessons count
export function getTotalLessons(courseId: string): number {
  const course = getCourseById(courseId);
  if (!course) return 0;
  return course.lessons.length;
}

// Blog Data
export const blogs = [
  {
    id: "cdel-learning-method",
    title: "Why Curiosity Driven Effective Learning (CDEL) Is the Superior Method for Upskilling",
    excerpt: "Discover why Curiosity Driven Effective Learning (CDEL) is revolutionizing machine learning upskilling to foster deeper understanding and long-term retention.",
    content: `
## Introduction

As working professionals look to upskill in machine learning (ML) and prepare for technical interviews, the traditional learning methods—passive lectures, rote memorization, and endless note-taking—often fall short. These outdated methods rarely engage learners or promote long-term retention.

## What is Curiosity Driven Effective Learning (CDEL)?

Curiosity Driven Effective Learning (CDEL) is a learner-centric approach built on the idea that intrinsic curiosity is the most powerful driver of learning. This method focuses on igniting curiosity through real-world problems, interactive case studies, and questions that engage the learner's deeper cognitive functions.

### Key Components of CDEL:

1. **Problem-First Learning**: Instead of theory first, we start with real problems
2. **Active Engagement**: Hands-on coding and experimentation
3. **Spaced Repetition**: Scientifically-proven memory techniques
4. **Peer Learning**: Collaborative problem-solving

## Why CDEL Works Better

Traditional learning methods have a retention rate of only 10-20% after a week. CDEL, with its active learning approach, boosts retention to 70-90%.

## Conclusion

By embracing curiosity-driven learning, you're not just memorizing concepts—you're building a deep, intuitive understanding that lasts.
    `,
    author: {
      name: "Admin"
    },
    category: "Learning",
    image: "/blogs/cdel.png"
  },
  {
    id: "model-explainability",
    title: "Understanding the 'Why': A Practical Guide to Model Explainability",
    excerpt: "Ever wondered why your AI model makes certain predictions? This guide demystifies model explainability—helping you uncover both local and global insights.",
    content: `
## Introduction

Machine learning models are often called "black boxes" because their decision-making process is opaque. Model explainability aims to open this black box.

## What is Model Explainability?

Model explainability refers to the ability to understand and interpret how a machine learning model makes its predictions.

### Types of Explainability

1. **Local Explainability**: Understanding individual predictions
2. **Global Explainability**: Understanding overall model behavior

## Popular Techniques

### LIME (Local Interpretable Model-agnostic Explanations)
LIME works by perturbing input data and observing how predictions change.

### SHAP (SHapley Additive exPlanations)
SHAP values provide a unified measure of feature importance.

### Grad-CAM
For computer vision models, Grad-CAM shows which parts of an image influenced the prediction.

## Best Practices

1. Always validate explanations with domain experts
2. Use multiple techniques for comprehensive understanding
3. Document your explainability approach

## Conclusion

Explainability is not just a nice-to-have—it's essential for building trustworthy AI systems.
    `,
    author: {
      name: "Admin"
    },
    category: "AI/ML",
    image: "/blogs/explainability.png"
  },
  {
    id: "ai-platforms-2025",
    title: "AI Learning Platforms in 2025: A Competitive Landscape",
    excerpt: "An in-depth analysis of the top AI learning platforms and how to choose the right one for your career goals.",
    content: `
## The AI Education Boom

The demand for AI skills has never been higher. As a result, dozens of platforms have emerged to meet this demand.

## Key Factors to Consider

### 1. Curriculum Quality
Look for platforms that offer:
- Up-to-date content
- Industry-relevant projects
- Strong theoretical foundations

### 2. Learning Format
- Self-paced vs. cohort-based
- Video lectures vs. interactive coding
- Individual vs. collaborative learning

### 3. Mentorship & Support
- Access to industry experts
- 1:1 guidance
- Community support

## Top Platforms Compared

| Platform | Best For | Price Range |
|----------|----------|-------------|
| Coursera | Certificates | $-$$ |
| Udacity | Nanodegrees | $$-$$$ |
| Fast.ai | Practical Skills | Free |
| 123 of AI | Experiential Learning | $$ |

## Conclusion

Choose a platform that matches your learning style and career goals.
    `,
    author: {
      name: "Admin"
    },
    category: "Industry",
    image: "/blogs/platforms.png"
  },
  {
    id: "linear-algebra-applications",
    title: "Linear Algebra's Applications in Real Life",
    excerpt: "Discover how linear algebra powers real-world solutions in economics, cryptography, data science, and more!",
    content: `
## Why Linear Algebra Matters

Linear algebra is the backbone of machine learning, computer graphics, and many scientific computations.

## Real-World Applications

### 1. Machine Learning
- Feature transformations
- Dimensionality reduction (PCA)
- Neural network computations

### 2. Computer Graphics
- 3D transformations
- Image processing
- Game development

### 3. Data Compression
- Image compression (JPEG)
- Video streaming
- File storage optimization

### 4. Cryptography
- Encryption algorithms
- Secure communications
- Digital signatures

### 5. Economics
- Input-output models
- Portfolio optimization
- Risk analysis

## Getting Started

The best way to learn linear algebra is through practice. Start with:
1. Basic matrix operations
2. Vector spaces
3. Eigenvalues and eigenvectors

## Conclusion

Linear algebra is everywhere—mastering it opens doors to countless applications.
    `,
    author: {
      name: "Admin"
    },
    category: "Mathematics",
    image: "/blogs/linear-algebra.png"
  },
  {
    id: "model-selection-guide",
    title: "Model Selection: How to Choose the Right Algorithm",
    excerpt: "Master the art of model selection to supercharge your machine-learning projects! Discover top strategies to pick the perfect model.",
    content: `
## The Challenge of Model Selection

With dozens of algorithms available, choosing the right one can be overwhelming.

## Key Considerations

### 1. Problem Type
- Classification vs. Regression
- Supervised vs. Unsupervised
- Time series vs. Static data

### 2. Data Characteristics
- Dataset size
- Feature types
- Missing values
- Class imbalance

### 3. Performance Requirements
- Accuracy vs. interpretability
- Training time constraints
- Inference speed requirements

## Decision Framework

### For Small Datasets (<1000 samples)
- Start with simpler models
- Random Forest, SVM, or Logistic Regression

### For Large Datasets (>10,000 samples)
- Consider deep learning
- Gradient boosting methods

### For High Interpretability
- Decision Trees
- Linear/Logistic Regression
- SHAP + any model

## Cross-Validation is Key

Always use proper cross-validation:
1. K-Fold for general cases
2. Stratified K-Fold for imbalanced data
3. Time series split for temporal data

## Conclusion

Model selection is as much art as science—experiment, validate, iterate.
    `,
    author: {
      name: "Admin"
    },
    category: "AI/ML",
    image: "/blogs/model-selection.png"
  },
  {
    id: "local-global-explainability",
    title: "Local vs. Global Explainability: Why Both Matter",
    excerpt: "Unlock AI transparency with tools like LIME and SHAP that deliver clear, personalized insights. Boost trust and innovation across industries.",
    content: `
## Understanding Explainability Levels

When interpreting ML models, we need both local and global perspectives.

## Local Explainability

Local explainability focuses on individual predictions:
- Why did the model predict X for this specific input?
- Which features were most influential?

### Tools for Local Explainability
- LIME
- SHAP (local values)
- Counterfactual explanations

## Global Explainability

Global explainability looks at overall model behavior:
- Which features are generally important?
- How do features interact?

### Tools for Global Explainability
- Feature importance
- Partial dependence plots
- SHAP summary plots

## When to Use Each

| Scenario | Approach |
|----------|----------|
| Debugging a specific prediction | Local |
| Understanding model behavior | Global |
| Regulatory compliance | Both |
| Model improvement | Global first, then local |

## Best Practices

1. Start with global understanding
2. Drill down to local for edge cases
3. Combine multiple techniques
4. Validate with domain experts

## Conclusion

Both local and global explainability are essential for trustworthy AI.
    `,
    author: {
      name: "Admin"
    },
    category: "AI/ML",
    image: "/blogs/local-global-xai.png"
  }
];

// Helper function to get blog by ID
export function getBlogById(id: string) {
  const staticBlog = blogs.find(blog => blog.id === id);
  if (staticBlog) return staticBlog;

  // Check localStorage for custom blogs
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem('coursehub_custom_blogs');
    if (stored) {
      const customBlogs = JSON.parse(stored);
      return customBlogs.find((b: any) => b.id === id);
    }
  }
  return undefined;
}

// Team Data
export const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    image: "/team/sarah.jpg",
    bio: "Ph.D. from Stanford's AI Lab. Former ML Lead at Google Brain. Passionate about democratizing AI education.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Arjun Patel",
    role: "Head of Curriculum",
    image: "/team/arjun.jpg",
    bio: "Ex-Google ML Engineer. IIT Delhi alumnus. Built ML systems serving billions of users.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Dr. Priya Sharma",
    role: "Research Director",
    image: "/team/priya.jpg",
    bio: "Ph.D. from MIT. Published 50+ papers in top AI conferences. Expert in deep learning and NLP.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Vikram Singh",
    role: "Technical Lead",
    image: "/team/vikram.jpg",
    bio: "Ex-OpenAI engineer. Specializes in generative AI and large language models.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
];

// Features Data
export const features = [
  {
    title: "Accomplished Mentors",
    description: "Learn from mentors hailing from Ivy League Universities, big-tech and high-functioning startups who create real-world AI systems!",
    icon: "GraduationCap"
  },
  {
    title: "Gamified Experiential Learning",
    description: "Build real problem-solving skills with hands-on assignments, hackathons, and industry-grade projects in our special gamified format!",
    icon: "Gamepad2"
  },
  {
    title: "Tight-knit Community",
    description: "Join students from across the globe, from freshers to senior management. We nurture a strong interactive community in our cohorts!",
    icon: "Users"
  },
  {
    title: "Personalized Mentorship",
    description: "Get doubt-solving sessions and strategy calls. Our team is available round the clock to support you in your learning journey!",
    icon: "HeartHandshake"
  }
];

// Testimonials Data
export const testimonials = [
  {
    name: "Rahul Verma",
    role: "Data Scientist at Amazon",
    image: "/testimonials/rahul.jpg",
    content: "The gamified learning approach made complex ML concepts easy to grasp. I landed my dream job within 3 months of completing the program!"
  },
  {
    name: "Sneha Gupta",
    role: "ML Engineer at Microsoft",
    image: "/testimonials/sneha.jpg",
    content: "The mentorship and community support were incredible. The hands-on projects gave me real-world experience that impressed my interviewers."
  },
  {
    name: "Amit Kumar",
    role: "AI Researcher at DeepMind",
    image: "/testimonials/amit.jpg",
    content: "This platform transformed my career from a traditional software developer to an AI researcher. The curriculum is world-class!"
  },
  {
    name: "Priya Reddy",
    role: "Senior Data Analyst at Google",
    image: "/testimonials/priya.jpg",
    content: "The CDEL methodology really works! I retain concepts much better than from other courses I've taken. Highly recommended!"
  }
];

// FAQ Data
export const faqs = [
  {
    question: "Are there discounts for university students?",
    answer: "From time to time, we run discounts for university students for our longer programs. To avail the discount, send us an email with a valid college ID (correct expiry date mentioned), and we'll send you the coupon code!"
  },
  {
    question: "What are the available payment methods?",
    answer: "International candidates (outside India) can pay via Cards. Resident Indian candidates can pay via Cards, UPI, Netbanking, EMI, etc. (as prescribed by our payment partners)."
  },
  {
    question: "I have made the payment, but haven't received any access yet.",
    answer: "Don't worry. Sometimes, there can be delays in processing payments/failed transactions. Drop us an email with a screenshot of your payment receipt, registered name, and phone number. Our team will look into it."
  },
  {
    question: "Where will I receive further details after enrolling?",
    answer: "You'll receive an invite to our event-exclusive WhatsApp group, where all communication, zoom links, and resources shall be shared 12-24 hours prior to the start of the event."
  },
  {
    question: "Can I get a refund if the program doesn't suit me?",
    answer: "Yes, we offer a 7-day money-back guarantee for all our paid programs. If you're not satisfied, just email us within 7 days of enrollment for a full refund."
  },
  {
    question: "Do I need prior coding experience?",
    answer: "For our beginner programs, no prior experience is needed. For intermediate and advanced programs, basic Python knowledge is recommended."
  }
];
