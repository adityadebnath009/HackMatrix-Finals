import { ApiResponse, HealthStatus } from '@/contracts/api-contracts';

/**
 * Mock Data Store
 * Matches exact backend response structures for 100% out-of-the-box frontend interactivity.
 */
export const mockHealthStatus: ApiResponse<HealthStatus> = {
  success: true,
  message: 'Backend service is operational (Mock Adapter Active).',
  data: {
    status: 'healthy',
    app: 'HackMatrix API (Mock)',
    environment: 'development',
    database: 'configured',
    timestamp: new Date().toISOString(),
  },
};
