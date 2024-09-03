import { Context } from 'hono';

export class Logger {
  private apiKey: string;
  private sourceId: string;

  constructor(apiKey: string, sourceId: string) {
    this.apiKey = apiKey;
    this.sourceId = sourceId;
  }

  async sendLog(ctx: Context, logData: Record<string, any>): Promise<void> {
    try {
      const response = await fetch(`https://api.logflare.app/logs?api_key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: this.sourceId,
          log_entry: JSON.stringify(logData),
        }),
      });

      if (!response.ok) {
        console.error(`Failed to send log to Logflare: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send log to Logflare:', error);
    }
  }
}