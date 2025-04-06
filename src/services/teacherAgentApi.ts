import axios from 'axios';

// Define the API types
interface TeacherAgentRequest {
  session_id: string;
  message: string;
}

export interface TeacherAgentResponse {
  reply: string;
  session_id: string;
  current_stage: 'onboarding' | 'pedagogy' | 'journey_crafting' | 'teaching' | 'complete' | 'error';
  learning_plan_steps?: string[];
}

// Service to interact with the Teacher Agents API
export const teacherAgentApi = {
  /**
   * Send a message to the Teacher Agents API
   * @param sessionId Unique identifier for the conversation session
   * @param message The user's message text
   * @returns Promise with the agent's response
   */
  sendMessage: async (sessionId: string, message: string): Promise<TeacherAgentResponse> => {
    try {
      console.log('API Request to: /chat');
      console.log('Request payload:', { session_id: sessionId, message });
      
      const response = await axios.post<TeacherAgentResponse>('/chat', {
        session_id: sessionId,
        message
      });
      
      console.log('API Response status:', response.status);
      console.log('API Response data:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('Error sending message to Teacher Agent:');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },

  /**
   * Check the health of the API
   * @returns Promise with health check result
   */
  checkHealth: async (): Promise<{ status: string }> => {
    try {
      console.log('Health check request to: /health');
      
      const response = await axios.get<{ status: string }>('/health');
      
      console.log('Health check response status:', response.status);
      console.log('Health check response data:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('Error checking Teacher Agent API health:');
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  }
};

export default teacherAgentApi; 