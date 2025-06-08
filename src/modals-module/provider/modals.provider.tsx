import React from "react";
import { observer } from "mobx-react-lite";

import { ModalsStore } from "../store";
import {
  ModalsProviderRegistryGuard,
  ModalsStoreRegistryGuard,
} from "src/modals-module/modals.types";
import { ModalProps } from "src/modals-module";

export interface IModalsProviderProps<ModalName extends string> {
  store: ModalsStore<ModalName, ModalsStoreRegistryGuard<ModalName>>;
  providerRegistry: ModalsProviderRegistryGuard<ModalName>;
}

export const ModalsProvider: React.FC = observer(
  <ModalName extends string>({ store, providerRegistry }: IModalsProviderProps<ModalName>) => {
    return (
      <>
        {Object.entries(store.registry).map(([name, props]) => {
          const ModalComponent = providerRegistry[name as ModalName] as React.FC<IModalProps>;

          return (
            <ModalComponent
              key={name}
              {...(props as ModalProps)}
              isOpen
              onClose={() => store.close(name as ModalName)}
            />
          );
        })}
      </>
    );
  },
);
