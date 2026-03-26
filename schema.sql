-- Database: codeflow

CREATE TABLE IF NOT EXISTS puzzles (
  id          VARCHAR(255) PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty  ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  category    VARCHAR(100),
  instructions JSON,
  hints       JSON,
  initial_nodes JSON NOT NULL,
  initial_edges JSON NOT NULL,
  locked_nodes JSON,
  expected_output VARCHAR(500),
  validation_fn TEXT,
  is_custom   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
