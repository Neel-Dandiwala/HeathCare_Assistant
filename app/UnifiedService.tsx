// services/unifiedService.ts
import { UnifiedTo } from "@unified-api/typescript-sdk";

interface StorageFile {
  id?: string;
  name?: string;
  content?: string;
  raw?: string;
}

export class UnifiedService {
  private sdk: UnifiedTo;
  private readonly connectionId = "6747482769e9340ef8308d2f";
  
  constructor(apiKey: string) {
    this.sdk = new UnifiedTo({
      security: {
        jwt: apiKey,
      },
    });
  }

  async getHealthKnowledgeBase() {
    try {
      // First, list files to get the file ID
      const listResult = await this.sdk.storage.listStorageFiles({
        connectionId: this.connectionId,
        query: "health-knowledge-base.md",
        fields: ['id','raw']
      });

      if (!listResult?.length) {
        throw new Error('Health knowledge base file not found');
      }

      const fileId = listResult[0].id;

      // Get the specific file
      const result = await this.sdk.storage.getStorageFile({
        connectionId: this.connectionId,
        id: fileId!
      });

      if (result) {
        // Check if we have the raw content
        if (!result.raw) {
          throw new Error('File content is empty');
        }

        // Parse markdown content
        return this.parseMarkdownContent(result.raw?.content || '');
      }
      
      throw new Error(`Failed to fetch health knowledge base`);
    } catch (err) {
      if (err) {
        console.error('Validation error:', (err as any).pretty());
        console.error('Raw value:', (err as any).rawValue);
        throw new Error('Failed to validate request to Unified API');
      }

      // Re-throw the error with more context
      throw new Error(
        err instanceof Error 
          ? `Error fetching health knowledge base: ${err.message}`
          : 'Unknown error occurred while fetching health knowledge base'
      );
    }
  }

  private parseMarkdownContent(content: string): string {
    // Remove any potential BOM characters
    content = content.replace(/^\uFEFF/, '');
    
    // Basic sanitization
    content = content
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\u0000/g, '') // Remove null characters
      .trim();

    return content;
  }
}

// Initialize the service with error handling
export const initializeUnifiedService = () => {
  const apiKey = process.env.NEXT_PUBLIC_UNIFIED_API_KEY;
  if (!apiKey) {
    throw new Error('Unified API key is not configured');
  }
  
  return new UnifiedService(apiKey);
};