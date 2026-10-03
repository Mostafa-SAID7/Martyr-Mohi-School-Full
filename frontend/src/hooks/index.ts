// Export all hooks from this module
export * from "./useCourses";
export * from "./useAssignments";
export * from "./useProfiles";
export * from "./useEnrollments";

// Export UI hooks (from nested directory - should be consolidated)
export { useIsMobile } from "./hooks/use-mobile";
export { useToast, type Toast, type ToastActionElement } from "./hooks/use-toast";
export { useUserRole } from "./hooks/useUserRole";

