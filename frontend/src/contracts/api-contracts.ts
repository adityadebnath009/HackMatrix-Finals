/**
 * HackMatrix Contract-First API Interfaces
 * Strict TypeScript contracts matching backend Pydantic schemas.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'offline';
  app: string;
  environment: string;
  database: 'configured' | 'unconfigured';
  timestamp: string;
}

// Domain-specific request & response contracts will be added here
// as soon as the hackathon problem statement is announced.
