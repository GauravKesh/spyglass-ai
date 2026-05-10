userCompany: {
  type: {
    name: String,

    website: String,

    tagline: String,

    description: String,

    positioning: String,

    targetAudience: String,

    pricing: String,

    features: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    differentiators: {
      type: [String],
      default: [],
    },

    competitors: {
      type: [String],
      default: [],
    },

    techStack: {
      type: [String],
      default: [],
    },

    integrations: {
      type: [String],
      default: [],
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    pricingTiers: {
      type: [
        {
          name: String,
          price: String,
          features: [String],
        },
      ],
      default: [],
    },

    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
      discord: String,
    },

    metrics: {
      monthlyTraffic: Number,
      mrr: Number,
      arr: Number,
      customers: Number,
      growthRate: Number,
    },

    branding: {
      logo: String,
      primaryColor: String,
      secondaryColor: String,
    },

    aiSummary: String,

    rawData: {
      type:
        mongoose.Schema.Types.Mixed,
      default: {},
    },
  },

  default: {},
},