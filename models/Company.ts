// models/Company.ts
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
      default: "",
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    pageType: {
      type: String,
      default: "",
    },

    links: {
      type: [
        {
          text: { type: String, default: "" },
          url: { type: String, default: "" },
        },
      ],
      default: [],
    },

    sections: {
      type: [
        {
          heading: { type: String, default: "" },
          content: { type: String, default: "" },
        },
      ],
      default: [],
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    rawMarkdown: {
      type: String,
      default: "",
    },

    aiRawData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

CompanySchema.index({ userId: 1, createdAt: -1 });
CompanySchema.index({ url: 1 });

// ← this delete forces Mongoose to re-register the model with the new schema
delete mongoose.models.Company;

const Company = mongoose.model("Company", CompanySchema);

export default Company;