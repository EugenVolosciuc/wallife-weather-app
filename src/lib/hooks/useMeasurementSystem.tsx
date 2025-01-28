"use client";

import { MeasurementSystem } from "@/types/misc";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

const MeasurementSystemContext = createContext<{
  measurementSystem: MeasurementSystem;
  setMeasurementSystem: Dispatch<SetStateAction<MeasurementSystem>>;
}>({ measurementSystem: "metric", setMeasurementSystem: () => null });

export const MeasurementSystemProvider: FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [measurementSystem, setMeasurementSystem] =
    useState<MeasurementSystem>("metric");

  return (
    <MeasurementSystemContext.Provider
      value={{ measurementSystem, setMeasurementSystem }}
    >
      {children}
    </MeasurementSystemContext.Provider>
  );
};

export const useMeasurementSystem = () => useContext(MeasurementSystemContext);
