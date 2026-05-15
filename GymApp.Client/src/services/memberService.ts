import axios from "axios";
import type { Member, CreateMember } from "../types/member";

const API_URL = "http://localhost:5238/api/Members";

export const memberService = {
    getAll: async (): Promise<Member[]> => {
        const response = await axios.get<Member[]>(API_URL)
        return response.data;
    },

    getById: async (id: number): Promise<Member> => {
        const response = await axios.get<Member>(`${API_URL}/${id}`);
        return response.data;
    },

    create: async (member: CreateMember): Promise<Member> => {
        const response = await axios.post<Member>(API_URL, member);
        return response.data;
    },

    update: async (id: number, member: Partial<Member>): Promise<void> => {
        await axios.put(`${API_URL}/${id}`, member);
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}