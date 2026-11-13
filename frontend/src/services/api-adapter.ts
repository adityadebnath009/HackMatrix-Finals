import { ApiResponse, HealthStatus } from '@/contracts/api-contracts';
import { mockHealthStatus } from '@/mocks/mock-data';

function normalizeBaseUrl(url?: string): string {
  if (!url) return '/api';
  let cleaned = url.trim().replace(/\/+$/, '');
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://') && !cleaned.startsWith('/')) {
    cleaned = `https://${cleaned}`;
  }
  if (!cleaned.endsWith('/api') && !cleaned.startsWith('/api')) {
    cleaned = `${cleaned}/api`;
  }
  return cleaned;
}

const BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

class ApiAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetchWithFallback<T>(endpoint: string, mockData: ApiResponse<T>, options?: RequestInit): Promise<ApiResponse<T>> {
    if (USE_MOCKS) {
      console.warn(`[ApiAdapter] Running in explicit MOCK mode for: ${endpoint}`);
      return mockData;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...(options?.headers || {}),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      console.warn(`[ApiAdapter] Live request failed for ${endpoint}. Falling back to mock contract.`, error);
      return mockData;
    }
  }

  public async getHealth(): Promise<ApiResponse<HealthStatus>> {
    return this.fetchWithFallback<HealthStatus>('/health', mockHealthStatus);
  }
}

export const api = new ApiAdapter(BASE_URL);
