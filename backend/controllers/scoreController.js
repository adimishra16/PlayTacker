/**
 * Placeholder controller for scores.
 * Add your business logic later.
 */
export const getScores = async (req, res) => {
  res.json({ message: "Scores endpoint - implement business logic later." });
};

export const postScore = async (req, res) => {
  res.status(201).json({ message: "Score created (placeholder)." });
};
