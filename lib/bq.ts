const isProd = ["prod", "production"].includes(
  (process.env.ENVIRONMENT ?? "").toLowerCase()
);

export const bqConfig = {
  gcpProject: isProd ? "team-researchops-prod-01d6" : "team-researchops-dev-4396",
  websiteId: isProd
    ? "8c9ebc0a-63d8-46b2-a34c-9378f809e595"
    : "034ed2f3-4fde-4f42-967d-4d607cd8b9f3",
} as const;

export type BqConfig = typeof bqConfig;
