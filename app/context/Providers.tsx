"use client";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
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
import { queryClient } from "./TanstackQueryClient";

export default function Provider({
  children,
  serverUser,
}: {
  serverUser: User | null;
  children: ReactNode;
}) {
  const dehydratedState = dehydrate(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
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
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
