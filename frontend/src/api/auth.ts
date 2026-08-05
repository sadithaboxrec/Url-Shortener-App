import api from "@/api/client";

import type {
  AuthResponse,
  LoginRequest,
  LogoutResponse,
  RegisterRequest,
  User,
} from "@/types/auth";

export async function registerUser(
  request: RegisterRequest,
): Promise<User> {
  const response = await api.post<User>("/auth/signup", request);
  return response.data;
}

export async function loginUser(
  request: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    request,
  );

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User | { user: User }>("/auth/me");

  // Supports either:
  // { id, email, name }
  // or { user: { id, email, name } }
  if ("user" in response.data) {
    return response.data.user;
  }

  return response.data;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const response = await api.post<LogoutResponse>("/auth/logout");
  return response.data;
}