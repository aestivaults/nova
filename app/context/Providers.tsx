"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import {
  GradientBackground,
  ParticlesBackground,
} from "../components/layout/overlay";
import Modal from "../components/ui/Modal";
import { ToastContainer } from "../components/ui/ToastContainer";
import { User } from "../types/user";
import AuthProvider from "./AuthContext";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function Provider({
  children,
  serverUser,
}: {
  serverUser: User | null;
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider serverUser={serverUser}>
        <ThemeProvider>
          <NotificationProvider>
            <Modal>
              <ParticlesBackground />
              <GradientBackground />
              {children}
            </Modal>
            <ToastContainer />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
