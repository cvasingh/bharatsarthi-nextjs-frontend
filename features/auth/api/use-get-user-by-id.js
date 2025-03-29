import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("User ID is required");
      }

      try {
        // Fetch user data from the API
        const response = await client.api.auth.getUserById[id].$get();

        if (!response.ok) {
          return null;
        }

        const { data } = await response.json();

        return data || null;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
      }
    },
    enabled: !!id,
  });

  return query;
};
