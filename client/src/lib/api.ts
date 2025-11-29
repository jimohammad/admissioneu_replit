import { University } from '@shared/schema';

const API_BASE = '/api';

export async function fetchUniversities(): Promise<University[]> {
  try {
    const response = await fetch(`${API_BASE}/universities`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      throw new Error(`Failed to fetch universities: ${response.status}`);
    }
    const data = await response.json();
    console.log('Universities fetched:', data.length);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchUniversityById(id: number): Promise<University> {
  const response = await fetch(`${API_BASE}/universities/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch university');
  }
  return response.json();
}

export async function searchUniversities(query: string): Promise<University[]> {
  const response = await fetch(`${API_BASE}/universities/search/${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search universities');
  }
  return response.json();
}

export async function filterUniversities(filters: {
  region?: string;
  type?: string;
  domain?: string;
  englishPrograms?: boolean;
}): Promise<University[]> {
  const response = await fetch(`${API_BASE}/universities/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error('Failed to filter universities');
  }
  return response.json();
}
