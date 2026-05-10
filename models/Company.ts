import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    productHunt: {
      type: {
        productId: String,
        slug: String,

        name: String,
        tagline: String,
        description: String,

        url: String,
        website: String,

        thumbnail: String,

        screenshots: {
          type: [String],
          default: [],
        },

        gallery: {
          type: [String],
          default: [],
        },

        votesCount: {
          type: Number,
          default: 0,
        },

        commentsCount: {
          type: Number,
          default: 0,
        },

        reviewsCount: {
          type: Number,
          default: 0,
        },

        rating: Number,

        rank: Number,

        pricing: String,

        topics: {
          type: [String],
          default: [],
        },

        badges: {
          type: [String],
          default: [],
        },

        makers: {
          type: [
            {
              name: String,
              username: String,
              profileUrl: String,
              avatar: String,
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
          revenueEstimate: Number,
          growthRate: Number,
        },

        launchDate: Date,
        featuredAt: Date,
        lastSyncedAt: Date,

        rawData: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
      },

      default: {},
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    summary: String,

    targetAudience: String,

    pricing: String,

    positioning: String,

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

    seoKeywords: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    rawMarkdown: String,
  },
  {
    timestamps: true,
  }
);

const Company =
  mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);

export default Company;