const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: string;
  category?: string;
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  url?: string;
  image?: string;
  techStack: string[];
  github?: string;
}

// Certificates API
export const getCertificates = async (): Promise<Certificate[]> => {
  const response = await fetch(`${API_BASE_URL}/certificates`);
  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }
  return response.json();
};

export const createCertificate = async (certificate: Omit<Certificate, '_id'>): Promise<Certificate> => {
  const response = await fetch(`${API_BASE_URL}/certificates`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(certificate),
  });
  if (!response.ok) {
    throw new Error('Failed to create certificate');
  }
  return response.json();
};

export const deleteCertificate = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/certificates/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete certificate');
  }
};

// Skills API
export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_BASE_URL}/skills`);
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  return response.json();
};

export const createSkill = async (skill: Omit<Skill, '_id'>): Promise<Skill> => {
  const response = await fetch(`${API_BASE_URL}/skills`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });
  if (!response.ok) {
    throw new Error('Failed to create skill');
  }
  return response.json();
};

export const deleteSkill = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete skill');
  }
};

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

export const createProject = async (project: Omit<Project, '_id'>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
};

export const deleteProject = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
}; 