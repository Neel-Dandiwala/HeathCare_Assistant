// services/unifiedService.ts
import { UnifiedTo } from "@unified-api/typescript-sdk";

export class UnifiedService {
  private sdk: UnifiedTo;
  
  constructor(apiKey: string) {
    this.sdk = new UnifiedTo({
      security: {
        jwt: process.env.NEXT_PUBLIC_UNIFIED_API_KEY as string,
      },
    });
  }
}

// Initialize the service
export const initializeUnifiedService = () => {
  const apiKey = process.env.NEXT_PUBLIC_UNIFIED_API_KEY;
  if (!apiKey) {
    throw new Error('Unified API key is not configured');
  }
  
  return new UnifiedService(apiKey);
};