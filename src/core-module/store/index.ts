import { organizationStore } from "./organization.store.ts";
import { projectStore } from "./project.store.ts";
import { modalsStore } from "./modals.store.ts";
import { boardStore } from "./board.store.ts";

export const useOrganizationStore = () => organizationStore;
export const useProjectStore = () => projectStore;
export const useModalsStore = () => modalsStore;
export const useBoardStore = () => boardStore;
