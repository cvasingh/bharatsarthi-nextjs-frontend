import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id) => {
  const query = useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("User ID is required");
      }

      try {
        // Fetch user data from the API
        const response = await client.api.auth[`get-username`][id].$get();

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const { data } = await response.json();
        return data?.username || null;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
      }
    },
    enabled: !!id,
  });

  return query;
};
