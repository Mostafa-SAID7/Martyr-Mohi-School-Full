// Export all custom hooks
export * from "./useCourses";
export * from "./useAssignments";
export * from "./useProfiles";
export * from "./useEnrollments";

// Export UI hooks
export { useIsMobile } from "./hooks/use-mobile";
export { useToast, toast } from "./hooks/use-toast";
export type { Toast, ToastActionElement } from "@/components/ui/toast";
export { useUserRole } from "./hooks/useUserRole";

