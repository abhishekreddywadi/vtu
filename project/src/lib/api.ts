import axios from "axios";
import { RevaluationRequest, Subject } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const fetchSubjects = async (): Promise<Subject[]> => {
  const { data } = await api.get("/subjects");
  return data;
};

export const createPaymentIntent = async (amount: number) => {
  const { data } = await api.post("/payment/create-intent", { amount });
  return data;
};

export const validateSubjects = async (subjects: Subject[]) => {
  const { data } = await api.post("/subjects/validate", { subjects });
  return data;
};

export const submitRevaluation = async (
  request: Omit<RevaluationRequest, "id" | "createdAt">
) => {
  const { data } = await api.post("/revaluation", request);
  return data;
};

export const fetchRevaluationStatus = async (requestId: string) => {
  const { data } = await api.get(`/revaluation/${requestId}/status`);
  return data;
};
