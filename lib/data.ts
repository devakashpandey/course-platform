// Course Data
export const courses = [
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
    }
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
    }
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
    }
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
    }
  }
];

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
